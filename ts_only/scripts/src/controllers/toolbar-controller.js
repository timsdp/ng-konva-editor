/// <reference path ="../editor.ts"/>
class ToolbarController {
    constructor(editor) {
        this.ContainerElementId = "divToolbar";
        this.textStubs = [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            "Duis aute irure dolor in reprehenderit in",
            "voluptate velit esse cillum dolore eu fugiat nulla pariatur",
            "Excepteur sint occaecat cupidatat non proident",
            "sunt in culpa qui officia deserunt mollit anim id est laborum."
        ];
        this.editor = editor;
    }
    Initialize() {
        this.bindEvents();
    }
    bindEvents() {
        let inner = this;
        $(".add-control-action").on("click", inner, this.onAddControlButtonClick);
        $("#btnClearAll").on("click", inner, this.onClearButtonClick);
        $("#btnRemoveControl").on("click", inner, this.onRemoveControlButtonClick);
        $('#chkLockControls').on("change", inner, this.onLockControlsChange);
        $("#btnShowWorkAreaState").on("click", inner, this.onShowAreaStateButtonClick);
        $("#btnShowWorkAreaImport").on("click", inner, this.onShowAreaStateImportButtonClick);
    }
    onAddControlButtonClick(event) {
        let inner = event.data;
        let controlType = $(event.currentTarget).data("control-type");
        let stringIndex = Math.round(Math.random() * (inner.textStubs.length - 1));
        let testText = inner.textStubs[stringIndex];
        let text = prompt("Enter text:", testText);
        inner.editor.AddNewControl(controlType, text);
    }
    onClearButtonClick(event) {
        let inner = event.data;
        inner.editor.ClearWorkArea();
    }
    onRemoveControlButtonClick(event) {
        let inner = event.data;
        inner.editor.RemoveSelectedControl();
    }
    onLockControlsChange(event) {
        let inner = event.data;
        inner.editor.ToggleWorkAreaLock(event.target.checked);
    }
    onShowAreaStateButtonClick(event) {
        let inner = event.data;
        inner.editor.ShowWorkAreaState();
    }
    onShowAreaStateImportButtonClick(event) {
        let inner = event.data;
        inner.editor.ShowWorkAreaStateImport();
    }
}
//# sourceMappingURL=toolbar-controller.js.map