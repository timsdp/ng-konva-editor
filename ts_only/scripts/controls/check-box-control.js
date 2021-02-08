/// <reference path ="control.ts"/>
class CheckBoxControl extends Control {
    constructor(elementGroupIndex, elementId, text) {
        super(ControlType.Checkbox, elementGroupIndex, elementId, text);
        this.Checked = false;
    }
    Initialize() {
        super.Initialize();
        console.log("Checkbox control inialized");
    }
}
//# sourceMappingURL=check-box-control.js.map