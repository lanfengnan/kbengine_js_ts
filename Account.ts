
export class Account extends KBEngine.Entity {
    public avatarID: KBEngine.UINT64;
    public uid: string;

    set_avatarID(oldVal: KBEngine.UINT64) {
        cc.log("Account.avatarID = " + oldVal);
    }

    set_uid(oldVal: string) {
        cc.log("Account.uid = " + oldVal);
    }

    OnInitAccount() {
        console.log("Account init");
    }

}

KBEngine.allModules["Account"] = Account
