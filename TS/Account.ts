import {KBEngine} from "./kbengine"

export class Account extends KBEngine.Entity {
    public avatarID: KBEngine.UINT64;
    public uid: string;

    set_avatarID(oldVal: KBEngine.UINT64) {
        console.log("Account.avatarID = " + oldVal);
    }

    set_uid(oldVal: string) {
        console.log("Account.uid = " + oldVal);
    }

    OnInitAccount() {
        console.log("Account init");
    }

}

KBEngine.SetModules("Account", Account);
