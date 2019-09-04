//#region 导入模块
import { AvatarEmailComponent } from "./AvatarEmailComponent";
//#endregion

export class Avatar extends KBEngine.Entity {
    //#region 组件，组件名称，类型名称必须跟服务器Avatar的<Components>配置一致
    emailCom: AvatarEmailComponent = new AvatarEmailComponent(this);
    //#endregion

    components = {}
    constructor() {
        super();
        this.components[AvatarEmailComponent.name] = this.emailCom
    }

    name: string;

    set_name(oldVal: string) {
        console.log("Avatar.set_name, oldVal: " + oldVal + ", newVal: " + this.name);
    }

    OnInitAvatar() {
        console.log("Avatar.OnInitAvatar")
    }

    public setComponents(modulesDef) {
        for (let node in modulesDef.propertys) {
            let data = modulesDef.propertys[node]
            if (data[0] >= 1000 && data[0] <= 2000) {
                if (this[data[2]] !== undefined) {
                    let id = 0
                    try {
                        id = parseInt(node)
                    } catch{
                        id = 0
                    }
                    if (id > 0) {
                        this[data[2]].base.id = this.id;
                        this[data[2]].entityComponentPropertyID = data[0]
                    }
                }
            }
        }
    }

}

KBEngine.allModules["Avatar"] = Avatar
