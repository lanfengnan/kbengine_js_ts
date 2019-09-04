

export class BaseComponent extends KBEngine.Component {
    constructor(owner, name) {
        super();
        this.base = new KBEngine.EntityCall();
        this.cell = new KBEngine.EntityCall();
        this.base.className = name;
        this.base.type = KBEngine.ENTITYCALL_TYPE_BASE;
        this.cell.className = name;
        this.cell.type = KBEngine.ENTITYCALL_TYPE_CELL;
        this.owner = owner;
        this.className = name;
    }
}
