class WorkAreaControllerBase {
    constructor(editor) {
        this.ElementId = "divWorkArea";
        this.Controls = new Array();
        this.IsControlsLocked = false;
        this.selectedControl = null;
        this.editor = editor;
    }
    Initialize() {
        this.templateFactory = new ControlTemplateFactory();
    }
}
//# sourceMappingURL=work-area-controller-base.js.map