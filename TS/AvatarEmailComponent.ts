import { BaseComponent } from "./BaseComponent";
import { KBEngine } from "./kbengine";


export class AvatarEmailComponent extends BaseComponent {
    constructor(owner) { super(owner, AvatarEmailComponent.name) }

    OnInitEmailList(emailList, curCnt: number, allCnt: number) {
        console.log("AvatarEmailComponent.OnInitEmailList, emailList: " + emailList + ", curCnt: " + curCnt + ", allCnt:" + allCnt);
    }
}

KBEngine.SetModules("AvatarEmailComponent", AvatarEmailComponent)
