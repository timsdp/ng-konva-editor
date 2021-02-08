/// <reference path ="control.ts"/>
class LabelControl extends Control {
    constructor(elementGroupIndex, elementId, text) {
        super(ControlType.Label, elementGroupIndex, elementId, text);
    }
    Initialize() {
        super.Initialize();
        console.log("Label control inialized");
    }
}
//# sourceMappingURL=label-control.js.map