export module KBEngine {

    //#region 全局属性
    let PACKET_MAX_SIZE = 1500;
    let PACKET_MAX_SIZE_TCP = 1460;
    let PACKET_MAX_SIZE_UDP = 1472;
    let MESSAGE_ID_LENGTH = 2;
    let MESSAGE_LENGTH_LENGTH = 2;
    let MESSAGE_LENGTH1_LENGTH = 4;
    let MESSAGE_MAX_SIZE = 65535;
    let CLIENT_NO_FLOAT = 0;
    let KBE_FLT_MAX = 3.402823466e+38;
    let KBEallModules = {}
    let KBEngineapp: KBEngineApp = null;

    export function SetModules(className: string, classType: object) {
        KBEallModules[className] = classType;
    }
    //#endregion

    //#region  entityDef
    let KBEngineModuledefs: object = {}
    let KBEngineDatatypes = {};

    export class DATATYPE_UINT8 {
        bind() {
        }

        createFromStream(stream: MemoryStream) {
            return stream.readUint8();
        }

        addToStream(stream: MemoryStream, v: any) {
            stream.writeUint8(v);
        }

        parseDefaultValStr(v) {
            return parseInt(v);
        }

        isSameType(v) {
            if (typeof (v) != "number") {
                return false;
            }

            if (v < 0 || v > 0xff) {
                return false;
            }

            return true;
        }
    }

    export class DATATYPE_UINT16 {
        bind() {
        }

        createFromStream(stream: MemoryStream) {
            return stream.readUint16();
        }

        addToStream(stream: MemoryStream, v: any) {
            stream.writeUint16(v);
        }

        parseDefaultValStr(v: any) {
            return parseInt(v);
        }

        isSameType(v: any) {
            if (typeof (v) != "number") {
                return false;
            }

            if (v < 0 || v > 0xffff) {
                return false;
            }

            return true;
        }
    }

    export class DATATYPE_UINT32 {
        bind() {
        }

        createFromStream(stream: MemoryStream) {
            return stream.readUint32();
        }

        addToStream(stream: MemoryStream, v: any) {
            stream.writeUint32(v);
        }

        parseDefaultValStr(v: any) {
            return parseInt(v);
        }

        isSameType(v: any) {
            if (typeof (v) != "number") {
                return false;
            }

            if (v < 0 || v > 0xffffffff) {
                return false;
            }

            return true;
        }
    }

    export class DATATYPE_UINT64 {
        bind() {
        }

        createFromStream(stream: MemoryStream) {
            return stream.readUint64();
        }

        addToStream(stream: MemoryStream, v: any) {
            stream.writeUint64(v);
        }

        parseDefaultValStr(v: any) {
            return parseInt(v);
        }

        isSameType(v: any) {
            return v instanceof UINT64;
        }
    }

    export class DATATYPE_INT8 {
        bind() {
        }

        createFromStream(stream: MemoryStream) {
            return stream.readInt8();
        }

        addToStream(stream: MemoryStream, v: any) {
            stream.writeInt8(v);
        }

        parseDefaultValStr(v: any) {
            return parseInt(v);
        }

        isSameType(v: any) {
            if (typeof (v) != "number") {
                return false;
            }

            if (v < -0x80 || v > 0x7f) {
                return false;
            }

            return true;
        }
    }

    export class DATATYPE_INT16 {
        bind() {
        }

        createFromStream(stream: MemoryStream) {
            return stream.readInt16();
        }

        addToStream(stream: MemoryStream, v: any) {
            stream.writeInt16(v);
        }

        parseDefaultValStr(v: any) {
            return parseInt(v);
        }

        isSameType(v: any) {
            if (typeof (v) != "number") {
                return false;
            }

            if (v < -0x8000 || v > 0x7fff) {
                return false;
            }

            return true;
        }
    }

    export class DATATYPE_INT32 {
        bind() {
        }

        createFromStream(stream: MemoryStream) {
            return stream.readInt32();
        }

        addToStream(stream: MemoryStream, v: any) {
            stream.writeInt32(v);
        }

        parseDefaultValStr(v: any) {
            return parseInt(v);
        }

        isSameType(v: any) {
            if (typeof (v) != "number") {
                return false;
            }

            if (v < -0x80000000 || v > 0x7fffffff) {
                return false;
            }

            return true;
        }
    }

    export class DATATYPE_INT64 {
        bind() {
        }

        createFromStream(stream: MemoryStream) {
            return stream.readInt64();
        }

        addToStream(stream: MemoryStream, v: any) {
            stream.writeInt64(v);
        }

        parseDefaultValStr(v: any) {
            return parseInt(v);
        }

        isSameType(v: any) {
            return v instanceof INT64;
        }
    }

    export class DATATYPE_FLOAT {
        bind() {
        }

        createFromStream(stream: MemoryStream) {
            return stream.readFloat();
        }

        addToStream(stream: MemoryStream, v: any) {
            stream.writeFloat(v);
        }

        parseDefaultValStr(v: any) {
            return parseFloat(v);
        }

        isSameType(v: any) {
            return typeof (v) == "number";
        }
    }

    export class DATATYPE_DOUBLE {
        bind() {
        }

        createFromStream(stream: MemoryStream) {
            return stream.readDouble();
        }

        addToStream(stream: MemoryStream, v: any) {
            stream.writeDouble(v);
        }

        parseDefaultValStr(v: any) {
            return parseFloat(v);
        }

        isSameType(v: any) {
            return typeof (v) == "number";
        }
    }

    export class DATATYPE_STRING {
        bind() {
        }

        createFromStream(stream: MemoryStream) {
            return stream.readString();
        }

        addToStream(stream: MemoryStream, v: any) {
            stream.writeString(v);
        }

        parseDefaultValStr(v: any) {
            if (typeof (v) == "string")
                return v;

            return "";
        }

        isSameType(v: any) {
            return typeof (v) == "string";
        }
    }

    export class DATATYPE_VECTOR2 {
        bind() {
        }

        createFromStream(stream: MemoryStream) {
            if (CLIENT_NO_FLOAT) {
                var x = stream.readInt32();
                var y = stream.readInt32();
                return new Vector2(x, y);
            }
            else {
                var x = stream.readFloat();
                var y = stream.readFloat();
                return new Vector2(x, y);
            }
        }

        addToStream(stream: MemoryStream, v: any) {
            if (CLIENT_NO_FLOAT) {
                stream.writeInt32(v.x);
                stream.writeInt32(v.y);
            }
            else {
                stream.writeFloat(v.x);
                stream.writeFloat(v.y);
            }
        }

        parseDefaultValStr(v: any) {
            return new Vector2(0.0, 0.0);
        }

        isSameType(v: any) {
            if (v instanceof Vector2) {
                return true;
            }
            return false;
        }
    }

    export class DATATYPE_VECTOR3 {
        bind() {
        }

        createFromStream(stream: MemoryStream) {
            if (CLIENT_NO_FLOAT) {
                var x = stream.readInt32();
                var y = stream.readInt32();
                var z = stream.readInt32();
                return new Vector3(x, y, z);
            }
            else {
                var x = stream.readFloat();
                var y = stream.readFloat();
                var z = stream.readFloat();
                return new Vector3(x, y, z);
            }
        }

        addToStream(stream: MemoryStream, v: any) {
            if (CLIENT_NO_FLOAT) {
                stream.writeInt32(v.x);
                stream.writeInt32(v.y);
                stream.writeInt32(v.z);
            }
            else {
                stream.writeFloat(v.x);
                stream.writeFloat(v.y);
                stream.writeFloat(v.z);
            }
        }

        parseDefaultValStr(v: any) {
            return new Vector3(0.0, 0.0, 0.0);
        }

        isSameType(v: any) {
            if (v instanceof Vector3) {
                return true;
            }
            return false;
        }
    }

    export class DATATYPE_VECTOR4 {
        bind() {
        }

        createFromStream(stream: MemoryStream) {
            if (CLIENT_NO_FLOAT) {
                var x = stream.readInt32();
                var y = stream.readInt32();
                var z = stream.readInt32();
                var w = stream.readInt32();
                return new Vector4(x, y, z, w);
            }
            else {
                var x = stream.readFloat();
                var y = stream.readFloat();
                var z = stream.readFloat();
                var w = stream.readFloat();
                return new Vector4(x, y, z, w);
            }

            return undefined;
        }

        addToStream(stream: MemoryStream, v: any) {
            if (CLIENT_NO_FLOAT) {
                stream.writeInt32(v.x);
                stream.writeInt32(v.y);
                stream.writeInt32(v.z);
                stream.writeInt32(v.w);
            }
            else {
                stream.writeFloat(v.x);
                stream.writeFloat(v.y);
                stream.writeFloat(v.z);
                stream.writeFloat(v.w);
            }
        }

        parseDefaultValStr(v: any) {
            return new Vector4(0.0, 0.0, 0.0, 0.0);
        }

        isSameType(v: any) {
            if (v instanceof Vector4) {
                return true;
            }

            return false;
        }
    }

    export class DATATYPE_PYTHON {
        bind() {
        }

        createFromStream(stream: MemoryStream) {
            return stream.readBlob();
        }

        addToStream(stream: MemoryStream, v: any) {
            stream.writeBlob(v);
        }

        parseDefaultValStr(v: any) {
            return new Uint8Array(v);
        }

        isSameType(v: any) {
            return false;
        }
    }

    export class DATATYPE_UNICODE {
        bind() {
        }

        createFromStream(stream: MemoryStream) {
            return UTF8ArrayToString(stream.readBlob());
        }

        addToStream(stream: MemoryStream, v: any) {
            stream.writeBlob(StringToUTF8Array(v));
        }

        parseDefaultValStr(v: any) {
            if (typeof (v) == "string")
                return v;

            return "";
        }

        isSameType(v: any) {
            return typeof (v) == "string";
        }
    }

    export class DATATYPE_ENTITYCALL {
        bind() {
        }

        createFromStream(stream: MemoryStream) {
            var cid = stream.readUint64();
            var id = stream.readInt32();
            var type = stream.readUint16();
            var utype = stream.readUint16();
        }

        addToStream(stream: MemoryStream, v: any) {
            var cid = new UINT64(0, 0);
            var id = 0;
            var type = 0;
            var utype = 0;

            stream.writeUint64(cid);
            stream.writeInt32(id);
            stream.writeUint16(type);
            stream.writeUint16(utype);
        }

        parseDefaultValStr(v: any) {
            return new Uint8Array(v);
        }

        isSameType(v: any) {
            return false;
        }
    }

    export class DATATYPE_BLOB {
        bind() {
        }

        createFromStream(stream: MemoryStream) {
            var size = stream.readUint32();
            var buf = new Uint8Array(stream.buffer, stream.rpos, size);
            stream.rpos += size;
            return buf;
        }

        addToStream(stream: MemoryStream, v: any) {
            stream.writeBlob(v);
        }

        parseDefaultValStr(v: any) {
            return new Uint8Array(v);
        }

        isSameType(v: any) {
            return true;
        }
    }

    export class DATATYPE_ARRAY {
        type = null;

        bind() {
            if (typeof (this.type) == "number")
                this.type = KBEngineDatatypes[this.type];
        }

        createFromStream(stream: MemoryStream) {
            var size = stream.readUint32();
            var datas = [];

            while (size > 0) {
                size--;
                datas.push(this.type.createFromStream(stream));
            };

            return datas;
        }

        addToStream(stream: MemoryStream, v: any) {
            stream.writeUint32(v.length);
            for (var i = 0; i < v.length; i++) {
                this.type.addToStream(stream, v[i]);
            }
        }

        parseDefaultValStr(v: any) {
            return [];
        }

        isSameType(v: any) {
            for (var i = 0; i < v.length; i++) {
                if (!this.type.isSameType(v[i])) {
                    return false;
                }
            }

            return true;
        }
    }

    export class DATATYPE_FIXED_DICT {
        dicttype = {};
        implementedBy = null;

        bind() {
            for (var itemkey in this.dicttype) {
                var utype = this.dicttype[itemkey];

                if (typeof (this.dicttype[itemkey]) == "number")
                    this.dicttype[itemkey] = KBEngineDatatypes[utype];
            }
        }

        createFromStream(stream: MemoryStream) {
            var datas = {};
            for (var itemkey in this.dicttype) {
                datas[itemkey] = this.dicttype[itemkey].createFromStream(stream);
            }

            return datas;
        }

        addToStream(stream: MemoryStream, v: any) {
            for (var itemkey in this.dicttype) {
                this.dicttype[itemkey].addToStream(stream, v[itemkey]);
            }
        }

        parseDefaultValStr(v: any) {
            return {};
        }

        isSameType(v: any) {
            for (var itemkey in this.dicttype) {
                if (!this.dicttype[itemkey].isSameType(v[itemkey])) {
                    return false;
                }
            }

            return true;
        }
    }

    KBEngineDatatypes["UINT8"] = new DATATYPE_UINT8();
    KBEngineDatatypes["UINT16"] = new DATATYPE_UINT16();
    KBEngineDatatypes["UINT32"] = new DATATYPE_UINT32();
    KBEngineDatatypes["UINT64"] = new DATATYPE_UINT64();

    KBEngineDatatypes["INT8"] = new DATATYPE_INT8();
    KBEngineDatatypes["INT16"] = new DATATYPE_INT16();
    KBEngineDatatypes["INT32"] = new DATATYPE_INT32();
    KBEngineDatatypes["INT64"] = new DATATYPE_INT64();

    KBEngineDatatypes["FLOAT"] = new DATATYPE_FLOAT();
    KBEngineDatatypes["DOUBLE"] = new DATATYPE_DOUBLE();

    KBEngineDatatypes["STRING"] = new DATATYPE_STRING();
    KBEngineDatatypes["VECTOR2"] = new DATATYPE_VECTOR2;
    KBEngineDatatypes["VECTOR3"] = new DATATYPE_VECTOR3;
    KBEngineDatatypes["VECTOR4"] = new DATATYPE_VECTOR4;
    KBEngineDatatypes["PYTHON"] = new DATATYPE_PYTHON();
    KBEngineDatatypes["UNICODE"] = new DATATYPE_UNICODE();
    KBEngineDatatypes["ENTITYCALL"] = new DATATYPE_ENTITYCALL();
    KBEngineDatatypes["BLOB"] = new DATATYPE_BLOB();
    //#endregion

    //#region 数据类型
    /**
     * 有符号64位整数
     * @param lo 低位值，32位整数
     * @param hi 高位值，大于32位整数范围的数值位
     */
    export class INT64 {
        lo: number;
        hi: number;
        sign: number = 1;

        constructor(lo: number, hi: number) {
            if (hi >= 2147483648) {
                this.sign = -1;
                if (this.lo > 0) {
                    this.lo = (4294967296 - this.lo) & 0xffffffff;
                    this.hi = 4294967295 - this.hi;
                }
                else {
                    this.lo = (4294967296 - this.lo) & 0xffffffff;
                    this.hi = 4294967296 - this.hi;
                }
            }
        }

        toString() {
            var result = "";
            if (this.sign < 0) {
                result += "-"
            }
            var low = this.lo.toString(16);
            var high = this.hi.toString(16);
            if (this.hi > 0) {
                result += high;
                for (var i = 8 - low.length; i > 0; --i) {
                    result += "0";
                }
            }
            result += low;

            return result;

        }
    }

    /**
     * 无符号64位整数
     * @param lo 低位值，32位整数
     * @param hi 高位值，大于32位整数范围的数值位
     */
    export class UINT64 {
        lo: number;
        hi: number;

        constructor(lo: number, hi: number) {
            this.lo = lo >>> 0;
            this.hi = hi;
        }

        toString() {
            var low = this.lo.toString();
            var high = this.hi.toString();

            var result = "";
            if (this.hi > 0) {
                result += high;
                for (var i = 8 - low.length; i > 0; --i) {
                    result += "0";
                }
            }
            result += low;
            return result;
        }
    }
    //#endregion

    //#region 日志打印
    /**打印信息 */
    function INFO_MSG(s) {
        console.info(s);
    }

    /**打印调试信息 */
    function DEBUG_MSG(s) {
        console.debug(s);
    }

    /**打印错误信息 */
    function ERROR_MSG(s) {
        console.error(s);
    }

    /**打印警告信息 */
    function WARNING_MSG(s) {
        console.warn(s);
    }
    //#endregion

    //#region  字符串相关
    /** 8位无符号整数值的类型化数组转字符串 */
    export function UTF8ArrayToString(array: Uint8Array): string {
        let out = "";
        let char1: number;
        let char2: number;
        let char3: number;

        for (let i = 0; i < array.length;) {
            char1 = array[i];
            switch (char1 >> 4) {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                    out += String.fromCharCode(char1);
                    i += 1;
                    break;
                case 12: case 13:
                    char2 = array[i + 1];
                    out += String.fromCharCode(((char1 & 0x1F) << 6) | (char2 & 0x3F));
                    i += 2;
                    break;
                case 14:
                    char2 = array[i + 1];
                    char3 = array[i + 2];
                    out += String.fromCharCode((char1 & 0x0F) << 12 | (char2 & 0x3F) << 6 | (char3 & 0x3F) << 0);
                    i += 3;
                    break;
                default:
                    ERROR_MSG("UTF8ArrayToString::execute flow shouldnt reach here.");
            }
        }
        return out;
    }

    /**字符串转8位无符号整数值类型化数组 */
    export function StringToUTF8Array(value: string): Uint8Array {
        let utf8 = new Array<number>();

        for (let i = 0; i < value.length; i++) {
            let charcode = value.charCodeAt(i);
            if (charcode < 0x80) {
                utf8.push(charcode);
            }
            else if (charcode < 0x800) {
                utf8.push(0xc0 | (charcode >> 6),
                    0x80 | (charcode & 0x3f));
            }
            else if (charcode < 0xd800 || charcode >= 0xe000) {
                utf8.push(0xe0 | (charcode >> 12),
                    0x80 | ((charcode >> 6) & 0x3f),
                    0x80 | (charcode & 0x3f));
            }
            // surrogate pair
            else {
                i++;
                // UTF-16 encodes 0x10000-0x10FFFF by
                // subtracting 0x10000 and splitting the
                // 20 bits of 0x0-0xFFFFF into two halves
                charcode = 0x10000 + (((charcode & 0x3ff) << 10)
                    | (value.charCodeAt(i) & 0x3ff))
                utf8.push(0xf0 | (charcode >> 18),
                    0x80 | ((charcode >> 12) & 0x3f),
                    0x80 | ((charcode >> 6) & 0x3f),
                    0x80 | (charcode & 0x3f));
            }
        }
        return new Uint8Array(utf8);
    }
    //#endregion

    //#region  Event相关
    class EventInfo {
        callbackfn;
        classinst;
        constructor(classinst: object, callbackfn: Function) {
            this.callbackfn = callbackfn;
            this.classinst = classinst
        }
    }

    class FiredEvent {
        evtName: string;
        evtInfo;
        args;
        constructor(evtName, evtInfo, args) {
            this.evtName = evtName;
            this.evtInfo = evtInfo;
            this.args = args;
        }
    }

    export class Event {
        _events = {};
        _isPause = false;
        _firedEvents = [];

        /**
         * 注册事件
         * @param evtName 事件名称
         * @param classinst 监听的主体对象
         * @param strCallback 回调方法名称
         */
        register(evtName, classinst, strCallback) {
            var callbackfn = classinst[strCallback];
            if (callbackfn == undefined) {
                ERROR_MSG('KBEevent::fire: not found strCallback(' + classinst + ")!" + strCallback);
                return;
            }

            var evtlst = this._events[evtName];
            if (evtlst == undefined) {
                evtlst = [];
                this._events[evtName] = evtlst;
            }

            var info = new EventInfo(classinst, callbackfn);
            evtlst.push(info);
        }

        /**
         * 注销事件
         * @param classinst 监听的主体对象
         */
        deregisterAll(classinst) {
            for (var itemkey in this._events) {
                this.deregister(itemkey, classinst);
            }
        }

        /**
         * 注销事件
         * @param evtName 事件名称
         * @param classinst 监听的主体对象
         */
        deregister(evtName, classinst) {
            var evtlst = this._events[evtName];

            if (evtlst == undefined) {
                return;
            }

            while (true) {
                var found = false;
                for (var i = 0; i < evtlst.length; i++) {
                    var info = evtlst[i];
                    if (info.classinst == classinst) {
                        evtlst.splice(i, 1);
                        found = true;
                        break;
                    }
                }

                if (!found)
                    break;
            }

            this.removeFiredEvent(evtName, classinst);
        }

        removeAllFiredEvent(classinst) {
            this.removeFiredEvent("", classinst);
        }

        removeFiredEvent(evtName, classinst) {
            var firedEvents = this._firedEvents;
            while (true) {
                var found = false;
                for (var i = 0; i < firedEvents.length; i++) {
                    var evt = firedEvents[i];
                    if ((evtName == "" || evt.evtName == evtName) && evt.evtInfo.classinst == classinst) {
                        firedEvents.splice(i, 1);
                        found = true;
                        break;
                    }
                }

                if (!found)
                    break;
            }
        }


        fire(evtName: string, ...args: any[]) {
            if (evtName.length < 1) {
                ERROR_MSG('KBEevent::fire: not found eventName!');
                return;
            }

            var evtlst = this._events[evtName];

            if (evtlst == undefined) {
                return;
            }

            var ars = [];
            for (var i = 1; i < args.length; i++)
                ars.push(args[i]);

            for (var i = 0; i < evtlst.length; i++) {
                var info = evtlst[i];

                if (!this._isPause) {
                    if (ars.length < 1) {
                        info.callbackfn.apply(info.classinst);
                    }
                    else {
                        info.callbackfn.apply(info.classinst, ars);
                    }
                }
                else {
                    var eobj = new FiredEvent(evtName, info, ars);
                    this._firedEvents.push(eobj);
                }
            }
        }

        pause() {
            this._isPause = true;
        }

        resume() {
            this._isPause = false;

            var firedEvents = this._firedEvents;
            while (firedEvents.length > 0) {
                var evt = firedEvents.shift();
                var info = evt.evtInfo;
                var ars = evt.ars;

                if (ars.length < 1) {
                    info.callbackfn.apply(info.classinst);
                }
                else {
                    info.callbackfn.apply(info.classinst, ars);
                }
            }
        }

        clear() {
            this._events = {};
            this._firedEvents.splice(0, this._firedEvents.length);
        }
    }

    export let KBEevent: Event = new Event();
    //#endregion

    //#region 字节流解析
    class PackFloatXType {
        private _unionData: ArrayBuffer;
        fv: Float32Array;
        uv: Uint32Array;
        iv: Int32Array;

        constructor() {
            this._unionData = new ArrayBuffer(4);
            this.fv = new Float32Array(this._unionData, 0, 1);
            this.uv = new Uint32Array(this._unionData, 0, 1);
            this.iv = new Int32Array(this._unionData, 0, 1);
        }
    }

    export class MemoryStream {
        rpos: number = 0;
        wpos: number = 0;
        buffer: ArrayBuffer;

        constructor(size_or_buffer: number | ArrayBuffer) {
            if (size_or_buffer instanceof ArrayBuffer) {
                this.buffer = size_or_buffer;
            }
            else {
                this.buffer = new ArrayBuffer(size_or_buffer);
            }
        }

        /**未确定 */
        append(datas: ArrayBuffer) {
            let len = datas.byteLength
            let newBuffer = new Uint8Array(this.wpos + len)
            newBuffer.set(new Uint8Array(this.buffer), 0)
            newBuffer.set(new Uint8Array(datas), this.wpos)
            this.buffer = newBuffer.buffer
            this.wpos += len
        }

        space(): number {
            return this.buffer.byteLength - this.wpos;
        }

        readInt8(): number {
            let buf = new Int8Array(this.buffer, this.rpos);
            this.rpos += 1;
            return buf[0];
        }

        readUint8(): number {
            let buf = new Uint8Array(this.buffer, this.rpos);
            this.rpos += 1;
            return buf[0];
        }

        readUint16(): number {
            let buf = new Uint8Array(this.buffer, this.rpos);
            this.rpos += 2;
            return ((buf[1] & 0xff) << 8) + (buf[0] & 0xff);
        }

        readInt16(): number {
            let value = this.readUint16();
            if (value >= 32768)
                value -= 65536;
            return value;
        }

        readUint32(): number {
            let buf = new Uint8Array(this.buffer, this.rpos);
            this.rpos += 4;

            return (buf[3] << 24) + (buf[2] << 16) + (buf[1] << 8) + buf[0];
        }

        readInt32(): number {
            let value = this.readUint32();
            if (value >= 2147483648)
                value -= 4294967296;
            return value;
        }

        readUint64(): UINT64 {
            return new UINT64(this.readUint32(), this.readUint32());
        }

        readInt64(): INT64 {
            return new INT64(this.readUint32(), this.readUint32());
        }

        readFloat(): number {
            let buf: Float32Array = undefined;
            try {
                buf = new Float32Array(this.buffer, this.rpos, 1);
            }
            catch (e) {
                buf = new Float32Array(this.buffer.slice(this.rpos, this.rpos + 4));
            }

            this.rpos += 4;

            return buf[0];
        }

        readDouble(): number {
            let buf: Float64Array = undefined;
            try {
                buf = new Float64Array(this.buffer, this.rpos, 1);
            }
            catch (e) {
                buf = new Float64Array(this.buffer.slice(this.rpos, this.rpos + 8), 0, 1);
            }

            this.rpos += 8;
            return buf[0];
        }

        readString(): string {
            var buf = new Uint8Array(this.buffer, this.rpos);
            var i = 0;
            var s = "";

            while (true) {
                if (buf[i] != 0) {
                    s += String.fromCharCode(buf[i]);
                }
                else {
                    i++;
                    break;
                }

                i++;

                if (this.rpos + i >= this.buffer.byteLength)
                    throw (new Error("KBEngine.MemoryStream::readString: rpos(" + (this.rpos + i) + ")>=" +
                        this.buffer.byteLength + " overflow!"));
            }

            this.rpos += i;
            return s;
        }

        readBlob(): Uint8Array {
            let size = this.readUint32();
            let buf = new Uint8Array(this.buffer, this.rpos, size);
            this.rpos += size;
            return buf;
        }

        readStream(): MemoryStream {
            let buf = new Uint8Array(this.buffer, this.rpos, this.buffer.byteLength - this.rpos);
            this.rpos = this.buffer.byteLength;
            return new MemoryStream(buf);
        }

        readPackXZ(): Array<number> {
            let xPackData = new PackFloatXType();
            let zPackData = new PackFloatXType();

            xPackData.fv[0] = 0.0;
            zPackData.fv[0] = 0.0;

            xPackData.uv[0] = 0x40000000;
            zPackData.uv[0] = 0x40000000;
            let v1 = this.readUint8();
            let v2 = this.readUint8();
            let v3 = this.readUint8();

            let data = 0;
            data |= (v1 << 16);
            data |= (v2 << 8);
            data |= v3;

            xPackData.uv[0] |= (data & 0x7ff000) << 3;
            zPackData.uv[0] |= (data & 0x0007ff) << 15;

            xPackData.fv[0] -= 2.0;
            zPackData.fv[0] -= 2.0;

            xPackData.uv[0] |= (data & 0x800000) << 8;
            zPackData.uv[0] |= (data & 0x000800) << 20;

            let xzData = new Array(2);
            xzData[0] = xPackData.fv[0];
            xzData[1] = zPackData.fv[0];
            return xzData;
        }

        readPackY(): number {
            let data = this.readUint16();

            let yPackData = new PackFloatXType();
            yPackData.uv[0] = 0x40000000;
            yPackData.uv[0] |= (data & 0x7fff) << 12;   // 解压，补足尾数
            yPackData.fv[0] -= 2.0;                     // 此时还未设置符号位，当作正数处理，-2后再加上符号位即可，无需根据正负来+-2
            yPackData.uv[0] |= (data & 0x8000) << 16;   // 设置符号位

            return yPackData.fv[0];
        }

        writeInt8(value: number): void {
            let buf = new Int8Array(this.buffer, this.wpos, 1);
            buf[0] = value;
            this.wpos += 1;
        }

        writeInt16(value: number): void {
            this.writeInt8(value & 0xff);
            this.writeInt8((value >> 8) & 0xff);
        }

        writeInt32(value: number): void {
            for (let i = 0; i < 4; i++)
                this.writeInt8((value >> i * 8) & 0xff);
        }

        writeInt64(value: INT64): void {
            this.writeInt32(value.lo);
            this.writeInt32(value.hi);
        }

        writeUint8(value: number): void {
            let buf = new Uint8Array(this.buffer, this.wpos, 1);
            buf[0] = value;
            this.wpos += 1;
        }

        writeUint16(value: number): void {
            this.writeUint8(value & 0xff);
            this.writeUint8((value >> 8) & 0xff);
        }

        writeUint32(value: number): void {
            for (let i = 0; i < 4; i++)
                this.writeUint8((value >> i * 8) & 0xff);
        }

        writeUint64(value: UINT64): void {
            this.writeUint32(value.lo);
            this.writeUint32(value.hi);
        }

        writeFloat(value: number): void {
            try {
                let buf = new Float32Array(this.buffer, this.wpos, 1);
                buf[0] = value;
            }
            catch (e) {
                let buf = new Float32Array(1);
                buf[0] = value;
                let buf1 = new Uint8Array(this.buffer);
                let buf2 = new Uint8Array(buf.buffer);
                buf1.set(buf2, this.wpos);
            }

            this.wpos += 4;
        }

        writeDouble(value: number): void {
            try {
                let buf = new Float64Array(this.buffer, this.wpos, 1);
                buf[0] = value;
            }
            catch (e) {
                let buf = new Float64Array(1);
                buf[0] = value;
                let buf1 = new Uint8Array(this.buffer);
                let buf2 = new Uint8Array(buf.buffer);
                buf1.set(buf2, this.wpos);
            }

            this.wpos += 8;
        }

        writeBlob(value: string | Uint8Array): void {
            let size = value.length;
            if (size + 4 > this.space()) {
                ERROR_MSG("memorystream::writeBlob: no free!");
                return;
            }

            this.writeUint32(size);

            let buf = new Uint8Array(this.buffer, this.wpos, size);
            if (typeof (value) == "string") {
                for (let i = 0; i < size; i++) {
                    buf[i] = value.charCodeAt(i);
                }
            }
            else {
                for (let i = 0; i < size; i++) {
                    buf[i] = value[i];
                }
            }

            this.wpos += size;
        }

        writeString(v: string): void {
            if (v.length > this.space()) {
                ERROR_MSG("memorystream::writeString: no free!");
                return;
            }
            var buf = new Uint8Array(this.buffer, this.wpos);
            var i = 0;
            for (var idx = 0; idx < v.length; idx++) {
                buf[i++] = v.charCodeAt(idx);
            }
            buf[i++] = 0;
            this.wpos += i;
        }

        readSkip(count: number): void {
            this.rpos += count;
        }

        length(): number {
            return this.wpos - this.rpos;
        }

        readEOF(): boolean {
            return this.buffer.byteLength - this.rpos <= 0;
        }

        done(): void {
            this.rpos = this.wpos;
        }

        getBuffer(): ArrayBuffer {
            return this.buffer.slice(this.rpos, this.wpos);
        }

        setbuffer(buffer: ArrayBuffer) {
            this.clear();
            this.buffer = buffer;
        }

        size() {
            return this.buffer.byteLength;
        }

        clear() {
            this.rpos = 0;
            this.wpos = 0;

            if (this.buffer.byteLength > PACKET_MAX_SIZE)
                this.buffer = new ArrayBuffer(PACKET_MAX_SIZE);
        }

        static _objects = [];

        reclaimObject() {
            this.clear();

            if (MemoryStream._objects != undefined)
                MemoryStream._objects.push(this);
        }
    }

    function createMemoryObject() {
        if (MemoryStream._objects == undefined)
            MemoryStream._objects = [];
        return MemoryStream._objects.length > 0 ? MemoryStream._objects.pop() : new MemoryStream(PACKET_MAX_SIZE_TCP);
    }
    //#endregion

    //#region  Bundle
    export class Bundle {
        memorystreams: Array<MemoryStream> = new Array<MemoryStream>();
        stream = createMemoryObject();

        numMessage = 0;
        messageLengthBuffer = null;
        messageLength = 0;
        msgtype = null;

        //---------------------------------------------------------------------------------
        newMessage(msgtype) {
            this.fini(false);

            this.msgtype = msgtype;
            this.numMessage += 1;

            if (this.msgtype.length == -1) {
                this.messageLengthBuffer = new Uint8Array(this.stream.buffer, this.stream.wpos + MESSAGE_ID_LENGTH, 2);
            }

            this.writeUint16(msgtype.id);

            if (this.messageLengthBuffer) {
                this.writeUint16(0);
                this.messageLengthBuffer[0] = 0;
                this.messageLengthBuffer[1] = 0;
                this.messageLength = 0;
            }
        }

        //---------------------------------------------------------------------------------
        writeMsgLength(v) {
            if (this.messageLengthBuffer) {
                this.messageLengthBuffer[0] = v & 0xff;
                this.messageLengthBuffer[1] = v >> 8 & 0xff;
            }
        }

        //---------------------------------------------------------------------------------
        fini(issend) {
            if (this.numMessage > 0) {
                this.writeMsgLength(this.messageLength);
                if (this.stream)
                    this.memorystreams.push(this.stream);

                this.stream = createMemoryObject();
            }

            if (issend) {
                this.messageLengthBuffer = null;
                this.numMessage = 0;
                this.msgtype = null;
            }
        }

        //---------------------------------------------------------------------------------
        send(network: KBEngineApp) {
            this.fini(true);
            for (var i = 0; i < this.memorystreams.length; i++) {
                var tmpStream = this.memorystreams[i];
                network.send(tmpStream.getBuffer());
            }

            this.reclaimObject();
        }

        //---------------------------------------------------------------------------------
        checkStream(v) {
            if (v > this.stream.space()) {
                this.memorystreams.push(this.stream);
                this.stream = createMemoryObject();
            }
            this.messageLength += v;
        }

        //---------------------------------------------------------------------------------
        writeInt8(v) {
            this.checkStream(1);
            this.stream.writeInt8(v);
        }

        writeInt16(v) {
            this.checkStream(2);
            this.stream.writeInt16(v);
        }

        writeInt32(v) {
            this.checkStream(4);
            this.stream.writeInt32(v);
        }

        writeInt64(v) {
            this.checkStream(8);
            this.stream.writeInt64(v);
        }

        writeUint8(v) {
            this.checkStream(1);
            this.stream.writeUint8(v);
        }

        writeUint16(v) {
            this.checkStream(2);
            this.stream.writeUint16(v);
        }

        writeUint32(v) {
            this.checkStream(4);
            this.stream.writeUint32(v);
        }

        writeUint64(v) {
            this.checkStream(8);
            this.stream.writeUint64(v);
        }

        writeFloat(v) {
            this.checkStream(4);
            this.stream.writeFloat(v);
        }

        writeDouble(v) {
            this.checkStream(8);
            this.stream.writeDouble(v);
        }

        writeString(v) {
            this.checkStream(v.length + 1);
            this.stream.writeString(v);
        }

        writeBlob(v) {
            this.checkStream(v.length + 4);
            this.stream.writeBlob(v);
        }

        clear() {
            for (var i = 0; i < this.memorystreams.length; i++) {
                if (this.stream != this.memorystreams[i])
                    this.memorystreams[i].reclaimObject();
            }

            if (this.stream)
                this.stream.clear();
            else
                this.stream = createMemoryObject();

            this.memorystreams = new Array();
            this.numMessage = 0;
            this.messageLengthBuffer = null;
            this.messageLength = 0;
            this.msgtype = null;
        }

        static _objects = [];

        reclaimObject() {
            this.clear();
            if (Bundle._objects != undefined)
                Bundle._objects.push(this);
        }
    }

    function createBundleObject() {
        if (Bundle._objects == undefined)
            Bundle._objects = [];

        return Bundle._objects.length > 0 ? Bundle._objects.pop() : new Bundle();
    }
    //#endregion

    //#region  Message
    let reader = new MemoryStream(0);
    let datatype2id = {};

    function mappingDataType() {
        datatype2id = {};
        datatype2id["STRING"] = 1;
        datatype2id["STD::STRING"] = 1;
        datatype2id["UINT8"] = 2;
        datatype2id["BOOL"] = 2;
        datatype2id["DATATYPE"] = 2;
        datatype2id["CHAR"] = 2;
        datatype2id["DETAIL_TYPE"] = 2;
        datatype2id["ENTITYCALL_CALL_TYPE"] = 2;
        datatype2id["UINT16"] = 3;
        datatype2id["UNSIGNED SHORT"] = 3;
        datatype2id["SERVER_ERROR_CODE"] = 3;
        datatype2id["ENTITY_TYPE"] = 3;
        datatype2id["ENTITY_PROPERTY_UID"] = 3;
        datatype2id["ENTITY_METHOD_UID"] = 3;
        datatype2id["ENTITY_SCRIPT_UID"] = 3;
        datatype2id["DATATYPE_UID"] = 3;
        datatype2id["UINT32"] = 4;
        datatype2id["UINT"] = 4;
        datatype2id["UNSIGNED INT"] = 4;
        datatype2id["ARRAYSIZE"] = 4;
        datatype2id["SPACE_ID"] = 4;
        datatype2id["GAME_TIME"] = 4;
        datatype2id["TIMER_ID"] = 4;
        datatype2id["UINT64"] = 5;
        datatype2id["DBID"] = 5;
        datatype2id["COMPONENT_ID"] = 5;
        datatype2id["INT8"] = 6;
        datatype2id["COMPONENT_ORDER"] = 6;
        datatype2id["INT16"] = 7;
        datatype2id["SHORT"] = 7;
        datatype2id["INT32"] = 8;
        datatype2id["INT"] = 8;
        datatype2id["ENTITY_ID"] = 8;
        datatype2id["CALLBACK_ID"] = 8;
        datatype2id["COMPONENT_TYPE"] = 8;
        datatype2id["INT64"] = 9;
        datatype2id["PYTHON"] = 10;
        datatype2id["PY_DICT"] = 10;
        datatype2id["PY_TUPLE"] = 10;
        datatype2id["PY_LIST"] = 10;
        datatype2id["BLOB"] = 11;
        datatype2id["UNICODE"] = 12;
        datatype2id["FLOAT"] = 13;
        datatype2id["DOUBLE"] = 14;
        datatype2id["VECTOR2"] = 15;
        datatype2id["VECTOR3"] = 16;
        datatype2id["VECTOR4"] = 17;
        datatype2id["FIXED_DICT"] = 18;
        datatype2id["ARRAY"] = 19;
        datatype2id["ENTITYCALL"] = 20;
    }

    let map = mappingDataType();

    function bindwriter(writer, argType) {
        if (argType == datatype2id["UINT8"]) {
            return writer.writeUint8;
        }
        else if (argType == datatype2id["UINT16"]) {
            return writer.writeUint16;
        }
        else if (argType == datatype2id["UINT32"]) {
            return writer.writeUint32;
        }
        else if (argType == datatype2id["UINT64"]) {
            return writer.writeUint64;
        }
        else if (argType == datatype2id["INT8"]) {
            return writer.writeInt8;
        }
        else if (argType == datatype2id["INT16"]) {
            return writer.writeInt16;
        }
        else if (argType == datatype2id["INT32"]) {
            return writer.writeInt32;
        }
        else if (argType == datatype2id["INT64"]) {
            return writer.writeInt64;
        }
        else if (argType == datatype2id["FLOAT"]) {
            return writer.writeFloat;
        }
        else if (argType == datatype2id["DOUBLE"]) {
            return writer.writeDouble;
        }
        else if (argType == datatype2id["STRING"]) {
            return writer.writeString;
        }
        else if (argType == datatype2id["FIXED_DICT"]) {
            return writer.writeStream;
        }
        else if (argType == datatype2id["ARRAY"]) {
            return writer.writeStream;
        }
        else {
            return writer.writeStream;
        }
    }

    function bindReader(argType) {
        if (argType == datatype2id["UINT8"]) {
            return reader.readUint8;
        }
        else if (argType == datatype2id["UINT16"]) {
            return reader.readUint16;
        }
        else if (argType == datatype2id["UINT32"]) {
            return reader.readUint32;
        }
        else if (argType == datatype2id["UINT64"]) {
            return reader.readUint64;
        }
        else if (argType == datatype2id["INT8"]) {
            return reader.readInt8;
        }
        else if (argType == datatype2id["INT16"]) {
            return reader.readInt16;
        }
        else if (argType == datatype2id["INT32"]) {
            return reader.readInt32;
        }
        else if (argType == datatype2id["INT64"]) {
            return reader.readInt64;
        }
        else if (argType == datatype2id["FLOAT"]) {
            return reader.readFloat;
        }
        else if (argType == datatype2id["DOUBLE"]) {
            return reader.readDouble;
        }
        else if (argType == datatype2id["STRING"]) {
            return reader.readString;
        }
        else if (argType == datatype2id["PYTHON"]) {
            return reader.readStream;
        }
        else if (argType == datatype2id["VECTOR2"]) {
            return reader.readStream;
        }
        else if (argType == datatype2id["VECTOR3"]) {
            return reader.readStream;
        }
        else if (argType == datatype2id["VECTOR4"]) {
            return reader.readStream;
        }
        else if (argType == datatype2id["BLOB"]) {
            return reader.readStream;
        }
        else if (argType == datatype2id["UNICODE"]) {
            return reader.readStream;
        }
        else if (argType == datatype2id["FIXED_DICT"]) {
            return reader.readStream;
        }
        else if (argType == datatype2id["ARRAY"]) {
            return reader.readStream;
        }
        else {
            return reader.readStream;
        }
    }

    class Message {
        id: number;
        name: string;
        length: number;
        argsType;
        args;
        handler;

        constructor(id, name, length, argstype, args, handler) {
            this.id = id;
            this.name = name;
            this.length = length;
            this.argsType = argstype;

            // 绑定执行
            for (var i = 0; i < args.length; i++) {
                args[i] = bindReader(args[i]);
            }

            this.args = args;
            this.handler = handler;
        }

        createFromStream(msgstream) {
            if (this.args.length <= 0)
                return msgstream;

            var result = new Array(this.args.length);
            for (var i = 0; i < this.args.length; i++) {
                result[i] = this.args[i].call(msgstream);
            }

            return result;
        }

        handleMessage(msgstream) {
            if (this.handler == null) {
                ERROR_MSG("Message::handleMessage: interface(" + this.name + "/" + this.id + ") no implement!");
                return;
            }

            if (this.args.length <= 0) {
                if (this.argsType < 0)
                    this.handler(msgstream);
                else
                    this.handler();
            }
            else {
                this.handler.apply(KBEngineapp, this.createFromStream(msgstream));
            }
        }
    }

    // 上行消息
    let KBEmessages = {};
    KBEmessages["loginapp"] = {};
    KBEmessages["baseapp"] = {};
    let KBEclientmessages = {};

    KBEmessages["Loginapp_importClientMessages"] = new Message(5, "importClientMessages", 0, 0, new Array(), null);
    KBEmessages["Baseapp_importClientMessages"] = new Message(207, "importClientMessages", 0, 0, new Array(), null);
    KBEmessages["Baseapp_importClientEntityDef"] = new Message(208, "importClientEntityDef", 0, 0, new Array(), null);
    KBEmessages["onImportClientMessages"] = new Message(518, "onImportClientMessages", -1, -1, new Array(), null);

    let bufferedCreateEntityMessages = {};
    //#endregion

    //#region  Math
    export class Vector2 {
        x: number;
        y: number;

        constructor(x, y) {
            this.x = x;
            this.y = y;
            // return true;
        }

        distance(pos: Vector2) {
            var x = pos.x - this.x;
            var y = pos.y - this.y;
            return Math.sqrt(x * x + y * y);
        }

        add(vec2: Vector2) {
            this.x += vec2.x;
            this.y += vec2.y;
            return this;
        }

        sub(vec2: Vector2) {
            this.x -= vec2.x;
            this.y -= vec2.y;
            return this;
        }

        mul(num) {
            this.x *= num;
            this.y *= num;
            return this;
        }

        div(num) {
            this.x /= num;
            this.y /= num;
            return this;
        }

        neg() {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        }
    }

    export class Vector3 {
        x: number;
        y: number;
        z: number;
        constructor(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
            // return true;
        }

        distance(pos) {
            var x = pos.x - this.x;
            var y = pos.y - this.y;
            var z = pos.z - this.z;
            return Math.sqrt(x * x + y * y + z * z);
        }

        //向量加法
        add(vec3: Vector3) {
            this.x += vec3.x;
            this.y += vec3.y;
            this.z += vec3.z;
            return this;
        }

        //向量减法
        sub(vec3: Vector3) {
            this.x -= vec3.x;
            this.y -= vec3.y;
            this.z -= vec3.z;
            return this;
        }

        //向量乘法
        mul(num) {
            this.x *= num;
            this.y *= num;
            this.z *= num;
            return this;
        }

        //向量除法
        div(num) {
            this.x /= num;
            this.y /= num;
            this.z /= num;
            return this;
        }

        // 向量取反
        neg() {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
            return this;
        }
    }

    export class Vector4 {
        x: number;
        y: number;
        z: number;
        w: number;
        constructor(x, y, z, w) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
            // return true;
        }

        distance(pos: Vector4) {
            var x = pos.x - this.x;
            var y = pos.y - this.y;
            var z = pos.z - this.z;
            var w = pos.w - this.w;
            return Math.sqrt(x * x + y * y + z * z + w * w);
        }

        add(vec4: Vector4) {
            this.x += vec4.x;
            this.y += vec4.y;
            this.z += vec4.z;
            this.w += vec4.w;
            return this;
        }

        sub(vec4: Vector4) {
            this.x -= vec4.x;
            this.y -= vec4.y;
            this.z -= vec4.z;
            this.w -= vec4.w;
            return this;
        }

        mul(num) {
            this.x *= num;
            this.y *= num;
            this.z *= num;
            this.w *= num;
            return this;
        }

        div(num) {
            this.x /= num;
            this.y /= num;
            this.z /= num;
            this.w /= num;
            return this;
        }

        neg() {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
            this.w = -this.w;
            return this;
        }
    }

    function clampf(value, min_inclusive, max_inclusive) {
        if (min_inclusive > max_inclusive) {
            var temp = min_inclusive;
            min_inclusive = max_inclusive;
            max_inclusive = temp;
        }
        return value < min_inclusive ? min_inclusive : value < max_inclusive ? value : max_inclusive;
    };

    function int82angle(angle/*int8*/, half/*bool*/) {
        return angle * (Math.PI / (half ? 254.0 : 128.0));
    };

    function angle2int8(v/*float*/, half/*bool*/) {
        var angle = 0;
        if (!half) {
            angle = Math.floor((v * 128.0) / Math.PI + 0.5);
            // angle = Math.floor((v * 128.0) / float(Math.PI) + 0.5);
        }
        else {
            angle = clampf(Math.floor((v * 254.0) / Math.PI + 0.5), -128.0, 127.0);
            // angle = KBEngine.clampf(floorf((v * 254.0) / float(Math.PI) + 0.5), -128.0, 127.0);
        }

        return angle;
    };
    //#endregion

    //#region  Entity
    export class Entity {
        id: number;
        className: string;
        position: Vector3;
        direction: Vector3;
        velocity: number;
        cell: EntityCall;
        base: EntityCall;
        inWorld: boolean;
        inited: boolean;
        isControlled: boolean;
        entityLastLocalPos: Vector3;
        entityLastLocalDir: Vector3;
        isOnGround: boolean;

        constructor() {
            this.id = 0;
            this.className = "";
            this.position = new Vector3(0.0, 0.0, 0.0);
            this.direction = new Vector3(0.0, 0.0, 0.0);
            this.velocity = 0.0
            this.cell = null;
            this.base = null;
            // enterworld之后设置为true
            this.inWorld = false;
            // __init__调用之后设置为true
            this.inited = false;
            // 是否被控制
            this.isControlled = false;
            this.entityLastLocalPos = new Vector3(0.0, 0.0, 0.0);
            this.entityLastLocalDir = new Vector3(0.0, 0.0, 0.0);
            // 玩家是否在地面上
            this.isOnGround = false;
        }

        // 与服务端实体脚本中__init__类似, 代表初始化实体
        __init__() {
        }

        callPropertysSetMethods() {
            var currModule = KBEngineModuledefs[this.className];
            for (var name in currModule.propertys) {
                var propertydata = currModule.propertys[name];
                var properUtype = propertydata[0];
                var name = propertydata[2];
                var setmethod = propertydata[5];
                var flags = propertydata[6];
                var oldval = this[name];

                if (setmethod != null) {
                    // base类属性或者进入世界后cell类属性会触发set_*方法
                    // ED_FLAG_BASE_AND_CLIENT、ED_FLAG_BASE
                    if (flags == 0x00000020 || flags == 0x00000040) {
                        if (this.inited && !this.inWorld)
                            setmethod.call(this, oldval);
                    }
                    else {
                        if (this.inWorld) {
                            if (flags == 0x00000008 || flags == 0x00000010) {
                                if (!this.isPlayer())
                                    continue;
                            }

                            setmethod.call(this, oldval);
                        }
                    }
                }
            };
        }

        onDestroy() {
        }

        onControlled(bIsControlled: boolean) {
        }

        setComponents(modulesDef) { }

        isPlayer() {
            return this.id == KBEngineapp.entity_id;
        }

        baseCall(funName: string, ...args: any[]) {
            if (funName.length < 1) {
                ERROR_MSG('KBEngine.Entity::baseCall: not fount interfaceName!');
                return;
            }

            if (this.base == undefined) {
                ERROR_MSG('KBEngine.Entity::baseCall: base is None!');
                return;
            }

            var method = KBEngineModuledefs[this.className].base_methods[funName];

            if (method == undefined) {
                ERROR_MSG("KBEngine.Entity::baseCall: The server did not find the def_method(" + this.className + "." + funName + ")!");
                return;
            }

            var methodID = method[0];
            var methodArgs = method[3];
            if (args !== null) {
                if (methodArgs.length !== args.length) {
                    ERROR_MSG("KBEngine.Entity::baseCall: args(" + methodArgs.length + "!= " + args.length + ") size is error!");
                    return;
                }
            }

            this.base.newCall();
            //适配组件
            this.base.bundle.writeUint16(0);
            this.base.bundle.writeUint16(methodID);

            try {
                for (var i = 0; i < args.length; i++) {
                    if (methodArgs[i].isSameType(args[i])) {
                        methodArgs[i].addToStream(this.base.bundle, args[i]);
                    }
                    else {
                        throw new Error("KBEngine.Entity::baseCall: arg[" + i + "] is error!");
                    }
                }
            }
            catch (e) {
                ERROR_MSG(e.toString());
                ERROR_MSG('KBEngine.Entity::baseCall: args is error!');
                this.base.bundle = null;
                return;
            }

            this.base.sendCall(this.base.bundle);
        }

        cellCall(funName: string, ...args: any[]) {
            if (funName.length < 1) {
                ERROR_MSG('KBEngine.Entity::cellCall: not fount interfaceName!');
                return;
            }

            if (this.cell == undefined) {
                ERROR_MSG('KBEngine.Entity::cellCall: cell is None!');
                return;
            }

            var method = KBEngineModuledefs[this.className].cell_methods[funName];

            if (method == undefined) {
                ERROR_MSG("KBEngine.Entity::cellCall: The server did not find the def_method(" + this.className + "." + funName + ")!");
                return;
            }

            var methodID = method[0];
            var methodArgs = method[3];

            if (methodArgs.length != args.length) {
                ERROR_MSG("KBEngine.Entity::cellCall: args(" + methodArgs.length + "!= " + args.length + ") size is error!");
                return;
            }

            this.cell.newCall();
            this.cell.bundle.writeUint16(0);
            this.cell.bundle.writeUint16(methodID);

            try {
                for (var i = 0; i < args.length; i++) {
                    if (methodArgs[i].isSameType(args[i])) {
                        methodArgs[i].addToStream(this.cell.bundle, args[i + 1]);
                    }
                    else {
                        throw new Error("KBEngine.Entity::cellCall: arg[" + i + "] is error!");
                    }
                }
            }
            catch (e) {
                ERROR_MSG(e.toString());
                ERROR_MSG('KBEngine.Entity::cellCall: args is error!');
                this.cell.bundle = null;
                return;
            }

            this.cell.sendCall(this.cell.bundle);
        }

        enterWorld() {
            INFO_MSG(this.className + '::enterWorld: ' + this.id);
            this.inWorld = true;
            this.onEnterWorld();

            KBEevent.fire(KBEEventTypes.onEnterWorld, this);
        }

        onEnterWorld() {
        }

        leaveWorld() {
            INFO_MSG(this.className + '::leaveWorld: ' + this.id);
            this.inWorld = false;
            this.onLeaveWorld();
            KBEevent.fire(KBEEventTypes.onLeaveWorld, this);
        }

        onLeaveWorld() {
        }

        enterSpace() {
            INFO_MSG(this.className + '::enterSpace: ' + this.id);
            this.onEnterSpace();
            KBEevent.fire(KBEEventTypes.onEnterSpace, this);

            // 要立即刷新表现层对象的位置
            KBEevent.fire(KBEEventTypes.set_position, this);
            KBEevent.fire(KBEEventTypes.set_direction, this);
        }

        onEnterSpace() {
        }

        leaveSpace() {
            INFO_MSG(this.className + '::leaveSpace: ' + this.id);
            this.onLeaveSpace();
            KBEevent.fire("onLeaveSpace", this);
        }

        onLeaveSpace() {
        }

        set_position(old) {
            // DEBUG_MSG(this.className + "::set_position: " + old);

            if (this.isPlayer()) {
                KBEngineapp.entityServerPos.x = this.position.x;
                KBEngineapp.entityServerPos.y = this.position.y;
                KBEngineapp.entityServerPos.z = this.position.z;
            }

            KBEevent.fire(KBEEventTypes.set_position, this);
        }

        onUpdateVolatileData() {
        }

        set_direction(old) {
            // DEBUG_MSG(this.className + "::set_direction: " + old);
            KBEevent.fire(KBEEventTypes.set_direction, this);
        }
    }
    //#endregion

    //#region EntityComponent
    export class Component {
        owner: Entity;
        entityComponentPropertyID: number;
        className: string;
        position: Vector3;
        direction: Vector3;
        velocity: number;
        cell: EntityCall;
        base: EntityCall;
        inWorld: boolean;
        inited: boolean;
        isControlled: boolean;
        entityLastLocalPos: Vector3;
        entityLastLocalDir: Vector3;
        isOnGround: boolean;

        constructor() {
            this.entityComponentPropertyID = 0;
            this.className = "";
            this.position = new Vector3(0.0, 0.0, 0.0);
            this.direction = new Vector3(0.0, 0.0, 0.0);
            this.velocity = 0.0
            this.cell = null;
            this.base = null;
            // enterworld之后设置为true
            this.inWorld = false;
            // __init__调用之后设置为true
            this.inited = false;
            // 是否被控制
            this.isControlled = false;
            this.entityLastLocalPos = new Vector3(0.0, 0.0, 0.0);
            this.entityLastLocalDir = new Vector3(0.0, 0.0, 0.0);
            // 玩家是否在地面上
            this.isOnGround = false;
        }

        // 与服务端实体脚本中__init__类似, 代表初始化实体
        __init__() {
        }

        callPropertysSetMethods() {
            var currModule = KBEngineModuledefs[this.className];
            for (var name in currModule.propertys) {
                var propertydata = currModule.propertys[name];
                var properUtype = propertydata[0];
                var name = propertydata[2];
                var setmethod = propertydata[5];
                var flags = propertydata[6];
                var oldval = this[name];

                if (setmethod != null) {
                    // base类属性或者进入世界后cell类属性会触发set_*方法
                    // ED_FLAG_BASE_AND_CLIENT、ED_FLAG_BASE
                    if (flags == 0x00000020 || flags == 0x00000040) {
                        if (this.inited && !this.inWorld)
                            setmethod.call(this, oldval);
                    }
                    else {
                        if (this.inWorld) {
                            if (flags == 0x00000008 || flags == 0x00000010) {
                                if (!this.isPlayer())
                                    continue;
                            }

                            setmethod.call(this, oldval);
                        }
                    }
                }
            };
        }

        onDestroy() {
        }

        onControlled(bIsControlled: boolean) {
        }

        isPlayer() {
            return this.entityComponentPropertyID == KBEngineapp.entity_id;
        }

        baseCall(funName: string, ...args: any[]) {
            if (funName.length < 1) {
                ERROR_MSG('KBEngine.Entity::baseCall: not fount interfaceName!');
                return;
            }

            if (this.base == undefined) {
                ERROR_MSG('KBEngine.Entity::baseCall: base is None!');
                return;
            }

            var method = KBEngineModuledefs[this.className].base_methods[funName];

            if (method == undefined) {
                ERROR_MSG("KBEngine.Entity::baseCall: The server did not find the def_method(" + this.className + "." + funName + ")!");
                return;
            }

            var methodID = method[0];
            var methodArgs = method[3];

            if (methodArgs.length !== args.length) {
                ERROR_MSG("KBEngine.Entity::baseCall: args(" + methodArgs.length + "!= " + args.length + ") size is error!");
                return;
            }

            this.base.newCall();
            //适配组件
            this.base.bundle.writeUint16(this.entityComponentPropertyID);
            this.base.bundle.writeUint16(methodID);

            try {
                for (var i = 0; i < args.length; i++) {
                    if (methodArgs[i].isSameType(args[i])) {
                        methodArgs[i].addToStream(this.base.bundle, args[i]);
                    }
                    else {
                        throw new Error("KBEngine.Entity::baseCall: arg[" + i + "] is error!");
                    }
                }
            }
            catch (e) {
                ERROR_MSG(e.toString());
                ERROR_MSG('KBEngine.Entity::baseCall: args is error!');
                this.base.bundle = null;
                return;
            }

            this.base.sendCall(this.base.bundle);
        }

        cellCall(funName: string, ...args: any[]) {
            if (funName.length < 1) {
                ERROR_MSG('KBEngine.Entity::cellCall: not fount interfaceName!');
                return;
            }

            if (this.cell == undefined) {
                ERROR_MSG('KBEngine.Entity::cellCall: cell is None!');
                return;
            }

            var method = KBEngineModuledefs[this.className].cell_methods[funName];

            if (method == undefined) {
                ERROR_MSG("KBEngine.Entity::cellCall: The server did not find the def_method(" + this.className + "." + funName + ")!");
                return;
            }

            // var methodID = method[0];
            // var args = method[3];

            if (method.args.length != args.length) {
                ERROR_MSG("KBEngine.Entity::cellCall: args(" + method.args.length + "!= " + args.length + ") size is error!");
                return;
            }

            this.cell.newCall();
            this.cell.bundle.writeUint16(this.entityComponentPropertyID);
            this.cell.bundle.writeUint16(method.methodUtype);

            try {
                for (var i = 0; i < args.length; i++) {
                    if (method.args[i].isSameType(args[i])) {
                        method.args[i].addToStream(this.cell.bundle, args[i + 1]);
                    }
                    else {
                        throw new Error("KBEngine.Entity::cellCall: arg[" + i + "] is error!");
                    }
                }
            }
            catch (e) {
                ERROR_MSG(e.toString());
                ERROR_MSG('KBEngine.Entity::cellCall: args is error!');
                this.cell.bundle = null;
                return;
            }

            this.cell.sendCall(this.cell.bundle);
        }

        enterWorld() {
            INFO_MSG(this.className + '::enterWorld: ' + this.entityComponentPropertyID);
            this.inWorld = true;
            this.onEnterWorld();

            KBEevent.fire(KBEEventTypes.onEnterWorld, this);
        }

        onEnterWorld() {
        }

        leaveWorld() {
            INFO_MSG(this.className + '::leaveWorld: ' + this.entityComponentPropertyID);
            this.inWorld = false;
            this.onLeaveWorld();
            KBEevent.fire(KBEEventTypes.onLeaveWorld, this);
        }

        onLeaveWorld() {
        }

        enterSpace() {
            INFO_MSG(this.className + '::enterSpace: ' + this.entityComponentPropertyID);
            this.onEnterSpace();
            KBEevent.fire(KBEEventTypes.onEnterSpace, this);

            // 要立即刷新表现层对象的位置
            KBEevent.fire(KBEEventTypes.set_position, this);
            KBEevent.fire(KBEEventTypes.set_direction, this);
        }

        onEnterSpace() {
        }

        leaveSpace() {
            INFO_MSG(this.className + '::leaveSpace: ' + this.entityComponentPropertyID);
            this.onLeaveSpace();
            KBEevent.fire("onLeaveSpace", this);
        }

        onLeaveSpace() {
        }

        set_position(old) {
            // DEBUG_MSG(this.className + "::set_position: " + old);

            if (this.isPlayer()) {
                KBEngineapp.entityServerPos.x = this.position.x;
                KBEngineapp.entityServerPos.y = this.position.y;
                KBEngineapp.entityServerPos.z = this.position.z;
            }

            KBEevent.fire(KBEEventTypes.set_position, this);
        }

        onUpdateVolatileData() {
        }

        set_direction(old) {
            // DEBUG_MSG(this.className + "::set_direction: " + old);
            KBEevent.fire(KBEEventTypes.set_direction, this);
        }
    }
    //#endregion

    //#region  EntityCall
    export const ENTITYCALL_TYPE_CELL = 0;
    export const ENTITYCALL_TYPE_BASE = 1;

    export class EntityCall {
        id = 0;
        className = "";
        type = ENTITYCALL_TYPE_CELL;
        networkInterface = KBEngineapp;
        bundle: Bundle = null;

        constructor() {
        }

        isBase() {
            return this.type == ENTITYCALL_TYPE_BASE;
        }

        isCell() {
            return this.type == ENTITYCALL_TYPE_CELL;
        }

        newCall() {
            if (this.bundle == null)
                this.bundle = createBundleObject();

            if (this.type == ENTITYCALL_TYPE_CELL)
                this.bundle.newMessage(KBEmessages["Baseapp_onRemoteCallCellMethodFromClient"]);
            else
                this.bundle.newMessage(KBEmessages["Entity_onRemoteMethodCall"]);

            this.bundle.writeInt32(this.id);

            return this.bundle;
        }

        sendCall(bundle: Bundle) {
            if (bundle == undefined)
                bundle = this.bundle;

            bundle.send(this.networkInterface);

            if (this.bundle == bundle)
                this.bundle = null;
        }
    }
    //#endregion

    //#region  KBEngine args
    export class KBEngineArgs {
        ip: string = "127.0.0.1";
        port: number = 20013;
        domain: string = "";
        loginAddr: string = "";
        baseAddr: string = "";
        updateHZ: number = 10 * 10;
        serverHeartbeatTick: number = 30;
        clientType: number = 5;
        // 在Entity初始化时是否触发属性的set_*事件(callPropertysSetMethods)
        isOnInitCallPropertysSetMethods: boolean = true;
        // 是否用wss, 默认使用ws
        isWss: boolean = false;
    }
    //#endregion

    //#region  KBEngineEventType
    let KBEEventTypes =
    {
        // Create new account.
        // <para> param1(string): accountName</para>
        // <para> param2(string): password</para>
        // <para> param3(bytes): datas // Datas by user defined. Data will be recorded into the KBE account database, you can access the datas through the script layer. If you use third-party account system, datas will be submitted to the third-party system.</para>
        createAccount: "createAccount",

        // Login to server.
        // <para> param1(string): accountName</para>
        // <para> param2(string): password</para>
        // <para> param3(bytes): datas // Datas by user defined. Data will be recorded into the KBE account database, you can access the datas through the script layer. If you use third-party account system, datas will be submitted to the third-party system.</para>
        login: "login",

        // Logout to baseapp, called when exiting the client.
        logout: "logout",

        // Relogin to baseapp.
        reloginBaseapp: "reloginBaseapp",

        // Request server binding account Email.
        // <para> param1(string): emailAddress</para>
        bindAccountEmail: "bindAccountEmail",

        // Request to set up a new password for the account. Note: account must be online.
        // <para> param1(string): old_password</para>
        // <para> param2(string): new_password</para>
        newPassword: "newPassword",

        // ------------------------------------连接相关------------------------------------

        // Kicked of the current server.
        // <para> param1(uint16): retcode. // server_errors</para>
        onKicked: "onKicked",

        // Disconnected from the server.
        onDisconnected: "onDisconnected",

        // Status of connection server.
        // <para> param1(bool): success or fail</para>
        onConnectionState: "onConnectionState",

        // ------------------------------------logon相关------------------------------------

        // Create account feedback results.
        // <para> param1(uint16): retcode. // server_errors</para>
        // <para> param2(bytes): datas. // If you use third-party account system, the system may fill some of the third-party additional datas. </para>
        onCreateAccountResult: "onCreateAccountResult",

        // Engine version mismatch.
        // <para> param1(string): clientVersion
        // <para> param2(string): serverVersion
        onVersionNotMatch: "onVersionNotMatch",

        // script version mismatch.
        // <para> param1(string): clientScriptVersion
        // <para> param2(string): serverScriptVersion
        onScriptVersionNotMatch: "onScriptVersionNotMatch",

        // Login failed.
        // <para> param1(uint16): retcode. // server_errors</para>
        onLoginFailed: "onLoginFailed",

        // Login to baseapp.
        onLoginBaseapp: "onLoginBaseapp",

        // Login baseapp failed.
        // <para> param1(uint16): retcode. // server_errors</para>
        onLoginBaseappFailed: "onLoginBaseappFailed",

        // Relogin to baseapp.
        onReloginBaseapp: "onReloginBaseapp",

        // Relogin baseapp success.
        onReloginBaseappSuccessfully: "onReloginBaseappSuccessfully",

        // Relogin baseapp failed.
        // <para> param1(uint16): retcode. // server_errors</para>
        onReloginBaseappFailed: "onReloginBaseappFailed",

        // ------------------------------------实体cell相关事件------------------------------------

        // Entity enter the client-world.
        // <para> param1: Entity</para>
        onEnterWorld: "onEnterWorld",

        // Entity leave the client-world.
        // <para> param1: Entity</para>
        onLeaveWorld: "onLeaveWorld",

        // Player enter the new space.
        // <para> param1: Entity</para>
        onEnterSpace: "onEnterSpace",

        // Player leave the space.
        // <para> param1: Entity</para>
        onLeaveSpace: "onLeaveSpace",

        // Sets the current position of the entity.
        // <para> param1: Entity</para>
        set_position: "set_position",

        // Sets the current direction of the entity.
        // <para> param1: Entity</para>
        set_direction: "set_direction",

        // The entity position is updated, you can smooth the moving entity to new location.
        // <para> param1: Entity</para>
        updatePosition: "updatePosition",

        // The current space is specified by the geometry mapping.
        // Popular said is to load the specified Map Resources.
        // <para> param1(string): resPath</para>
        addSpaceGeometryMapping: "addSpaceGeometryMapping",

        // Server spaceData set data.
        // <para> param1(int32): spaceID</para>
        // <para> param2(string): key</para>
        // <para> param3(string): value</para>
        onSetSpaceData: "onSetSpaceData",

        // Start downloading data.
        // <para> param1(int32): rspaceID</para>
        // <para> param2(string): key</para>
        onDelSpaceData: "onDelSpaceData",

        // Triggered when the entity is controlled or out of control.
        // <para> param1: Entity</para>
        // <para> param2(bool): isControlled</para>
        onControlled: "onControlled",

        // Lose controlled entity.
        // <para> param1: Entity</para>
        onLoseControlledEntity: "onLoseControlledEntity",

        // ------------------------------------数据下载相关------------------------------------

        // Start downloading data.
        // <para> param1(uint16): resouce id</para>
        // <para> param2(uint32): data size</para>
        // <para> param3(string): description</para>
        onStreamDataStarted: "onStreamDataStarted",

        // Receive data.
        // <para> param1(uint16): resouce id</para>
        // <para> param2(bytes): datas</para>
        onStreamDataRecv: "onStreamDataRecv",

        // The downloaded data is completed.
        // <para> param1(uint16): resouce id</para>
        onStreamDataCompleted: "onStreamDataCompleted",
    }
    //#endregion

    //#region KBEngine app
    export class ServerErr {
        name: string = "";
        descr: string = "";
        id: number = 0;
    }

    export class KBEngineApp {
        args: KBEngineArgs;
        idInterval: number;
        username: string = "testhtml51";
        password: string = "123456";
        clientdatas: string = "";
        encryptedKey: string = "";
        serverErrs = {};
        // 登录loginapp的地址
        ip: string = "";
        port: number = 0;
        domain: string = ""
        isWss: boolean = false;
        protocol: string = "";
        currconnect: string = "";

        // 服务端分配的baseapp地址
        baseappIP: string = "";
        baseappTcpPort: number = 0;
        baseappUdpPort: number = 0;

        currMsgID: number = 0;
        currMsgCount: number = 0;
        currMsgLen: number = 0;

        loginappMessageImported: boolean = false;
        baseappMessageImported: boolean = false;
        serverErrorsDescrImported: boolean = false;
        entitydefImported: boolean = false;
        FragmentDataTypes =
            {
                FRAGMENT_DATA_UNKNOW: 0,
                FRAGMENT_DATA_MESSAGE_ID: 1,
                FRAGMENT_DATA_MESSAGE_LENGTH: 2,
                FRAGMENT_DATA_MESSAGE_LENGTH1: 3,
                FRAGMENT_DATA_MESSAGE_BODY: 4
            };

        fragmentStream = null;
        fragmentDatasFlag = this.FragmentDataTypes.FRAGMENT_DATA_UNKNOW;
        fragmentDatasRemain = 0;

        msgStream = new MemoryStream(PACKET_MAX_SIZE_TCP);
        currserver = "loginapp";
        currstate = "create";

        // networkInterface: NetworkInterface = new NetworkInterface();
        socket: WebSocket;

        serverVersion = "";
        serverScriptVersion = "";
        serverProtocolMD5 = "";
        serverEntityDefMD5 = "";
        clientVersion = "2.2.9";
        clientScriptVersion = "0.1.0";

        lastTickTime: number = 0;
        lastTickCBTime: number = 0;

        entities: { [id: number]: Entity } = {};
        bufferedCreateEntityMessage: { [id: number]: MemoryStream } = {};
        entity_id: number = 0;
        entity_uuid: UINT64;
        entity_type: string = "";
        controlledEntities: Array<Entity> = new Array<Entity>();
        entityIDAliasIDList: Array<number> = new Array<number>();

        // 这个参数的选择必须与kbengine_defs.xml::cellapp/aliasEntityID的参数保持一致
        useAliasEntityID = true;

        isOnInitCallPropertysSetMethods = true;

        // 当前玩家最后一次同步到服务端的位置与朝向与服务端最后一次同步过来的位置
        entityServerPos = new Vector3(0.0, 0.0, 0.0);

        spacedata: { [key: string]: string } = {};
        spaceID = 0;
        spaceResPath = "";
        isLoadedGeometry = false;

        component: string = "";
        serverdatas: Uint8Array;

        constructor(kbengineArgs: KBEngineArgs) {
            this.args = kbengineArgs;
            KBEngineapp = this;
            this.ip = this.args.ip;
            this.port = this.args.port;
            this.domain = this.args.domain;
            this.isWss = this.args.isWss;
            this.protocol = this.isWss ? "wss://" : "ws://";
            // this.socket = this.networkInterface.socket;
            this.installEvents();
        }

        static get app() {
            console.assert(KBEngineapp != undefined, "KBEngineApp is null");
            return KBEngineapp;
        }

        resetSocket() {
            try {
                if (KBEngineapp.socket != undefined && KBEngineapp.socket != null) {
                    var sock = KBEngineapp.socket;

                    sock.onopen = undefined;
                    sock.onerror = undefined;
                    sock.onmessage = undefined;
                    sock.onclose = undefined;
                    KBEngineapp.socket = null;
                    sock.close();
                }
            }
            catch (e) {
            }
        }

        reset() {
            if (KBEngineapp.entities != undefined && KBEngineapp.entities != null) {
                KBEngineapp.clearEntities(true);
            }

            KBEngineapp.resetSocket();

            KBEngineapp.currserver = "loginapp";
            KBEngineapp.currstate = "create";
            KBEngineapp.currconnect = "loginapp";

            // 扩展数据
            KBEngineapp.serverdatas = undefined;

            // 版本信息
            KBEngineapp.serverVersion = "";
            KBEngineapp.serverScriptVersion = "";
            KBEngineapp.serverProtocolMD5 = "";
            KBEngineapp.serverEntityDefMD5 = "";
            KBEngineapp.clientVersion = "2.5.0";
            KBEngineapp.clientScriptVersion = "0.1.0";

            // player的相关信息
            KBEngineapp.entity_uuid = null;
            KBEngineapp.entity_id = 0;
            KBEngineapp.entity_type = "";

            // 这个参数的选择必须与kbengine_defs.xml::cellapp/aliasEntityID的参数保持一致
            KBEngineapp.useAliasEntityID = true;

            // 当前玩家最后一次同步到服务端的位置与朝向与服务端最后一次同步过来的位置
            KBEngineapp.entityServerPos = new Vector3(0.0, 0.0, 0.0);

            // 客户端所有的实体
            KBEngineapp.entities = {};
            KBEngineapp.entityIDAliasIDList = [];
            KBEngineapp.controlledEntities = [];

            // 空间的信息
            KBEngineapp.spacedata = {};
            KBEngineapp.spaceID = 0;
            KBEngineapp.spaceResPath = "";
            KBEngineapp.isLoadedGeometry = false;

            var dateObject = new Date();
            KBEngineapp.lastTickTime = dateObject.getTime();
            KBEngineapp.lastTickCBTime = dateObject.getTime();

            mappingDataType();

            // 当前组件类别， 配套服务端体系
            KBEngineapp.component = "client";
        }

        installEvents() {
            KBEevent.register(KBEEventTypes.createAccount, KBEngineapp, "createAccount");
            KBEevent.register(KBEEventTypes.login, KBEngineapp, "login");
            KBEevent.register(KBEEventTypes.logout, KBEngineapp, "logout");
            KBEevent.register(KBEEventTypes.reloginBaseapp, KBEngineapp, "reloginBaseapp");
            KBEevent.register(KBEEventTypes.bindAccountEmail, KBEngineapp, "bindAccountEmail");
            KBEevent.register(KBEEventTypes.newPassword, KBEngineapp, "newPassword");
        }

        uninstallEvents() {
            KBEevent.deregister(KBEEventTypes.createAccount, KBEngineapp);
            KBEevent.deregister(KBEEventTypes.login, KBEngineapp);
            KBEevent.deregister(KBEEventTypes.logout, KBEngineapp);
            KBEevent.deregister(KBEEventTypes.reloginBaseapp, KBEngineapp);
            KBEevent.deregister(KBEEventTypes.bindAccountEmail, KBEngineapp);
            KBEevent.deregister(KBEEventTypes.newPassword, KBEngineapp);
        }

        hello() {
            var bundle = createBundleObject();

            if (KBEngineapp.currserver == "loginapp")
                bundle.newMessage(KBEmessages["Loginapp_hello"]);
            else
                bundle.newMessage(KBEmessages["Baseapp_hello"]);

            bundle.writeString(KBEngineapp.clientVersion);
            bundle.writeString(KBEngineapp.clientScriptVersion);
            bundle.writeBlob(KBEngineapp.encryptedKey);
            bundle.send(KBEngineapp);
        }

        player() {
            return KBEngineapp.entities[KBEngineapp.entity_id];
        }

        findEntity(entityID) {
            return KBEngineapp.entities[entityID];
        }

        connect(addr) {
            console.assert(KBEngineapp.socket == null, "Assertion of socket not is null");

            try {
                KBEngineapp.socket = new WebSocket(addr);
            }
            catch (e) {
                ERROR_MSG('WebSocket init error(' + e.toString() + ')!');
                KBEevent.fire(KBEEventTypes.onConnectionState, false);
                return;
            }

            KBEngineapp.socket.binaryType = "arraybuffer";
            KBEngineapp.socket.onopen = KBEngineapp.onopen;
            KBEngineapp.socket.onerror = KBEngineapp.onerror_before_onopen;
            KBEngineapp.socket.onmessage = KBEngineapp.onmessage;
            KBEngineapp.socket.onclose = KBEngineapp.onclose;
        }

        disconnect() {
            KBEngineapp.resetSocket();
        }

        onopen() {
            INFO_MSG('connect success!');
            KBEngineapp.socket.onerror = KBEngineapp.onerror_after_onopen;
            KBEevent.fire(KBEEventTypes.onConnectionState, true);
        }

        onerror_before_onopen(evt) {
            ERROR_MSG('onerror_before_onopen error:' + evt.data);
            KBEngineapp.resetSocket();
            KBEevent.fire(KBEEventTypes.onConnectionState, false);
        }

        onerror_after_onopen(evt) {
            ERROR_MSG('onerror_after_onopen error:' + evt.data);
            KBEngineapp.resetSocket();
            KBEevent.fire(KBEEventTypes.onDisconnected);
        }

        onmessage(msg) {
            var stream = KBEngineapp.msgStream;
            stream.setbuffer(msg.data);
            stream.wpos = msg.data.byteLength;

            var app = KBEngineapp;
            // var FragmentDataTypes = app.FragmentDataTypes;

            while (stream.length() > 0 || app.fragmentStream != null) {
                if (app.fragmentDatasFlag == app.FragmentDataTypes.FRAGMENT_DATA_UNKNOW) {
                    if (app.currMsgID == 0) {
                        if (MESSAGE_ID_LENGTH > 1 && stream.length() < MESSAGE_ID_LENGTH) {
                            app.writeFragmentMessage(app.FragmentDataTypes.FRAGMENT_DATA_MESSAGE_ID, stream, MESSAGE_ID_LENGTH);
                            break;
                        }

                        app.currMsgID = stream.readUint16();
                    }

                    var msgHandler = KBEclientmessages[app.currMsgID];

                    if (!msgHandler) {
                        app.currMsgID = 0;
                        app.currMsgLen = 0;
                        ERROR_MSG("KBEngineApp::onmessage[" + app.currserver + "]: not found msg(" + app.currMsgID + ")!");
                        break;
                    }

                    if (app.currMsgLen == 0) {
                        var msglen = msgHandler.length;
                        if (msglen == -1) {
                            if (stream.length() < MESSAGE_LENGTH_LENGTH) {
                                app.writeFragmentMessage(app.FragmentDataTypes.FRAGMENT_DATA_MESSAGE_LENGTH, stream, MESSAGE_LENGTH_LENGTH);
                                break;
                            }
                            else {
                                msglen = stream.readUint16();
                                app.currMsgLen = msglen;

                                // 扩展长度
                                if (msglen == MESSAGE_MAX_SIZE) {
                                    if (stream.length() < MESSAGE_LENGTH1_LENGTH) {
                                        app.writeFragmentMessage(app.FragmentDataTypes.FRAGMENT_DATA_MESSAGE_LENGTH1, stream, MESSAGE_LENGTH1_LENGTH);
                                        break;
                                    }

                                    app.currMsgLen = stream.readUint32();
                                }
                            }
                        }
                        else {
                            app.currMsgLen = msglen;
                        }
                    }

                    if (app.fragmentStream != null && app.fragmentStream.length() >= app.currMsgLen) {
                        msgHandler.handleMessage(app.fragmentStream);
                        app.fragmentStream.reclaimObject();
                        app.fragmentStream = null;
                    }
                    else if (stream.length() < app.currMsgLen && stream.length() > 0) {
                        app.writeFragmentMessage(app.FragmentDataTypes.FRAGMENT_DATA_MESSAGE_BODY, stream, app.currMsgLen);
                        break;
                    }
                    else {
                        var wpos = stream.wpos;
                        var rpos = stream.rpos + msglen;
                        stream.wpos = rpos;
                        msgHandler.handleMessage(stream);
                        stream.wpos = wpos;
                        stream.rpos = rpos;
                    }

                    app.currMsgID = 0;
                    app.currMsgLen = 0;
                }
                else {
                    if (app.mergeFragmentMessage(stream))
                        break;
                }
            }
        }

        writeFragmentMessage(FragmentDataType, stream, datasize) {
            if (!(stream instanceof MemoryStream)) {
                ERROR_MSG("writeFragmentMessage(): stream must be MemoryStream instances!");
                return;
            }

            var app = KBEngineapp;
            var opsize = stream.length();

            app.fragmentDatasRemain = datasize - opsize;
            app.fragmentDatasFlag = FragmentDataType;

            if (opsize > 0) {
                KBEngineapp.fragmentStream = createMemoryObject();
                KBEngineapp.fragmentStream.append(stream, stream.rpos, opsize);
                stream.done();
            }
        }

        mergeFragmentMessage(stream) {
            if (!(stream instanceof MemoryStream)) {
                ERROR_MSG("mergeFragmentMessage(): stream must be MemoryStream instances!");
                return false;
            }

            var opsize = stream.length();
            if (opsize == 0)
                return false;

            var app = KBEngineapp;
            var fragmentStream = app.fragmentStream;
            console.assert(fragmentStream != null);

            if (opsize >= app.fragmentDatasRemain) {
                var FragmentDataTypes = app.FragmentDataTypes;
                fragmentStream.append(stream, stream.rpos, app.fragmentDatasRemain);
                stream.rpos += app.fragmentDatasRemain;

                switch (app.fragmentDatasFlag) {
                    case FragmentDataTypes.FRAGMENT_DATA_MESSAGE_ID:
                        app.currMsgID = fragmentStream.readUint16();
                        break;

                    case FragmentDataTypes.FRAGMENT_DATA_MESSAGE_LENGTH:
                        app.currMsgLen = fragmentStream.readUint16();
                        break;

                    case FragmentDataTypes.FRAGMENT_DATA_MESSAGE_LENGTH1:
                        app.currMsgLen = fragmentStream.readUint32();
                        break;

                    case FragmentDataTypes.FRAGMENT_DATA_MESSAGE_BODY:
                    default:
                        break;
                }

                app.fragmentDatasFlag = FragmentDataTypes.FRAGMENT_DATA_UNKNOW;
                app.fragmentDatasRemain = 0;
                return false;
            }
            else {
                fragmentStream.append(stream, stream.rpos, opsize);
                app.fragmentDatasRemain -= opsize;
                stream.done();
                return true;
            }
        }

        onclose() {
            INFO_MSG('connect close:' + KBEngineapp.currserver);

            if (KBEngineapp.currconnect != KBEngineapp.currserver)
                return;

            KBEngineapp.resetSocket();
            KBEevent.fire(KBEEventTypes.onDisconnected);
            //if(KBEngineapp.currserver != "loginapp")
            //	KBEngineapp.reset();
        }

        send(msg) {
            KBEngineapp.socket.send(msg);
        }

        close() {
            INFO_MSG('KBEngine::close()');
            KBEngineapp.socket.close();
            KBEngineapp.reset();
        }

        update() {
            if (KBEngineapp.socket == null)
                return;

            var dateObject = new Date();
            if (KBEngineapp.args.serverHeartbeatTick > 0 && (dateObject.getTime() - KBEngineapp.lastTickTime) / 1000 > (KBEngineapp.args.serverHeartbeatTick / 2)) {
                // 如果心跳回调接收时间小于心跳发送时间，说明没有收到回调
                // 此时应该通知客户端掉线了
                if (KBEngineapp.lastTickCBTime < KBEngineapp.lastTickTime) {
                    ERROR_MSG("sendTick: Receive appTick timeout!");
                    KBEngineapp.socket.close();
                }

                if (KBEngineapp.currserver == "loginapp") {
                    if (KBEmessages["Loginapp_onClientActiveTick"] != undefined) {
                        var bundle = createBundleObject();
                        bundle.newMessage(KBEmessages["Loginapp_onClientActiveTick"]);
                        bundle.send(KBEngineapp);
                    }
                }
                else {
                    if (KBEmessages["Baseapp_onClientActiveTick"] != undefined) {
                        var bundle = createBundleObject();
                        bundle.newMessage(KBEmessages["Baseapp_onClientActiveTick"]);
                        bundle.send(KBEngineapp);
                    }
                }

                KBEngineapp.lastTickTime = dateObject.getTime();
            }

            KBEngineapp.updatePlayerToServer();
        }

        /*
            服务器心跳回调
        */
        Client_onAppActiveTickCB() {
            var dateObject = new Date();
            KBEngineapp.lastTickCBTime = dateObject.getTime();
        }

        /*
            通过错误id得到错误描述
        */
        serverErr(id) {
            var e = KBEngineapp.serverErrs[id];

            if (e == undefined) {
                return "";
            }

            return e.name + " [" + e.descr + "]";
        }

        /*
            服务端错误描述导入了
        */
        Client_onImportServerErrorsDescr(stream) {
            var size = stream.readUint16();
            while (size > 0) {
                size -= 1;

                var e = new ServerErr();
                e.id = stream.readUint16();
                e.name = UTF8ArrayToString(stream.readBlob());
                e.descr = UTF8ArrayToString(stream.readBlob());

                KBEngineapp.serverErrs[e.id] = e;

                INFO_MSG("Client_onImportServerErrorsDescr: id=" + e.id + ", name=" + e.name + ", descr=" + e.descr);
            }
        }

        Client_onImportClientSdk(stream) {
            var remainingFiles = stream.readInt32();
            var fileName = stream.readString();
            var fileSize = stream.readInt32();
            var fileDatas = stream.readBlob()
            KBEevent.fire("onImportClientSDK", remainingFiles, fileName, fileSize, fileDatas);
        }

        onOpenLoginapp_login() {
            INFO_MSG("KBEngineApp::onOpenLoginapp_login: successfully!");
            KBEevent.fire(KBEEventTypes.onConnectionState, true);

            KBEngineapp.currserver = "loginapp";
            KBEngineapp.currstate = "login";

            if (!KBEngineapp.loginappMessageImported) {
                var bundle = createBundleObject();
                bundle.newMessage(KBEmessages["Loginapp_importClientMessages"]);
                bundle.send(KBEngineapp);
                KBEngineapp.socket.onmessage = KBEngineapp.Client_onImportClientMessages;
                INFO_MSG("KBEngineApp::onOpenLoginapp_login: start importClientMessages ...");
                KBEevent.fire("Loginapp_importClientMessages");
            }
            else {
                KBEngineapp.onImportClientMessagesCompleted();
            }
        }

        onOpenLoginapp_createAccount() {
            KBEevent.fire(KBEEventTypes.onConnectionState, true);
            INFO_MSG("KBEngineApp::onOpenLoginapp_createAccount: successfully!");
            KBEngineapp.currserver = "loginapp";
            KBEngineapp.currstate = "createAccount";

            if (!KBEngineapp.loginappMessageImported) {
                var bundle = createBundleObject();
                bundle.newMessage(KBEmessages["Loginapp_importClientMessages"]);
                bundle.send(KBEngineapp);
                KBEngineapp.socket.onmessage = KBEngineapp.Client_onImportClientMessages;
                INFO_MSG("KBEngineApp::onOpenLoginapp_createAccount: start importClientMessages ...");
                KBEevent.fire("Loginapp_importClientMessages");
            }
            else {
                KBEngineapp.onImportClientMessagesCompleted();
            }
        }

        onImportClientMessagesCompleted() {
            INFO_MSG("KBEngineApp::onImportClientMessagesCompleted: successfully!");
            KBEngineapp.socket.onmessage = KBEngineapp.onmessage;
            KBEngineapp.hello();

            if (KBEngineapp.currserver == "loginapp") {
                if (!KBEngineapp.serverErrorsDescrImported) {
                    INFO_MSG("KBEngine::onImportClientMessagesCompleted(): send importServerErrorsDescr!");
                    KBEngineapp.serverErrorsDescrImported = true;
                    var bundle = createBundleObject();
                    bundle.newMessage(KBEmessages["Loginapp_importServerErrorsDescr"]);
                    bundle.send(KBEngineapp);
                }

                if (KBEngineapp.currstate == "login")
                    KBEngineapp.login_loginapp(false);
                else if (KBEngineapp.currstate == "resetpassword")
                    KBEngineapp.resetpassword_loginapp(false);
                else
                    KBEngineapp.createAccount_loginapp(false);

                KBEngineapp.loginappMessageImported = true;
            }
            else {
                KBEngineapp.baseappMessageImported = true;

                if (!KBEngineapp.entitydefImported) {
                    INFO_MSG("KBEngineApp::onImportClientMessagesCompleted: start importEntityDef ...");
                    var bundle = createBundleObject();
                    bundle.newMessage(KBEmessages["Baseapp_importClientEntityDef"]);
                    bundle.send(KBEngineapp);
                    KBEevent.fire("Baseapp_importClientEntityDef");
                }
                else {
                    KBEngineapp.onImportEntityDefCompleted();
                }
            }
        }

        createDataTypeFromStreams(stream, canprint) {
            var aliassize = stream.readUint16();
            INFO_MSG("KBEngineApp::createDataTypeFromStreams: importAlias(size=" + aliassize + ")!");

            while (aliassize > 0) {
                aliassize--;
                KBEngineapp.createDataTypeFromStream(stream, canprint);
            };

            for (var datatype in KBEngineDatatypes) {
                if (KBEngineDatatypes[datatype] != undefined) {
                    KBEngineDatatypes[datatype].bind();
                }
            }
        }

        createDataTypeFromStream(stream: MemoryStream, canprint) {
            var utype = stream.readUint16();
            var name = stream.readString();
            var valname = stream.readString();

            /* 有一些匿名类型，我们需要提供一个唯一名称放到datatypes中
                如：
                <onRemoveAvatar>
                    <Arg>	ARRAY <of> INT8 </of>		</Arg>
                </onRemoveAvatar>
            */
            if (valname.length == 0)
                valname = "Null_" + utype;

            if (canprint)
                INFO_MSG("KBEngineApp::Client_onImportClientEntityDef: importAlias(" + name + ":" + valname + ")!");

            if (name == "FIXED_DICT") {
                let datatype = new DATATYPE_FIXED_DICT();
                var keysize = stream.readUint8();
                datatype.implementedBy = stream.readString();

                while (keysize > 0) {
                    keysize--;

                    var keyname = stream.readString();
                    var keyutype = stream.readUint16();
                    datatype.dicttype[keyname] = keyutype;
                };

                KBEngineDatatypes[valname] = datatype;
            }
            else if (name == "ARRAY") {
                var uitemtype = stream.readUint16();
                let datatype = new DATATYPE_ARRAY();
                datatype.type = uitemtype;
                KBEngineDatatypes[valname] = datatype;
            }
            else {
                KBEngineDatatypes[valname] = KBEngineDatatypes[name];
            }

            KBEngineDatatypes[utype] = KBEngineDatatypes[valname];

            // 将用户自定义的类型补充到映射表中
            datatype2id[valname] = utype;
        }

        Client_onImportClientEntityDef(stream) {
            KBEngineapp.createDataTypeFromStreams(stream, true);

            while (stream.length() > 0) {
                var scriptmodule_name = stream.readString();
                var scriptUtype = stream.readUint16();
                var propertysize = stream.readUint16();
                var methodsize = stream.readUint16();
                var base_methodsize = stream.readUint16();
                var cell_methodsize = stream.readUint16();
                INFO_MSG("KBEngineApp::Client_onImportClientEntityDef: import(" + scriptmodule_name + "), propertys(" + propertysize + "), " +
                    "clientMethods(" + methodsize + "), baseMethods(" + base_methodsize + "), cellMethods(" + cell_methodsize + ")!");

                KBEngineModuledefs[scriptmodule_name] = {};
                var currModuleDefs = KBEngineModuledefs[scriptmodule_name];
                currModuleDefs["name"] = scriptmodule_name;
                currModuleDefs["propertys"] = {};
                currModuleDefs["methods"] = {};
                currModuleDefs["base_methods"] = {};
                currModuleDefs["cell_methods"] = {};
                KBEngineModuledefs[scriptUtype] = currModuleDefs;


                var self_propertys = currModuleDefs["propertys"];
                var self_methods = currModuleDefs["methods"];
                var self_base_methods = currModuleDefs["base_methods"];
                var self_cell_methods = currModuleDefs["cell_methods"];

                var Class = KBEallModules[scriptmodule_name];

                while (propertysize > 0) {
                    propertysize--;

                    var properUtype = stream.readUint16();
                    var properFlags = stream.readUint32();
                    var aliasID = stream.readInt16();
                    var name = stream.readString();
                    var defaultValStr = stream.readString();
                    var utype = KBEngineDatatypes[stream.readUint16()];
                    var setmethod = null;

                    if (Class != undefined) {
                        setmethod = Class.prototype["set_" + name];
                        if (setmethod == undefined)
                            setmethod = null;
                    }

                    var savedata = [properUtype, aliasID, name, defaultValStr, utype, setmethod, properFlags];
                    self_propertys[name] = savedata;

                    //适配组件：在服务器组件的Utype设定值在[1000, 2000]范围内
                    if (properUtype >= 1000 && properUtype <= 2000) {
                        self_propertys[aliasID] = savedata;
                    } else {
                        if (aliasID != -1) {
                            self_propertys[aliasID] = savedata;
                            currModuleDefs["usePropertyDescrAlias"] = true;
                        }
                        else {
                            self_propertys[properUtype] = savedata;
                            currModuleDefs["usePropertyDescrAlias"] = false;
                        }
                    }

                    INFO_MSG("KBEngineApp::Client_onImportClientEntityDef: add(" + scriptmodule_name + "), property(" + name + "/" + properUtype + ").");
                };

                while (methodsize > 0) {
                    methodsize--;

                    var methodUtype = stream.readUint16();
                    var aliasID = stream.readInt16();
                    var name = stream.readString();
                    var argssize = stream.readUint8();
                    var args = [];

                    while (argssize > 0) {
                        argssize--;
                        args.push(KBEngineDatatypes[stream.readUint16()]);
                    };

                    var savedata = [methodUtype, aliasID, name, args];
                    self_methods[name] = savedata;

                    if (aliasID != -1) {
                        self_methods[aliasID] = savedata;
                        currModuleDefs["useMethodDescrAlias"] = true;
                    }
                    else {
                        self_methods[methodUtype] = savedata;
                        currModuleDefs["useMethodDescrAlias"] = false;
                    }

                    INFO_MSG("KBEngineApp::Client_onImportClientEntityDef: add(" + scriptmodule_name + "), method(" + name + ").");
                };

                while (base_methodsize > 0) {
                    base_methodsize--;

                    var methodUtype = stream.readUint16();
                    var aliasID = stream.readInt16();
                    var name = stream.readString();
                    var argssize = stream.readUint8();
                    var args = [];

                    while (argssize > 0) {
                        argssize--;
                        args.push(KBEngineDatatypes[stream.readUint16()]);
                    };

                    self_base_methods[name] = [methodUtype, aliasID, name, args];
                    INFO_MSG("KBEngineApp::Client_onImportClientEntityDef: add(" + scriptmodule_name + "), base_method(" + name + ").");
                };

                while (cell_methodsize > 0) {
                    cell_methodsize--;

                    var methodUtype = stream.readUint16();
                    var aliasID = stream.readInt16();
                    var name = stream.readString();
                    var argssize = stream.readUint8();
                    var args = [];

                    while (argssize > 0) {
                        argssize--;
                        args.push(KBEngineDatatypes[stream.readUint16()]);
                    };

                    self_cell_methods[name] = [methodUtype, aliasID, name, args];
                    INFO_MSG("KBEngineApp::Client_onImportClientEntityDef: add(" + scriptmodule_name + "), cell_method(" + name + ").");
                };

                var defmethod = KBEallModules[scriptmodule_name];

                if (defmethod == undefined) {
                    ERROR_MSG("KBEngineApp::Client_onImportClientEntityDef: module(" + scriptmodule_name + ") not found!");
                }

                for (let key in currModuleDefs.propertys) {
                    var infos = currModuleDefs.propertys[key];
                    var properUtype = infos[0];
                    var aliasID = infos[1];
                    var name = infos[2];
                    var defaultValStr = infos[3];
                    var utype = infos[4];

                    if (defmethod != undefined && utype != undefined)
                        defmethod.prototype[name] = utype.parseDefaultValStr(defaultValStr);
                };

                for (let key in currModuleDefs.methods) {
                    var infos = currModuleDefs.methods[key];
                    var properUtype = infos[0];
                    var aliasID = infos[1];
                    var name = infos[2];
                    var args = infos[3];

                    if (defmethod != undefined && defmethod.prototype[name] == undefined) {
                        WARNING_MSG(scriptmodule_name + ":: method(" + name + ") no implement!");
                    }
                };
            }

            KBEngineapp.onImportEntityDefCompleted();
        }

        Client_onVersionNotMatch(stream) {
            KBEngineapp.serverVersion = stream.readString();
            ERROR_MSG("Client_onVersionNotMatch: verInfo=" + KBEngineapp.clientVersion + " not match(server: " + KBEngineapp.serverVersion + ")");
            KBEevent.fire(KBEEventTypes.onVersionNotMatch, KBEngineapp.clientVersion, KBEngineapp.serverVersion);
        }

        Client_onScriptVersionNotMatch(stream) {
            KBEngineapp.serverScriptVersion = stream.readString();
            ERROR_MSG("Client_onScriptVersionNotMatch: verInfo=" + KBEngineapp.clientScriptVersion + " not match(server: " + KBEngineapp.serverScriptVersion + ")");
            KBEevent.fire(KBEEventTypes.onScriptVersionNotMatch, KBEngineapp.clientScriptVersion, KBEngineapp.serverScriptVersion);
        }

        onImportEntityDefCompleted() {
            INFO_MSG("KBEngineApp::onImportEntityDefCompleted: successfully!");
            KBEngineapp.entitydefImported = true;
            KBEngineapp.login_baseapp(false);
        }

        importClientMessages(stream) {
            var app = KBEngineapp;

            while (app.currMsgCount > 0) {
                app.currMsgCount--;

                var msgid = stream.readUint16();
                var msglen = stream.readInt16();
                var msgname = stream.readString();
                var argtype = stream.readInt8();
                var argsize = stream.readUint8();
                var argstypes = new Array(argsize);

                for (var i = 0; i < argsize; i++) {
                    argstypes[i] = stream.readUint8();
                }

                var handler = null;
                var isClientMethod = msgname.indexOf("Client_") >= 0;
                if (isClientMethod) {
                    handler = app[msgname];
                    if (handler == null || handler == undefined) {
                        WARNING_MSG("KBEngineApp::onImportClientMessages[" + app.currserver + "]: interface(" + msgname + "/" + msgid + ") no implement!");
                        handler = null;
                    }
                    else {
                        INFO_MSG("KBEngineApp::onImportClientMessages: import(" + msgname + ") successfully!");
                    }
                }

                if (msgname.length > 0) {
                    KBEmessages[msgname] = new Message(msgid, msgname, msglen, argtype, argstypes, handler);

                    if (isClientMethod)
                        KBEclientmessages[msgid] = KBEmessages[msgname];
                    else
                        KBEmessages[KBEngineapp.currserver][msgid] = KBEmessages[msgname];
                }
                else {
                    KBEmessages[app.currserver][msgid] = new Message(msgid, msgname, msglen, argtype, argstypes, handler);
                }
            };

            app.onImportClientMessagesCompleted();
            app.currMsgID = 0;
            app.currMsgLen = 0;
            app.currMsgCount = 0;
            app.fragmentStream = null;
        }

        Client_onImportClientMessages(msg) {
            var stream = new MemoryStream(msg.data);
            stream.wpos = msg.data.byteLength;
            var app = KBEngineapp;

            if (app.currMsgID == 0) {
                app.currMsgID = stream.readUint16();
            }

            if (app.currMsgID == KBEmessages["onImportClientMessages"].id) {
                if (app.currMsgLen == 0) {
                    app.currMsgLen = stream.readUint16();
                    app.currMsgCount = stream.readUint16();
                }

                var FragmentDataTypes = app.FragmentDataTypes
                if (stream.length() + 2 < app.currMsgLen && app.fragmentStream == null) {
                    app.writeFragmentMessage(FragmentDataTypes.FRAGMENT_DATA_MESSAGE_BODY, stream, app.currMsgLen - 2);
                }
                else if (app.fragmentStream != null) {
                    app.mergeFragmentMessage(stream);

                    if (app.fragmentStream.length() + 2 >= app.currMsgLen) {
                        app.importClientMessages(app.fragmentStream);
                    }
                }
                else {
                    app.importClientMessages(stream);
                }
            }
            else {
                ERROR_MSG("KBEngineApp::onmessage: not found msg(" + app.currMsgID + ")!");
            }
        }

        createAccount(username, password, datas) {
            KBEngineapp.reset();
            KBEngineapp.username = username;
            KBEngineapp.password = password;
            KBEngineapp.clientdatas = datas;

            KBEngineapp.createAccount_loginapp(true);
        }

        getServerAddr(ip, port) {
            var serverAddr = ""
            if (KBEngineapp.args.domain != "") {
                if (port == 443) {
                    serverAddr = KBEngineapp.args.loginAddr + port
                } else {
                    serverAddr = KBEngineapp.args.baseAddr + port
                }
            } else {
                serverAddr = "ws://" + KBEngineapp.args.ip + ":" + port
            }
            return serverAddr;
        }

        createAccount_loginapp(noconnect) {
            if (noconnect) {
                var serverAddr = this.getServerAddr(KBEngineapp.ip, KBEngineapp.port);
                INFO_MSG("KBEngineApp::createAccount_loginapp: start connect to " + serverAddr + "!");
                KBEngineapp.currconnect = "loginapp";
                //这里需要调整
                KBEngineapp.connect(serverAddr);
                KBEngineapp.socket.onopen = KBEngineapp.onOpenLoginapp_createAccount;
            }
            else {
                var bundle = createBundleObject();
                bundle.newMessage(KBEmessages["Loginapp_reqCreateAccount"]);
                bundle.writeString(KBEngineapp.username);
                bundle.writeString(KBEngineapp.password);
                bundle.writeBlob(KBEngineapp.clientdatas);
                bundle.send(KBEngineapp);
            }
        }

        bindAccountEmail(emailAddress) {
            var bundle = createBundleObject();
            bundle.newMessage(KBEmessages["Baseapp_reqAccountBindEmail"]);
            bundle.writeInt32(KBEngineapp.entity_id);
            bundle.writeString(KBEngineapp.password);
            bundle.writeString(emailAddress);
            bundle.send(KBEngineapp);
        }

        newPassword(old_password, new_password) {
            var bundle = createBundleObject();
            bundle.newMessage(KBEmessages["Baseapp_reqAccountNewPassword"]);
            bundle.writeInt32(KBEngineapp.entity_id);
            bundle.writeString(old_password);
            bundle.writeString(new_password);
            bundle.send(KBEngineapp);
        }

        login(username, password, datas) {
            KBEngineapp.reset();
            KBEngineapp.username = username;
            KBEngineapp.password = password;
            KBEngineapp.clientdatas = datas;

            KBEngineapp.login_loginapp(true);
        }

        logout() {
            var bundle = createBundleObject();
            bundle.newMessage(KBEmessages["Baseapp_logoutBaseapp"]);
            bundle.writeUint64(KBEngineapp.entity_uuid);
            bundle.writeInt32(KBEngineapp.entity_id);
            bundle.send(KBEngineapp);
        }

        login_loginapp(noconnect) {
            if (noconnect) {
                var serverAddr = this.getServerAddr(KBEngineapp.args.ip, KBEngineapp.args.port);
                INFO_MSG("KBEngineApp::login_loginapp: start connect to " + serverAddr + "!");
                KBEngineapp.currconnect = "loginapp";
                KBEngineapp.connect(serverAddr);
                //这里需要调整
                //KBEngineapp.connect(KBEngineapp.ip, KBEngineapp.port);
                KBEngineapp.socket.onopen = KBEngineapp.onOpenLoginapp_login;
            }
            else {
                var bundle = createBundleObject();
                bundle.newMessage(KBEmessages["Loginapp_login"]);
                bundle.writeInt8(KBEngineapp.args.clientType); // clientType
                bundle.writeBlob(KBEngineapp.clientdatas);
                bundle.writeString(KBEngineapp.username);
                bundle.writeString(KBEngineapp.password);
                bundle.send(KBEngineapp);
            }
        }

        onOpenLoginapp_resetpassword() {
            INFO_MSG("KBEngineApp::onOpenLoginapp_resetpassword: successfully!");
            KBEngineapp.currserver = "loginapp";
            KBEngineapp.currstate = "resetpassword";

            if (!KBEngineapp.loginappMessageImported) {
                var bundle = createBundleObject();
                bundle.newMessage(KBEmessages["Loginapp_importClientMessages"]);
                bundle.send(KBEngineapp);
                KBEngineapp.socket.onmessage = KBEngineapp.Client_onImportClientMessages;
                INFO_MSG("KBEngineApp::onOpenLoginapp_resetpassword: start importClientMessages ...");
            }
            else {
                KBEngineapp.onImportClientMessagesCompleted();
            }
        }

        reset_password(username) {
            KBEngineapp.reset();
            KBEngineapp.username = username;
            KBEngineapp.resetpassword_loginapp(true);
        }

        resetpassword_loginapp(noconnect) {
            if (noconnect) {
                var serverAddr = this.getServerAddr(KBEngineapp.ip, KBEngineapp.port);
                INFO_MSG("KBEngineApp::resetpassword_loginapp: start connect to " + serverAddr + "!");
                KBEngineapp.currconnect = "loginapp";
                KBEngineapp.connect(serverAddr);
                //这里需要调整
                //KBEngineapp.connect(KBEngineapp.ip, KBEngineapp.port);
                KBEngineapp.socket.onopen = KBEngineapp.onOpenLoginapp_resetpassword;
            }
            else {
                var bundle = createBundleObject();
                bundle.newMessage(KBEmessages["Loginapp_reqAccountResetPassword"]);
                bundle.writeString(KBEngineapp.username);
                bundle.send(KBEngineapp);
            }
        }

        onOpenBaseapp() {
            INFO_MSG("KBEngineApp::onOpenBaseapp: successfully!");
            KBEngineapp.currserver = "baseapp";

            if (!KBEngineapp.baseappMessageImported) {
                var bundle = createBundleObject();
                bundle.newMessage(KBEmessages["Baseapp_importClientMessages"]);
                bundle.send(KBEngineapp);
                KBEngineapp.socket.onmessage = KBEngineapp.Client_onImportClientMessages;
                KBEevent.fire("Baseapp_importClientMessages");
            }
            else {
                KBEngineapp.onImportClientMessagesCompleted();
            }
        }

        login_baseapp(noconnect) {
            if (noconnect) {
                KBEevent.fire(KBEEventTypes.onLoginBaseapp);
                var serverAddr = this.getServerAddr(KBEngineapp.baseappIP, KBEngineapp.baseappTcpPort);
                INFO_MSG("KBEngineApp::login_baseapp: start connect to " + serverAddr + "!");
                KBEngineapp.currconnect = "baseapp";
                KBEngineapp.connect(serverAddr);
                //这里需要调整
                //KBEngineapp.connect(KBEngineapp.baseappIp, KBEngineapp.baseappTcpPort);

                if (KBEngineapp.socket != undefined && KBEngineapp.socket != null)
                    KBEngineapp.socket.onopen = KBEngineapp.onOpenBaseapp;
            }
            else {
                var bundle = createBundleObject();
                bundle.newMessage(KBEmessages["Baseapp_loginBaseapp"]);
                bundle.writeString(KBEngineapp.username);
                bundle.writeString(KBEngineapp.password);
                bundle.send(KBEngineapp);
            }
        }

        reloginBaseapp() {
            var dateObject = new Date();
            KBEngineapp.lastTickTime = dateObject.getTime();
            KBEngineapp.lastTickCBTime = dateObject.getTime();

            if (KBEngineapp.socket != undefined && KBEngineapp.socket != null)
                return;

            KBEngineapp.resetSocket();
            KBEevent.fire(KBEEventTypes.onReloginBaseapp);

            var serverAddr = this.getServerAddr(KBEngineapp.baseappIP, KBEngineapp.baseappTcpPort);
            INFO_MSG("KBEngineApp::reloginBaseapp: start connect to " + serverAddr + "!");
            KBEngineapp.currconnect = "baseapp";
            KBEngineapp.connect(serverAddr);
            //这里需要调整
            //KBEngineapp.connect(KBEngineapp.baseappIp, KBEngineapp.baseappTcpPort);

            if (KBEngineapp.socket != undefined && KBEngineapp.socket != null)
                KBEngineapp.socket.onopen = KBEngineapp.onReOpenBaseapp;
        }

        onReOpenBaseapp() {
            INFO_MSG("KBEngineApp::onReOpenBaseapp: successfully!");
            KBEngineapp.currserver = "baseapp";

            var bundle = createBundleObject();
            bundle.newMessage(KBEmessages["Baseapp_reloginBaseapp"]);
            bundle.writeString(KBEngineapp.username);
            bundle.writeString(KBEngineapp.password);
            bundle.writeUint64(KBEngineapp.entity_uuid);
            bundle.writeInt32(KBEngineapp.entity_id);
            bundle.send(KBEngineapp);

            var dateObject = new Date();
            KBEngineapp.lastTickCBTime = dateObject.getTime();
        }

        Client_onHelloCB(args) {
            KBEngineapp.serverVersion = args.readString();
            KBEngineapp.serverScriptVersion = args.readString();
            KBEngineapp.serverProtocolMD5 = args.readString();
            KBEngineapp.serverEntityDefMD5 = args.readString();

            var ctype = args.readInt32();

            INFO_MSG("KBEngineApp::Client_onHelloCB: verInfo(" + KBEngineapp.serverVersion + "), scriptVerInfo(" +
                KBEngineapp.serverScriptVersion + "), serverProtocolMD5(" + KBEngineapp.serverProtocolMD5 + "), serverEntityDefMD5(" +
                KBEngineapp.serverEntityDefMD5 + "), ctype(" + ctype + ")!");

            var dateObject = new Date();
            KBEngineapp.lastTickCBTime = dateObject.getTime();
        }

        Client_onLoginFailed(args) {
            var failedcode = args.readUint16();
            KBEngineapp.serverdatas = args.readBlob();
            ERROR_MSG("KBEngineApp::Client_onLoginFailed: failedcode=" + failedcode + "(" + KBEngineapp.serverErrs[failedcode].name + "), datas(" + KBEngineapp.serverdatas.length + ")!");
            KBEevent.fire(KBEEventTypes.onLoginFailed, failedcode, KBEngineapp.serverdatas);
        }

        Client_onLoginSuccessfully(args) {
            var accountName = args.readString();
            KBEngineapp.username = accountName;
            KBEngineapp.baseappIP = args.readString();
            KBEngineapp.baseappTcpPort = args.readUint16();
            KBEngineapp.baseappUdpPort = args.readUint16();
            KBEngineapp.serverdatas = args.readBlob();

            INFO_MSG("KBEngineApp::Client_onLoginSuccessfully: accountName(" + accountName + "), addr(" +
                KBEngineapp.baseappIP + ":" + KBEngineapp.baseappTcpPort + ":" + KBEngineapp.baseappUdpPort + "), datas(" + KBEngineapp.serverdatas.length + ")!");

            KBEngineapp.disconnect();
            KBEngineapp.login_baseapp(true);
        }

        Client_onLoginBaseappFailed(failedcode) {
            ERROR_MSG("KBEngineApp::Client_onLoginBaseappFailed: failedcode=" + failedcode + "(" + KBEngineapp.serverErrs[failedcode].name + ")!");
            KBEevent.fire(KBEEventTypes.onLoginBaseappFailed, failedcode);
        }

        Client_onReloginBaseappFailed(failedcode) {
            ERROR_MSG("KBEngineApp::Client_onReloginBaseappFailed: failedcode=" + failedcode + "(" + KBEngineapp.serverErrs[failedcode].name + ")!");
            KBEevent.fire(KBEEventTypes.onReloginBaseappFailed, failedcode);
        }

        Client_onReloginBaseappSuccessfully(stream) {
            KBEngineapp.entity_uuid = stream.readUint64();
            DEBUG_MSG("KBEngineApp::Client_onReloginBaseappSuccessfully: " + KBEngineapp.username);
            KBEevent.fire(KBEEventTypes.onReloginBaseappSuccessfully);
        }

        entityclass = {};
        getentityclass(entityType) {
            var runclass = KBEngineapp.entityclass[entityType];
            if (runclass == undefined) {
                //组件适配
                runclass = KBEallModules[entityType];
                if (runclass == undefined) {
                    ERROR_MSG("KBEngineApp::getentityclass: entityType(" + entityType + ") is error!");
                    return runclass;
                }
                else
                    KBEngineapp.entityclass[entityType] = runclass;
            }

            return runclass;
        }

        Client_onCreatedProxies(rndUUID, eid, entityType) {
            INFO_MSG("KBEngineApp::Client_onCreatedProxies: eid(" + eid + "), entityType(" + entityType + ")!");

            var entity = KBEngineapp.entities[eid];

            KBEngineapp.entity_uuid = rndUUID;
            KBEngineapp.entity_id = eid;

            if (entity == undefined) {
                var runclass = KBEngineapp.getentityclass(entityType);
                if (runclass == undefined)
                    return;

                var entity = new runclass();
                entity.id = eid;
                entity.className = entityType;

                entity.base = new EntityCall();
                entity.base.id = eid;
                entity.base.className = entityType;
                entity.base.type = ENTITYCALL_TYPE_BASE;

                KBEngineapp.entities[eid] = entity;

                var entityMessage = this.bufferedCreateEntityMessage[eid];
                if (entityMessage != undefined) {
                    KBEngineapp.Client_onUpdatePropertys(entityMessage);
                    delete this.bufferedCreateEntityMessage[eid];
                }

                entity.__init__();
                entity.inited = true;

                if (KBEngineapp.args.isOnInitCallPropertysSetMethods)
                    entity.callPropertysSetMethods();
                //组件适配：设置组件
                if (entity.setComponents != null) {
                    entity.setComponents(KBEngineModuledefs[entity.className])
                }
            }
            else {
                var entityMessage = this.bufferedCreateEntityMessage[eid];
                if (entityMessage != undefined) {
                    KBEngineapp.Client_onUpdatePropertys(entityMessage);
                    delete this.bufferedCreateEntityMessage[eid];
                }
            }
        }

        getViewEntityIDFromStream(stream) {
            var id = 0;
            if (KBEngineapp.entityIDAliasIDList.length > 255) {
                id = stream.readInt32();
            }
            else {
                var aliasID = stream.readUint8();

                // 如果为0且客户端上一步是重登陆或者重连操作并且服务端entity在断线期间一直处于在线状态
                // 则可以忽略这个错误, 因为cellapp可能一直在向baseapp发送同步消息， 当客户端重连上时未等
                // 服务端初始化步骤开始则收到同步信息, 此时这里就会出错。
                if (KBEngineapp.entityIDAliasIDList.length <= aliasID)
                    return 0;

                id = KBEngineapp.entityIDAliasIDList[aliasID];
            }

            return id;
        }

        onUpdatePropertys_(eid, stream) {
            var entity = KBEngineapp.entities[eid];

            if (entity == undefined) {
                var entityMessage = this.bufferedCreateEntityMessage[eid];
                if (entityMessage != undefined) {
                    ERROR_MSG("KBEngineApp::Client_onUpdatePropertys: entity(" + eid + ") not found!");
                    return;
                }

                var stream1 = new MemoryStream(stream.buffer);
                stream1.wpos = stream.wpos;
                stream1.rpos = stream.rpos - 4;
                this.bufferedCreateEntityMessage[eid] = stream1;
                return;
            }

            var currModule = KBEngineModuledefs[entity.className];
            var pdatas = currModule.propertys;
            var _t_utype = 0;
            //适配组件：更新实体属性、组件属性
            while (stream.length() > 0) {
                var _t_child_utype = 0;
                if (currModule.usePropertyDescrAlias) {
                    _t_utype = stream.readUint8();
                    _t_child_utype = stream.readUint8();
                }
                else {
                    _t_utype = stream.readUint16();
                    _t_child_utype = stream.readUint16();
                }
                if (_t_utype != 0) {
                    if (_t_child_utype != 0) {
                        //更新组件属性
                        var comPropertyData = pdatas[_t_utype]
                        if (comPropertyData !== undefined) {
                            var comObj = entity[comPropertyData[2]]
                            var className = comObj["className"]
                            var componentPData = KBEngineModuledefs[className].propertys[_t_child_utype]
                            var setmethod = componentPData[5]
                            var name = componentPData[2]
                            var flags = componentPData[6]
                            var val = componentPData[4].createFromStream(stream);
                            var oldval = comObj[name]
                            comObj[name] = val
                            if (setmethod != null) {
                                setmethod(oldval)
                            } else {
                                ERROR_MSG("组件：" + className + "不存在set方法：" + name);
                            }
                        }
                    } else {
                        // 暂不明确_t_utype !=0，而_t_child_utype = 0的含义
                    }
                } else {
                    // 这里_t_utype==0，是用来更新组件自身属性
                    //实体属性：更新实体上的属性、//组件属性：更新实体组件对象的baseEntityCall、cellEntityCall
                    if (pdatas[_t_child_utype] !== undefined) {
                        if (pdatas[_t_child_utype][0] >= 1000 && pdatas[_t_child_utype][0] <= 2000) {
                            //尚未处理
                        } else {
                            var propertydata = pdatas[_t_child_utype];
                            var setmethod = propertydata[5];
                            var flags = propertydata[6];
                            var val = propertydata[4].createFromStream(stream);
                            var oldval = entity[propertydata[2]];

                            INFO_MSG("KBEngineApp::Client_onUpdatePropertys: " + entity.className + "(id=" + eid + " " + propertydata[2] + ", val=" + val + ")!");

                            entity[propertydata[2]] = val;
                            if (setmethod != null) {
                                // base类属性或者进入世界后cell类属性会触发set_*方法
                                if (flags == 0x00000020 || flags == 0x00000040) {
                                    if (entity.inited)
                                        setmethod.call(entity, oldval);
                                }
                                else {
                                    if (entity.inWorld)
                                        setmethod.call(entity, oldval);
                                }
                            }
                        }
                    }
                }
            }
        }

        Client_onUpdatePropertysOptimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);
            KBEngineapp.onUpdatePropertys_(eid, stream);
        }

        Client_onUpdatePropertys(stream) {
            var eid = stream.readInt32();
            KBEngineapp.onUpdatePropertys_(eid, stream);
        }

        onRemoteMethodCall_(eid, stream) {
            var entity = KBEngineapp.entities[eid];

            if (entity == undefined) {
                ERROR_MSG("KBEngineApp::Client_onRemoteMethodCall: entity(" + eid + ") not found!");
                return;
            }

            var propertyUtype = 0;
            var methodUtype = 0;
            if (KBEngineModuledefs[entity.className].usePropertyDescrAlias) {
                propertyUtype = stream.readUint8();
            } else {
                propertyUtype = stream.readUint16();
            }
            if (KBEngineModuledefs[entity.className].useMethodDescrAlias) {
                methodUtype = stream.readUint8();
            } else {
                methodUtype = stream.readUint16();
            }

            if (propertyUtype == 0) {
                //实体方法
                var methoddata = KBEngineModuledefs[entity.className].methods[methodUtype];
                if (methoddata !== undefined) {
                    if (entity[methoddata[2]] != undefined) {
                        var args = [];
                        var argsdata = methoddata[3];
                        for (var i = 0; i < argsdata.length; i++) {
                            args.push(argsdata[i].createFromStream(stream));
                        }
                        entity[methoddata[2]].apply(entity, args)
                    }
                }
            } else {
                //实体组件方法
                var comName = KBEngineModuledefs[entity.className].propertys[propertyUtype][2]
                var comObj = entity[comName]
                var methoddata = KBEngineModuledefs[comObj.className].methods[methodUtype]
                if (comObj[methoddata[2]] != null) {
                    var args = [];
                    var argsdata = methoddata[3];
                    for (var i = 0; i < argsdata.length; i++) {
                        args.push(argsdata[i].createFromStream(stream));
                    }
                    comObj[methoddata[2]].apply(comObj, args)
                }
            }
        }

        Client_onRemoteMethodCallOptimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);
            KBEngineapp.onRemoteMethodCall_(eid, stream);
        }

        Client_onRemoteMethodCall(stream) {
            var eid = stream.readInt32();
            KBEngineapp.onRemoteMethodCall_(eid, stream);
        }

        Client_onEntityEnterWorld(stream) {
            var eid = stream.readInt32();
            if (KBEngineapp.entity_id > 0 && eid != KBEngineapp.entity_id)
                KBEngineapp.entityIDAliasIDList.push(eid)

            var entityType;
            let defCount = 0;
            for (let node in KBEngineModuledefs) {
                defCount += 1;
            }
            if (defCount > 255)
                entityType = stream.readUint16();
            else
                entityType = stream.readUint8();

            var isOnGround = 0;

            if (stream.length() > 0)
                isOnGround = stream.readInt8();

            entityType = KBEngineModuledefs[entityType].name;
            INFO_MSG("KBEngineApp::Client_onEntityEnterWorld: " + entityType + "(" + eid + "), spaceID(" + KBEngineapp.spaceID + "), isOnGround(" + isOnGround + ")!");

            var entity = KBEngineapp.entities[eid];
            if (entity == undefined) {
                var entityMessage = this.bufferedCreateEntityMessage[eid];
                if (entityMessage == undefined) {
                    ERROR_MSG("KBEngineApp::Client_onEntityEnterWorld: entity(" + eid + ") not found!");
                    return;
                }

                var runclass = KBEngineapp.getentityclass(entityType);
                if (runclass == undefined)
                    return;

                var entity = new runclass();
                entity.id = eid;
                entity.className = entityType;

                entity.cell = new EntityCall();
                entity.cell.id = eid;
                entity.cell.className = entityType;
                entity.cell.type = ENTITYCALL_TYPE_CELL;

                KBEngineapp.entities[eid] = entity;

                KBEngineapp.Client_onUpdatePropertys(entityMessage);
                delete this.bufferedCreateEntityMessage[eid];

                entity.isOnGround = isOnGround > 0;
                entity.__init__();
                entity.inited = true;
                entity.inWorld = true;
                entity.enterWorld();

                if (KBEngineapp.args.isOnInitCallPropertysSetMethods)
                    entity.callPropertysSetMethods();

                entity.set_direction(entity.direction);
                entity.set_position(entity.position);
            }
            else {
                if (!entity.inWorld) {
                    entity.cell = new EntityCall();
                    entity.cell.id = eid;
                    entity.cell.className = entityType;
                    entity.cell.type = ENTITYCALL_TYPE_CELL;

                    // 安全起见， 这里清空一下
                    // 如果服务端上使用giveClientTo切换控制权
                    // 之前的实体已经进入世界， 切换后的实体也进入世界， 这里可能会残留之前那个实体进入世界的信息
                    KBEngineapp.entityIDAliasIDList = [];
                    KBEngineapp.entities = {}
                    KBEngineapp.entities[entity.id] = entity;

                    entity.set_direction(entity.direction);
                    entity.set_position(entity.position);

                    KBEngineapp.entityServerPos.x = entity.position.x;
                    KBEngineapp.entityServerPos.y = entity.position.y;
                    KBEngineapp.entityServerPos.z = entity.position.z;

                    entity.isOnGround = isOnGround > 0;
                    entity.inWorld = true;
                    entity.enterWorld();

                    if (KBEngineapp.args.isOnInitCallPropertysSetMethods)
                        entity.callPropertysSetMethods();
                }
            }
        }

        Client_onEntityLeaveWorldOptimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);
            KBEngineapp.Client_onEntityLeaveWorld(eid);
        }

        Client_onEntityLeaveWorld(eid) {
            var entity = KBEngineapp.entities[eid];
            if (entity == undefined) {
                ERROR_MSG("KBEngineApp::Client_onEntityLeaveWorld: entity(" + eid + ") not found!");
                return;
            }

            if (entity.inWorld)
                entity.leaveWorld();

            if (KBEngineapp.entity_id > 0 && eid != KBEngineapp.entity_id) {
                var newArray0 = [];

                for (var i = 0; i < KBEngineapp.controlledEntities.length; i++) {
                    if (KBEngineapp.controlledEntities[i] != eid) {
                        newArray0.push(KBEngineapp.controlledEntities[i]);
                    }
                    else {
                        KBEevent.fire(KBEEventTypes.onLoseControlledEntity);
                    }
                }

                KBEngineapp.controlledEntities = newArray0

                delete KBEngineapp.entities[eid];

                var newArray = [];
                for (var i = 0; i < KBEngineapp.entityIDAliasIDList.length; i++) {
                    if (KBEngineapp.entityIDAliasIDList[i] != eid) {
                        newArray.push(KBEngineapp.entityIDAliasIDList[i]);
                    }
                }

                KBEngineapp.entityIDAliasIDList = newArray
            }
            else {
                KBEngineapp.clearSpace(false);
                entity.cell = null;
            }
        }

        Client_onEntityDestroyed(eid) {
            INFO_MSG("KBEngineApp::Client_onEntityDestroyed: entity(" + eid + ")!");

            var entity = KBEngineapp.entities[eid];
            if (entity == undefined) {
                ERROR_MSG("KBEngineApp::Client_onEntityDestroyed: entity(" + eid + ") not found!");
                return;
            }

            if (entity.inWorld) {
                if (KBEngineapp.entity_id == eid)
                    KBEngineapp.clearSpace(false);

                entity.leaveWorld();
            }

            delete KBEngineapp.entities[eid];
        }

        Client_onEntityEnterSpace(stream) {
            var eid = stream.readInt32();
            KBEngineapp.spaceID = stream.readUint32();
            var isOnGround = true;

            if (stream.length() > 0)
                isOnGround = stream.readInt8();

            var entity = KBEngineapp.entities[eid];
            if (entity == undefined) {
                ERROR_MSG("KBEngineApp::Client_onEntityEnterSpace: entity(" + eid + ") not found!");
                return;
            }

            entity.isOnGround = isOnGround;
            KBEngineapp.entityServerPos.x = entity.position.x;
            KBEngineapp.entityServerPos.y = entity.position.y;
            KBEngineapp.entityServerPos.z = entity.position.z;
            entity.enterSpace();
        }

        Client_onEntityLeaveSpace(eid) {
            var entity = KBEngineapp.entities[eid];
            if (entity == undefined) {
                ERROR_MSG("KBEngineApp::Client_onEntityLeaveSpace: entity(" + eid + ") not found!");
                return;
            }

            KBEngineapp.clearSpace(false);
            entity.leaveSpace();
        }

        Client_onKicked(failedcode) {
            ERROR_MSG("KBEngineApp::Client_onKicked: failedcode=" + failedcode + "(" + KBEngineapp.serverErrs[failedcode].name + ")!");
            KBEevent.fire(KBEEventTypes.onKicked, failedcode);
        }

        Client_onCreateAccountResult(stream) {
            var retcode = stream.readUint16();
            var datas = stream.readBlob();

            KBEevent.fire(KBEEventTypes.onCreateAccountResult, retcode, datas);

            if (retcode != 0) {
                ERROR_MSG("KBEngineApp::Client_onCreateAccountResult: " + KBEngineapp.username + " create is failed! code=" + retcode + "(" + KBEngineapp.serverErrs[retcode].name + "!");
                return;
            }

            INFO_MSG("KBEngineApp::Client_onCreateAccountResult: " + KBEngineapp.username + " create is successfully!");
        }

        Client_onControlEntity(eid, isControlled) {
            var entity = KBEngineapp.entities[eid];
            if (entity == undefined) {
                ERROR_MSG("KBEngineApp::Client_onControlEntity: entity(" + eid + ") not found!");
                return;
            }

            var isCont = isControlled != 0;
            if (isCont) {
                // 如果被控制者是玩家自己，那表示玩家自己被其它人控制了
                // 所以玩家自己不应该进入这个被控制列表
                if (KBEngineapp.player().id != entity.id) {
                    KBEngineapp.controlledEntities.push(entity)
                }
            }
            else {
                var newArray = [];

                // for (var i = 0; i < KBEngineapp.controlledEntities.length; i++)
                //     if (KBEngineapp.controlledEntities[i] != entity.id)
                //         newArray.push(KBEngineapp.controlledEntities[i]);

                // KBEngineapp.controlledEntities = newArray
                let index = KBEngineapp.controlledEntities.indexOf(entity);
                if (index != -1)
                    KBEngineapp.controlledEntities.splice(index, 1);
            }

            entity.isControlled = isCont;

            try {
                entity.onControlled(isCont);
                KBEevent.fire(KBEEventTypes.onControlled, entity, isCont);
            }
            catch (e) {
                ERROR_MSG("KBEngine::Client_onControlEntity: entity id = '" + eid + "', is controlled = '" + isCont + "', error = '" + e + "'");
            }
        }

        updatePlayerToServer() {
            var player = KBEngineapp.player();
            if (player == undefined || player.inWorld == false || KBEngineapp.spaceID == 0 || player.isControlled)
                return;

            if (player.entityLastLocalPos.distance(player.position) > 0.001 || player.entityLastLocalDir.distance(player.direction) > 0.001) {
                // 记录玩家最后一次上报位置时自身当前的位置
                player.entityLastLocalPos.x = player.position.x;
                player.entityLastLocalPos.y = player.position.y;
                player.entityLastLocalPos.z = player.position.z;
                player.entityLastLocalDir.x = player.direction.x;
                player.entityLastLocalDir.y = player.direction.y;
                player.entityLastLocalDir.z = player.direction.z;

                var bundle = createBundleObject();
                bundle.newMessage(KBEmessages["Baseapp_onUpdateDataFromClient"]);
                bundle.writeFloat(player.position.x);
                bundle.writeFloat(player.position.y);
                bundle.writeFloat(player.position.z);
                bundle.writeFloat(player.direction.x);
                bundle.writeFloat(player.direction.y);
                bundle.writeFloat(player.direction.z);
                bundle.writeUint8(player.isOnGround);
                bundle.writeUint32(KBEngineapp.spaceID);
                bundle.send(KBEngineapp);
            }

            // 开始同步所有被控制了的entity的位置
            for (var eid in KBEngineapp.controlledEntities) {
                var entity = KBEngineapp.controlledEntities[eid];
                let position = entity.position;
                let direction = entity.direction;

                let posHasChanged = entity.entityLastLocalPos.distance(position) > 0.001;
                let dirHasChanged = entity.entityLastLocalDir.distance(direction) > 0.001;

                if (posHasChanged || dirHasChanged) {
                    entity.entityLastLocalPos = position;
                    entity.entityLastLocalDir = direction;

                    var bundle = createBundleObject();
                    bundle.newMessage(KBEmessages["Baseapp_onUpdateDataFromClientForControlledEntity"]);
                    bundle.writeInt32(entity.id);
                    bundle.writeFloat(position.x);
                    bundle.writeFloat(position.y);
                    bundle.writeFloat(position.z);

                    bundle.writeFloat(direction.x);
                    bundle.writeFloat(direction.y);
                    bundle.writeFloat(direction.z);
                    bundle.writeUint8(entity.isOnGround);
                    bundle.writeUint32(KBEngineapp.spaceID);
                    bundle.send(KBEngineapp);
                }
            }
        }

        addSpaceGeometryMapping(spaceID, respath) {
            INFO_MSG("KBEngineApp::addSpaceGeometryMapping: spaceID(" + spaceID + "), respath(" + respath + ")!");

            KBEngineapp.spaceID = spaceID;
            KBEngineapp.spaceResPath = respath;
            KBEevent.fire(KBEEventTypes.addSpaceGeometryMapping, respath);
        }

        clearSpace(isAll) {
            KBEngineapp.entityIDAliasIDList = [];
            KBEngineapp.spacedata = {};
            KBEngineapp.clearEntities(isAll);
            KBEngineapp.isLoadedGeometry = false;
            KBEngineapp.spaceID = 0;
        }

        clearEntities(isAll) {
            KBEngineapp.controlledEntities = []

            if (!isAll) {
                var entity = KBEngineapp.player();

                for (var eid in KBEngineapp.entities) {
                    if (parseInt(eid) == entity.id)
                        continue;

                    if (KBEngineapp.entities[eid].inWorld) {
                        KBEngineapp.entities[eid].leaveWorld();
                    }

                    KBEngineapp.entities[eid].onDestroy();
                }

                KBEngineapp.entities = {}
                KBEngineapp.entities[entity.id] = entity;
            }
            else {
                for (var eid in KBEngineapp.entities) {
                    if (KBEngineapp.entities[eid].inWorld) {
                        KBEngineapp.entities[eid].leaveWorld();
                    }

                    KBEngineapp.entities[eid].onDestroy();
                }

                KBEngineapp.entities = {}
            }
        }

        Client_initSpaceData(stream) {
            KBEngineapp.clearSpace(false);

            KBEngineapp.spaceID = stream.readInt32();
            while (stream.length() > 0) {
                var key = stream.readString();
                var value = stream.readString();
                KBEngineapp.Client_setSpaceData(KBEngineapp.spaceID, key, value);
            }

            INFO_MSG("KBEngineApp::Client_initSpaceData: spaceID(" + KBEngineapp.spaceID + "), datas(" + KBEngineapp.spacedata + ")!");
        }

        Client_setSpaceData(spaceID, key, value) {
            INFO_MSG("KBEngineApp::Client_setSpaceData: spaceID(" + spaceID + "), key(" + key + "), value(" + value + ")!");

            KBEngineapp.spacedata[key] = value;

            if (key == "_mapping")
                KBEngineapp.addSpaceGeometryMapping(spaceID, value);

            KBEevent.fire(KBEEventTypes.onSetSpaceData, spaceID, key, value);
        }

        Client_delSpaceData(spaceID, key) {
            INFO_MSG("KBEngineApp::Client_delSpaceData: spaceID(" + spaceID + "), key(" + key + ")!");

            delete KBEngineapp.spacedata[key];
            KBEevent.fire(KBEEventTypes.onDelSpaceData, spaceID, key);
        }

        Client_getSpaceData(spaceID, key) {
            return KBEngineapp.spacedata[key];
        }

        Client_onUpdateBasePos(x, y, z) {
            KBEngineapp.entityServerPos.x = x;
            KBEngineapp.entityServerPos.y = y;
            KBEngineapp.entityServerPos.z = z;

            var entity = KBEngineapp.player();
            if (entity != undefined && entity.isControlled) {
                entity.position.x = KBEngineapp.entityServerPos.x;
                entity.position.y = KBEngineapp.entityServerPos.y;
                entity.position.z = KBEngineapp.entityServerPos.z;

                KBEevent.fire(KBEEventTypes.updatePosition, entity);
                entity.onUpdateVolatileData();
            }
        }

        Client_onUpdateBasePosXZ(x, z) {
            KBEngineapp.entityServerPos.x = x;
            KBEngineapp.entityServerPos.z = z;

            var entity = KBEngineapp.player();
            if (entity != undefined && entity.isControlled) {
                entity.position.x = KBEngineapp.entityServerPos.x;
                entity.position.y = KBEngineapp.entityServerPos.y;
                entity.position.z = KBEngineapp.entityServerPos.z;

                KBEevent.fire(KBEEventTypes.updatePosition, entity);
                entity.onUpdateVolatileData();
            }
        }

        Client_onUpdateData(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);
            var entity = KBEngineapp.entities[eid];
            if (entity == undefined) {
                ERROR_MSG("KBEngineApp::Client_onUpdateData: entity(" + eid + ") not found!");
                return;
            }
        }

        Client_onSetEntityPosAndDir(stream) {
            var eid = stream.readInt32();
            var entity = KBEngineapp.entities[eid];
            if (entity == undefined) {
                ERROR_MSG("KBEngineApp::Client_onSetEntityPosAndDir: entity(" + eid + ") not found!");
                return;
            }

            entity.position.x = stream.readFloat();
            entity.position.y = stream.readFloat();
            entity.position.z = stream.readFloat();
            entity.direction.x = stream.readFloat();
            entity.direction.y = stream.readFloat();
            entity.direction.z = stream.readFloat();

            // 记录玩家最后一次上报位置时自身当前的位置
            entity.entityLastLocalPos.x = entity.position.x;
            entity.entityLastLocalPos.y = entity.position.y;
            entity.entityLastLocalPos.z = entity.position.z;
            entity.entityLastLocalDir.x = entity.direction.x;
            entity.entityLastLocalDir.y = entity.direction.y;
            entity.entityLastLocalDir.z = entity.direction.z;

            entity.set_direction(entity.direction);
            entity.set_position(entity.position);
        }

        Client_onUpdateData_ypr(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var y = stream.readFloat();
            var p = stream.readFloat();
            var r = stream.readFloat();

            KBEngineapp._updateVolatileData(eid, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, y, p, r, -1, false);
        }

        Client_onUpdateData_yp(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var y = stream.readFloat();
            var p = stream.readFloat();

            KBEngineapp._updateVolatileData(eid, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, y, p, KBE_FLT_MAX, -1, false);
        }

        Client_onUpdateData_yr(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var y = stream.readFloat();
            var r = stream.readFloat();

            KBEngineapp._updateVolatileData(eid, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, y, KBE_FLT_MAX, r, -1, false);
        }

        Client_onUpdateData_pr(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var p = stream.readFloat();
            var r = stream.readFloat();

            KBEngineapp._updateVolatileData(eid, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, p, r, -1, false);
        }

        Client_onUpdateData_y(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var y = stream.readFloat();

            KBEngineapp._updateVolatileData(eid, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, y, KBE_FLT_MAX, KBE_FLT_MAX, -1, false);
        }

        Client_onUpdateData_p(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var p = stream.readFloat();

            KBEngineapp._updateVolatileData(eid, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, p, KBE_FLT_MAX, -1, false);
        }

        Client_onUpdateData_r(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var r = stream.readFloat();

            KBEngineapp._updateVolatileData(eid, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, r, -1, false);
        }

        Client_onUpdateData_xz(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var x = stream.readFloat();
            var z = stream.readFloat();

            KBEngineapp._updateVolatileData(eid, x, KBE_FLT_MAX, z, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, 1, false);
        }

        Client_onUpdateData_xz_ypr(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var x = stream.readFloat();
            var z = stream.readFloat();

            var y = stream.readFloat();
            var p = stream.readFloat();
            var r = stream.readFloat();

            KBEngineapp._updateVolatileData(eid, x, KBE_FLT_MAX, z, y, p, r, 1, false);
        }

        Client_onUpdateData_xz_yp(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var x = stream.readFloat();
            var z = stream.readFloat();

            var y = stream.readFloat();
            var p = stream.readFloat();

            KBEngineapp._updateVolatileData(eid, x, KBE_FLT_MAX, z, y, p, KBE_FLT_MAX, 1, false);
        }

        Client_onUpdateData_xz_yr(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var x = stream.readFloat();
            var z = stream.readFloat();

            var y = stream.readFloat();
            var r = stream.readFloat();

            KBEngineapp._updateVolatileData(eid, x, KBE_FLT_MAX, z, y, KBE_FLT_MAX, r, 1, false);
        }

        Client_onUpdateData_xz_pr(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var x = stream.readFloat();
            var z = stream.readFloat();

            var p = stream.readFloat();
            var r = stream.readFloat();

            KBEngineapp._updateVolatileData(eid, x, KBE_FLT_MAX, z, KBE_FLT_MAX, p, r, 1, false);
        }

        Client_onUpdateData_xz_y(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var x = stream.readFloat();
            var z = stream.readFloat();

            var y = stream.readFloat();

            KBEngineapp._updateVolatileData(eid, x, KBE_FLT_MAX, z, y, KBE_FLT_MAX, KBE_FLT_MAX, 1, false);
        }

        Client_onUpdateData_xz_p(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var x = stream.readFloat();
            var z = stream.readFloat();

            var p = stream.readFloat();

            KBEngineapp._updateVolatileData(eid, x, KBE_FLT_MAX, z, KBE_FLT_MAX, p, KBE_FLT_MAX, 1, false);
        }

        Client_onUpdateData_xz_r(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var x = stream.readFloat();
            var z = stream.readFloat();

            var r = stream.readFloat();

            KBEngineapp._updateVolatileData(eid, x, KBE_FLT_MAX, z, KBE_FLT_MAX, KBE_FLT_MAX, r, 1, false);
        }

        Client_onUpdateData_xyz(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var x = stream.readFloat();
            var y = stream.readFloat();
            var z = stream.readFloat();

            KBEngineapp._updateVolatileData(eid, x, y, z, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, 0, false);
        }

        Client_onUpdateData_xyz_ypr(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var x = stream.readFloat();
            var y = stream.readFloat();
            var z = stream.readFloat();

            var yaw = stream.readFloat();
            var p = stream.readFloat();
            var r = stream.readFloat();

            KBEngineapp._updateVolatileData(eid, x, y, z, yaw, p, r, 0, false);
        }

        Client_onUpdateData_xyz_yp(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var x = stream.readFloat();
            var y = stream.readFloat();
            var z = stream.readFloat();

            var yaw = stream.readFloat();
            var p = stream.readFloat();

            KBEngineapp._updateVolatileData(eid, x, y, z, yaw, p, KBE_FLT_MAX, 0, false);
        }

        Client_onUpdateData_xyz_yr(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var x = stream.readFloat();
            var y = stream.readFloat();
            var z = stream.readFloat();

            var yaw = stream.readFloat();
            var r = stream.readFloat();

            KBEngineapp._updateVolatileData(eid, x, y, z, yaw, KBE_FLT_MAX, r, 0, false);
        }

        Client_onUpdateData_xyz_pr(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var x = stream.readFloat();
            var y = stream.readFloat();
            var z = stream.readFloat();

            var p = stream.readFloat();
            var r = stream.readFloat();

            KBEngineapp._updateVolatileData(eid, x, y, z, KBE_FLT_MAX, p, r, 0, false);
        }

        Client_onUpdateData_xyz_y(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var x = stream.readFloat();
            var y = stream.readFloat();
            var z = stream.readFloat();

            var yaw = stream.readFloat();

            KBEngineapp._updateVolatileData(eid, x, y, z, yaw, KBE_FLT_MAX, KBE_FLT_MAX, 0, false);
        }

        Client_onUpdateData_xyz_p(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var x = stream.readFloat();
            var y = stream.readFloat();
            var z = stream.readFloat();

            var p = stream.readFloat();

            KBEngineapp._updateVolatileData(eid, x, y, z, KBE_FLT_MAX, p, KBE_FLT_MAX, 0, false);
        }

        Client_onUpdateData_xyz_r(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var x = stream.readFloat();
            var y = stream.readFloat();
            var z = stream.readFloat();

            var p = stream.readFloat();

            KBEngineapp._updateVolatileData(eid, x, y, z, p, KBE_FLT_MAX, KBE_FLT_MAX, 0, false);
        }

        //--------------------optiom------------------------//
        Client_onUpdateData_ypr_optimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var y = stream.readInt8();
            var p = stream.readInt8();
            var r = stream.readInt8();

            KBEngineapp._updateVolatileData(eid, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, y, p, r, -1, true);
        }

        Client_onUpdateData_yp_optimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var y = stream.readInt8();
            var p = stream.readInt8();

            KBEngineapp._updateVolatileData(eid, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, y, p, KBE_FLT_MAX, -1, true);
        }

        Client_onUpdateData_yr_optimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var y = stream.readInt8();
            var r = stream.readInt8();

            KBEngineapp._updateVolatileData(eid, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, y, KBE_FLT_MAX, r, -1, true);
        }

        Client_onUpdateData_pr_optimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var p = stream.readInt8();
            var r = stream.readInt8();

            KBEngineapp._updateVolatileData(eid, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, p, r, -1, true);
        }

        Client_onUpdateData_y_optimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var y = stream.readInt8();

            KBEngineapp._updateVolatileData(eid, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, y, KBE_FLT_MAX, KBE_FLT_MAX, -1, true);
        }

        Client_onUpdateData_p_optimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var p = stream.readInt8();

            KBEngineapp._updateVolatileData(eid, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, p, KBE_FLT_MAX, -1, true);
        }

        Client_onUpdateData_r_optimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var r = stream.readInt8();

            KBEngineapp._updateVolatileData(eid, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, r, -1, true);
        }

        Client_onUpdateData_xz_optimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var xz = stream.readPackXZ();

            KBEngineapp._updateVolatileData(eid, xz[0], KBE_FLT_MAX, xz[1], KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, 1, true);
        }

        Client_onUpdateData_xz_ypr_optimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var xz = stream.readPackXZ();

            var y = stream.readInt8();
            var p = stream.readInt8();
            var r = stream.readInt8();

            KBEngineapp._updateVolatileData(eid, xz[0], KBE_FLT_MAX, xz[1], y, p, r, 1, true);
        }

        Client_onUpdateData_xz_yp_optimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var xz = stream.readPackXZ();

            var y = stream.readInt8();
            var p = stream.readInt8();

            KBEngineapp._updateVolatileData(eid, xz[0], KBE_FLT_MAX, xz[1], y, p, KBE_FLT_MAX, 1, true);
        }

        Client_onUpdateData_xz_yr_optimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var xz = stream.readPackXZ();

            var y = stream.readInt8();
            var r = stream.readInt8();

            KBEngineapp._updateVolatileData(eid, xz[0], KBE_FLT_MAX, xz[1], y, KBE_FLT_MAX, r, 1, true);
        }

        Client_onUpdateData_xz_pr_optimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var xz = stream.readPackXZ();

            var p = stream.readInt8();
            var r = stream.readInt8();

            KBEngineapp._updateVolatileData(eid, xz[0], KBE_FLT_MAX, xz[1], KBE_FLT_MAX, p, r, 1, true);
        }

        Client_onUpdateData_xz_y_optimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var xz = stream.readPackXZ();

            var y = stream.readInt8();

            KBEngineapp._updateVolatileData(eid, xz[0], KBE_FLT_MAX, xz[1], y, KBE_FLT_MAX, KBE_FLT_MAX, 1, true);
        }

        Client_onUpdateData_xz_p_optimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var xz = stream.readPackXZ();

            var p = stream.readInt8();

            KBEngineapp._updateVolatileData(eid, xz[0], KBE_FLT_MAX, xz[1], KBE_FLT_MAX, p, KBE_FLT_MAX, 1, true);
        }

        Client_onUpdateData_xz_r_optimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var xz = stream.readPackXZ();

            var r = stream.readInt8();

            KBEngineapp._updateVolatileData(eid, xz[0], KBE_FLT_MAX, xz[1], KBE_FLT_MAX, KBE_FLT_MAX, r, 1, true);
        }

        Client_onUpdateData_xyz_optimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var xz = stream.readPackXZ();
            var y = stream.readPackY();

            KBEngineapp._updateVolatileData(eid, xz[0], y, xz[1], KBE_FLT_MAX, KBE_FLT_MAX, KBE_FLT_MAX, 0, true);
        }

        Client_onUpdateData_xyz_ypr_optimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var xz = stream.readPackXZ();
            var y = stream.readPackY();

            var yaw = stream.readInt8();
            var p = stream.readInt8();
            var r = stream.readInt8();

            KBEngineapp._updateVolatileData(eid, xz[0], y, xz[1], yaw, p, r, 0, true);
        }

        Client_onUpdateData_xyz_yp_optimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var xz = stream.readPackXZ();
            var y = stream.readPackY();

            var yaw = stream.readInt8();
            var p = stream.readInt8();

            KBEngineapp._updateVolatileData(eid, xz[0], y, xz[1], yaw, p, KBE_FLT_MAX, 0, true);
        }

        Client_onUpdateData_xyz_yr_optimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var xz = stream.readPackXZ();
            var y = stream.readPackY();

            var yaw = stream.readInt8();
            var r = stream.readInt8();

            KBEngineapp._updateVolatileData(eid, xz[0], y, xz[1], yaw, KBE_FLT_MAX, r, 0, true);
        }

        Client_onUpdateData_xyz_pr_optimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var xz = stream.readPackXZ();
            var y = stream.readPackY();

            var p = stream.readInt8();
            var r = stream.readInt8();

            KBEngineapp._updateVolatileData(eid, xz[0], y, xz[1], KBE_FLT_MAX, p, r, 0, true);
        }

        Client_onUpdateData_xyz_y_optimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var xz = stream.readPackXZ();
            var y = stream.readPackY();

            var yaw = stream.readInt8();

            KBEngineapp._updateVolatileData(eid, xz[0], y, xz[1], yaw, KBE_FLT_MAX, KBE_FLT_MAX, 0, true);
        }

        Client_onUpdateData_xyz_p_optimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var xz = stream.readPackXZ();
            var y = stream.readPackY();

            var p = stream.readInt8();

            KBEngineapp._updateVolatileData(eid, xz[0], y, xz[1], KBE_FLT_MAX, p, KBE_FLT_MAX, 0, true);
        }

        Client_onUpdateData_xyz_r_optimized(stream) {
            var eid = KBEngineapp.getViewEntityIDFromStream(stream);

            var xz = stream.readPackXZ();
            var y = stream.readPackY();

            var p = stream.readInt8();

            KBEngineapp._updateVolatileData(eid, xz[0], y, xz[1], p, KBE_FLT_MAX, KBE_FLT_MAX, 0, true);
        }

        _updateVolatileData(entityID, x, y, z, yaw, pitch, roll, isOnGround, isOptimized) {
            var entity = KBEngineapp.entities[entityID];
            if (entity == undefined) {
                // 如果为0且客户端上一步是重登陆或者重连操作并且服务端entity在断线期间一直处于在线状态
                // 则可以忽略这个错误, 因为cellapp可能一直在向baseapp发送同步消息， 当客户端重连上时未等
                // 服务端初始化步骤开始则收到同步信息, 此时这里就会出错。
                ERROR_MSG("KBEngineApp::_updateVolatileData: entity(" + entityID + ") not found!");
                return;
            }

            // 小于0不设置
            if (isOnGround >= 0) {
                entity.isOnGround = (isOnGround > 0);
            }

            var changeDirection = false;

            if (roll != KBE_FLT_MAX) {
                changeDirection = true;
                entity.direction.x = isOptimized ? int82angle(roll, false) : roll;
            }

            if (pitch != KBE_FLT_MAX) {
                changeDirection = true;
                entity.direction.y = isOptimized ? int82angle(pitch, false) : pitch;
            }

            if (yaw != KBE_FLT_MAX) {
                changeDirection = true;
                entity.direction.z = isOptimized ? int82angle(yaw, false) : yaw;
            }

            var done = false;
            if (changeDirection == true) {
                KBEevent.fire(KBEEventTypes.set_direction, entity);
                done = true;
            }

            var positionChanged = false;
            if (x != KBE_FLT_MAX || y != KBE_FLT_MAX || z != KBE_FLT_MAX)
                positionChanged = true;

            if (x == KBE_FLT_MAX) x = isOptimized ? 0.0 : entity.position.x;
            if (y == KBE_FLT_MAX) y = isOptimized ? 0.0 : entity.position.y;
            if (z == KBE_FLT_MAX) z = isOptimized ? 0.0 : entity.position.z;

            if (positionChanged) {
                if (isOptimized) {
                    entity.position.x = x + KBEngineapp.entityServerPos.x;
                    entity.position.y = y + KBEngineapp.entityServerPos.y;
                    entity.position.z = z + KBEngineapp.entityServerPos.z;
                }
                else {
                    entity.position.x = x;
                    entity.position.y = y;
                    entity.position.z = z;
                }

                done = true;
                KBEevent.fire(KBEEventTypes.updatePosition, entity);
            }

            if (done)
                entity.onUpdateVolatileData();
        }

        Client_onStreamDataStarted(id, datasize, descr) {
            KBEevent.fire(KBEEventTypes.onStreamDataStarted, id, datasize, descr);
        }

        Client_onStreamDataRecv(stream) {
            var id = stream.readUint16();
            var data = stream.readBlob();
            KBEevent.fire(KBEEventTypes.onStreamDataRecv, id, data);
        }

        Client_onStreamDataCompleted(id) {
            KBEevent.fire(KBEEventTypes.onStreamDataCompleted, id);
        }

        Client_onReqAccountResetPasswordCB(failedcode) {
            if (failedcode != 0) {
                ERROR_MSG("KBEngineApp::Client_onReqAccountResetPasswordCB: " + KBEngineapp.username + " is failed! code=" + failedcode + "(" + KBEngineapp.serverErrs[failedcode].name + ")!");
                return;
            }

            INFO_MSG("KBEngineApp::Client_onReqAccountResetPasswordCB: " + KBEngineapp.username + " is successfully!");
        }

        Client_onReqAccountBindEmailCB(failedcode) {
            if (failedcode != 0) {
                ERROR_MSG("KBEngineApp::Client_onReqAccountBindEmailCB: " + KBEngineapp.username + " is failed! code=" + failedcode + "(" + KBEngineapp.serverErrs[failedcode].name + ")!");
                return;
            }

            INFO_MSG("KBEngineApp::Client_onReqAccountBindEmailCB: " + KBEngineapp.username + " is successfully!");
        }

        Client_onReqAccountNewPasswordCB(failedcode) {
            if (failedcode != 0) {
                ERROR_MSG("KBEngineApp::Client_onReqAccountNewPasswordCB: " + KBEngineapp.username + " is failed! code=" + failedcode + "(" + KBEngineapp.serverErrs[failedcode].name + ")!");
                return;
            }

            INFO_MSG("KBEngineApp::Client_onReqAccountNewPasswordCB: " + KBEngineapp.username + " is successfully!");
        }
        //#endregion

        create(kbengineArgs) {
            if (KBEngineapp != undefined)
                return;

            // 一些平台如小程序上可能没有assert
            if (console.assert == undefined) {
                console.assert = function (bRet, s) {
                    if (!(bRet)) {
                        ERROR_MSG(s);
                    }
                }
            }

            if (kbengineArgs.constructor != KBEngineArgs) {
                ERROR_MSG("KBEngine.create(): args(" + kbengineArgs + ") error! not is KBEngine.KBEngineArgs");
                return;
            }

            new KBEngineApp(kbengineArgs);

            KBEngineapp.reset();
            KBEngineapp.installEvents();
            KBEngineapp.idInterval = setInterval(KBEngineapp.update, kbengineArgs.updateHZ);
        }

        destroy() {
            if (KBEngineapp.idInterval != undefined)
                clearInterval(KBEngineapp.idInterval);

            if (KBEngineapp == undefined)
                return;

            KBEngineapp.uninstallEvents();
            KBEngineapp.reset();
            KBEngineapp = undefined;

            KBEevent.clear();
        }
    }
}
