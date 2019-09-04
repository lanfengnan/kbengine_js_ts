declare module KBEngine {

	let Event: EventEntity;
	let reader: MemoryStream;
	let app: KBEngineApp;
	let datatype2id: number[];
	// 上行消息
	let messages: any[];
	let clientmessages: {};
	let bufferedCreateEntityMessage: {};

	class Class {
		public extend(prop: any): any;
	}


	/*-----------------------------------------------------------------------------------------
													global
	-----------------------------------------------------------------------------------------*/
	const PACKET_MAX_SIZE = 1500;
	const PACKET_MAX_SIZE_TCP = 1460;
	const PACKET_MAX_SIZE_UDP = 1472;
	const MESSAGE_ID_LENGTH = 2;
	const MESSAGE_LENGTH_LENGTH = 2;
	const CLIENT_NO_FLOAT = 0;
	const KBE_FLT_MAX = 3.402823466e+38;
	const ENTITYCALL_TYPE_CELL = 0;
	const ENTITYCALL_TYPE_BASE = 1;
	let allModules: {};
	/*-----------------------------------------------------------------------------------------
													number64bits
	-----------------------------------------------------------------------------------------*/
	class INT64 {
		lo: any;
		hi: any;
		sign: any;
		constructor(lo, hi);
		toString(): string;
		toNumber(): number;
	}
	class UINT64 {
		lo: any;
		hi: any;
		constructor(lo, hi);
		toString(): string;
	}


	/*-----------------------------------------------------------------------------------------
													debug
	-----------------------------------------------------------------------------------------*/
	function INFO_MSG(any): void;
	function DEBUG_MSG(any): void;
	function ERROR_MSG(any): void;
	function WARNING_MSG(any): void;

	/*-----------------------------------------------------------------------------------------
													string
	-----------------------------------------------------------------------------------------*/
	function utf8ArrayToString(array): string;

	function stringToUTF8Bytes(str): any;

	/*-----------------------------------------------------------------------------------------
													event
	-----------------------------------------------------------------------------------------*/
	class EventInfo {
		callbackfn: any;
		classinst: any;
		constructor(classinst, callbackfn);
	}
	class EventEntity {
		_events: {};
		register(evtName, classinst, strCallback): void;
		deregister(evtName, classinst): void;
		fire(a, ...b): void;
	}



	/*-----------------------------------------------------------------------------------------
													memorystream
	-----------------------------------------------------------------------------------------*/
	class MemoryStream {
		buffer: any;
		rpos: number;
		wpos: number;
		constructor(size_or_buffer);
		static PackFloatXType(): void;
		readInt8(): any;

		readInt16(): any;

		readInt32(): any;

		readInt64(): any;

		readUint8(): any;

		readUint16(): any;

		readUint32(): any;

		readUint64(): UINT64;

		readFloat(): any;

		readDouble(): any;

		readString(): String;

		readBlob(): any;

		readStream(): MemoryStream;

		readPackXZ(): Array<any>;

		readPackY(): any;

		//---------------------------------------------------------------------------------
		writeInt8(v): void;

		writeInt16(v): void;

		writeInt32(v): void;

		writeInt64(v): void;

		writeUint8(v): void;

		writeUint16(v): void;

		writeUint32(v): void;

		writeUint64(v): void;

		writeFloat(v): void;

		writeDouble(v): void;

		writeBlob(v): void;

		writeString(v): void;
		//---------------------------------------------------------------------------------
		readSkip(v): void;
		//---------------------------------------------------------------------------------
		space(): any;

		//---------------------------------------------------------------------------------
		length(): number;

		//---------------------------------------------------------------------------------
		readEOF(): any;
		//---------------------------------------------------------------------------------
		done(): void;

		//---------------------------------------------------------------------------------
		getbuffer(): any;
	}

	/*-----------------------------------------------------------------------------------------
													bundle
	-----------------------------------------------------------------------------------------*/
	class Bundle {
		memorystreams: any[];
		stream: MemoryStream;
		numMessage: number;
		messageLengthBuffer: any;
		messageLength: number;
		msgtype: any;

		//---------------------------------------------------------------------------------
		newMessage(msgtype): void;
		//---------------------------------------------------------------------------------
		writeMsgLength(v): void;
		//---------------------------------------------------------------------------------
		fini(issend): void;

		//---------------------------------------------------------------------------------
		send(network): void;
		//---------------------------------------------------------------------------------
		checkStream(v): void;

		//---------------------------------------------------------------------------------
		writeInt8(v): void;
		writeInt16(v): void;

		writeInt32(v): void;

		writeInt64(v): void;

		writeUint8(v): void;

		writeUint16(v): void;

		writeUint32(v): void;

		writeUint64(v): void;
		writeFloat(v): void;

		writeDouble(v): void;

		writeString(v): void;

		writeBlob(v): void;
	}

	/*-----------------------------------------------------------------------------------------
													messages
	-----------------------------------------------------------------------------------------*/

	function bindwriter(writer, argType): any;
	function bindReader(argType): any;

	class Message {
		constructor(id, name, length, argstype, args, handler);
		id: any;
		name: any;
		length: any;
		argsType: any;
		args: any;
		handler: any;
		createFromStream(msgstream): any;
		handleMessage(msgstream): void;
	}



	/*-----------------------------------------------------------------------------------------
													math
	-----------------------------------------------------------------------------------------*/
	class Vector3 {
		x: number;
		y: number;
		z: number;
		ctor(x, y, z): boolean;
		distance(pos): any
	}
	class Vector2 {

	}
	class Vector4 {

	}

	function clampf(value, min_inclusive, max_inclusive): any;
	function int82angle(angle/*int8*/, half/*bool*/): any;
	function angle2int8(v/*float*/, half/*bool*/): any;

	/*-----------------------------------------------------------------------------------------
													entity
	-----------------------------------------------------------------------------------------*/
	export class Entity {

		id: number;
		className: string;
		position: Vector3;
		direction: Vector3;
		velocity: any
		cell: any;
		base: any;
		// enterworld之后设置为true
		inWorld: boolean;
		// __init__调用之后设置为true
		inited: boolean;
		// 是否被控制
		isControlled: boolean;
		entityLastLocalPos: Vector3;
		entityLastLocalDir: Vector3;
		// 玩家是否在地面上
		isOnGround: boolean;

		ctor(): void;
		__init__(): void;
		callPropertysSetMethods(): void;
		onDestroy(): void;
		onControlled(bIsControlled): void;
		isPlayer(): void;
		baseCall(a, ...b): void;
		cellCall(a, ...b): void;
		enterWorld(): void;
		onEnterWorld(): void;
		leaveWorld(): void;
		onLeaveWorld(): void;
		enterSpace(): void;
		onEnterSpace(): void;
		leaveSpace(): void;
		onLeaveSpace(): void;
		set_position(): void;
		onUpdateVolatileData(): void;
		set_direction(): void;
		binding(key, value): void;
		__proto__(): void;
		/**回调请求 */
		callBack(methoddata, entity, args): void;
	}
	/*-----------------------------------------------------------------------------------------
												EntityCall
	-----------------------------------------------------------------------------------------*/
	class EntityCall {
		id: number;
		className: string;
		type: number;
		networkInterface: KBEngineApp;
		bundle: any;
		isBase(): boolean;
		isCell(): boolean;
		newCall(): any;
		sendCall(bundle): void;
	}
	/*-----------------------------------------------------------------------------------------
												Component
-----------------------------------------------------------------------------------------*/
	export class Component {
		owner: Entity;
		entityComponentPropertyID: number;
		className: string;
		position: Vector3;
		direction: Vector3;
		velocity: any
		cell: EntityCall;
		base: EntityCall;
		// enterworld之后设置为true
		inWorld: boolean;
		// __init__调用之后设置为true
		inited: boolean;
		// 是否被控制
		isControlled: boolean;
		entityLastLocalPos: Vector3;
		entityLastLocalDir: Vector3;
		// 玩家是否在地面上
		isOnGround: boolean;

		ctor(): void;
		__init__(): void;
		callPropertysSetMethods(): void;
		onDestroy(): void;
		onControlled(bIsControlled): void;
		isPlayer(): void;
		baseCall(a, ...b): void;
		cellCall(a, ...b): void;
		enterWorld(): void;
		onEnterWorld(): void;
		leaveWorld(): void;
		onLeaveWorld(): void;
		enterSpace(): void;
		onEnterSpace(): void;
		leaveSpace(): void;
		onLeaveSpace(): void;
		set_position(): void;
		onUpdateVolatileData(): void;
		set_direction(): void;
		binding(key, value): void;
		__proto__(): void;
		/**回调请求 */
		callBack(methoddata, entity, args): void;
	}

	/*-----------------------------------------------------------------------------------------
													mailbox
	-----------------------------------------------------------------------------------------*/
	const MAILBOX_TYPE_CELL = 0;
	const MAILBOX_TYPE_BASE = 1;

	class Mailbox {
		id: number;
		className: string;
		type: number;
		networkInterface: any;
		bundle: any;
		isBase(): any;
		isCell(): any;
		newMail(): any;
		postMail(bundle): any;
	}

	/*-----------------------------------------------------------------------------------------
													entitydef
	-----------------------------------------------------------------------------------------*/

	let moduledefs: {};
	let datatypes: {};

	class DATATYPE_BASE {
		bind(): void;
		createFromStream(stream): any;
		addToStream(stream, v)
		parseDefaultValStr(v): any;
		isSameType(v): boolean;
	}
	class DATATYPE_UINT8 extends DATATYPE_BASE {

	}

	class DATATYPE_UINT16 extends DATATYPE_BASE {

	}

	class DATATYPE_UINT32 extends DATATYPE_BASE {
	}

	class DATATYPE_UINT64 extends DATATYPE_BASE {
	}

	class DATATYPE_INT8 extends DATATYPE_BASE {
	}

	class DATATYPE_INT16 extends DATATYPE_BASE {
	}

	class DATATYPE_INT32 extends DATATYPE_BASE {
	}

	class DATATYPE_INT64 extends DATATYPE_BASE {
	}

	class DATATYPE_FLOAT extends DATATYPE_BASE {
	}

	class DATATYPE_DOUBLE extends DATATYPE_BASE {
	}

	class DATATYPE_STRING extends DATATYPE_BASE {

	}
	class DATATYPE_VECTOR extends DATATYPE_BASE {
		constructor(any);
		itemsize: any;
	}

	class DATATYPE_PYTHON extends DATATYPE_BASE {

	}


	class DATATYPE_UNICODE extends DATATYPE_BASE {
	}

	class DATATYPE_MAILBOX extends DATATYPE_BASE {

	}

	class DATATYPE_BLOB extends DATATYPE_BASE {
	}

	class DATATYPE_ARRAY extends DATATYPE_BASE {
		type: any;

	}

	class DATATYPE_FIXED_DICT extends DATATYPE_BASE {
		dicttype: {};
		implementedBy: any;

	}


	/*-----------------------------------------------------------------------------------------
													KBEngine args
	-----------------------------------------------------------------------------------------*/
	class KBEngineArgs {
		ip: string;
		port: number;
		domain: string;
		updateHZ: number;
		timeOut: number;//单位秒
		clientType: number;
		loginAddr: string;
		baseAddr: string;
		isOnInitCallPropertysSetMethods: boolean;
	}

	/*-----------------------------------------------------------------------------------------
													KBEngine app
	-----------------------------------------------------------------------------------------*/

	class KBEngineApp {
		args: KBEngineArgs;
		username: string;
		password: string;
		clientdatas: string;
		encryptedKey: string;
		loginappMessageImported: boolean;
		baseappMessageImported: boolean;
		serverErrorsDescrImported: boolean;
		entitydefImported: boolean;
		clientVersion: string;
		clientScriptVersion: string;
		socket: WebSocket;
		serverErrs: {};
		entityclass: {};
		constructor(kbengineArgs: KBEngineArgs);
		/**描述服务器返回的错误信息 */
		public ServerErr(): void;
		reset(): void;

		installEvents(): void;

		uninstallEvents(): void;

		hello(): void;

		player(): any;

		findEntity(entityID): any;

		connect(addr): void;

		disconnect(): void;

		onopen(): void;
		onerror_before_onopen(evt): void;

		onerror_after_onopen(evt): void;

		onmessage(msg): void;

		onclose(): void;

		send(msg): void;

		close(): void;

		update(): void;

		/*
			服务器心跳回调
		*/
		Client_onAppActiveTickCB(): void;

		/*
			通过错误id得到错误描述
		*/
		serverErr(id): string;

		/*
			服务端错误描述导入了
		*/
		Client_onImportServerErrorsDescr(stream): void;
		onOpenLoginapp_login(): void;

		onOpenLoginapp_createAccount(): void;

		onImportClientMessagesCompleted(): void;

		createDataTypeFromStreams(stream, canprint): void;

		createDataTypeFromStream(stream, canprint): void;

		Client_onImportClientEntityDef(stream): void;

		Client_onVersionNotMatch(stream): void;

		Client_onScriptVersionNotMatch(stream): void;
		onImportEntityDefCompleted(): void;

		Client_onImportClientMessages(msg): void;

		createAccount(username, password, datas): void;

		createAccount_loginapp(noconnect): void;
		bindAccountEmail(emailAddress): void;
		newPassword(old_password, new_password): void;

		login(username, password, datas): void;

		login_loginapp(noconnect): void;

		onOpenLoginapp_resetpassword(): void;
		reset_password(username): void;
		resetpassword_loginapp(noconnect): void;
		onOpenBaseapp(): void;
		login_baseapp(noconnect): void;
		reLoginBaseapp(): void;
		onReOpenBaseapp(): void;
		Client_onHelloCB(args): void;
		Client_onLoginFailed(args): void;
		Client_onLoginSuccessfully(args): void;
		Client_onLoginBaseappFailed(failedcode): void;

		Client_onReLoginBaseappSuccessfully(stream): void;


		getentityclass(entityType): any;

		Client_onCreatedProxies(rndUUID, eid, entityType): void;

		getAoiEntityIDFromStream(stream): number;
		onUpdatePropertys_(eid, stream): void;
		Client_onUpdatePropertysOptimized(stream): void;
		Client_onUpdatePropertys(stream): void;

		onRemoteMethodCall_(eid, stream): void;

		Client_onRemoteMethodCallOptimized(stream): void;

		Client_onRemoteMethodCall(stream): void;
		Client_onEntityEnterWorld(stream): void;

		Client_onEntityLeaveWorldOptimized(stream): void;

		Client_onEntityLeaveWorld(eid): void;

		Client_onEntityDestroyed(eid): void;

		Client_onEntityEnterSpace(stream): void;
		Client_onEntityLeaveSpace(eid): void;

		Client_onKicked(failedcode): void;

		Client_onCreateAccountResult(stream): void;
		Client_onControlEntity(eid, isControlled): void;
		updatePlayerToServer(): void;

		addSpaceGeometryMapping(spaceID, respath): void;

		clearSpace(isAll): void;

		clearEntities(isAll): void;

		Client_initSpaceData(stream): void;
		Client_setSpaceData(spaceID, key, value): void;

		Client_delSpaceData(spaceID, key): void;
		Client_getSpaceData(spaceID, key): any;

		Client_onUpdateBasePos(x, y, z): void;

		Client_onUpdateBasePosXZ(x, z): void;

		Client_onUpdateData(stream): void;

		Client_onSetEntityPosAndDir(stream): void;

		Client_onUpdateData_ypr(stream): void;

		Client_onUpdateData_yp(stream): void;

		Client_onUpdateData_yr(stream): void;
		Client_onUpdateData_pr(stream): void;

		Client_onUpdateData_y(stream): void;

		Client_onUpdateData_p(stream): void;

		Client_onUpdateData_r(stream): void;
		Client_onUpdateData_xz(stream): void;

		Client_onUpdateData_xz_ypr(stream): void;

		Client_onUpdateData_xz_yp(stream): void;

		Client_onUpdateData_xz_yr(stream): void;

		Client_onUpdateData_xz_pr(stream): void;

		Client_onUpdateData_xz_y(stream): void;
		Client_onUpdateData_xz_p(stream): void;

		Client_onUpdateData_xz_r(stream): void;

		Client_onUpdateData_xyz(stream): void;

		Client_onUpdateData_xyz_ypr(stream): void;

		Client_onUpdateData_xyz_yp(stream): void;

		Client_onUpdateData_xyz_yr(stream): void;
		Client_onUpdateData_xyz_pr(stream): void;

		Client_onUpdateData_xyz_y(stream): void;

		Client_onUpdateData_xyz_p(stream): void;

		Client_onUpdateData_xyz_r(stream): void;

		_updateVolatileData(entityID, x, y, z, yaw, pitch, roll, isOnGround): void;

		Client_onStreamDataStarted(id, datasize, descr): void;

		Client_onStreamDataRecv(stream): void;

		Client_onStreamDataCompleted(id): void;
		Client_onReqAccountResetPasswordCB(failedcode): void;

		Client_onReqAccountBindEmailCB(failedcode): void;

		Client_onReqAccountNewPasswordCB(failedcode): void;
	}

	function create(kbengineArgs): void;
	function destroy(): void;


}

