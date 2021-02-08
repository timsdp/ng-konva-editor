/// <reference path ="./controllers/interactjs-work-area-controller.ts"/>
/// <reference path ="./controllers/canvas-work-area-controller.ts"/>
/// <reference path ="./controllers/base-work-area-controller.ts"/>
/// <reference path ="./controllers/properties-area-controller.ts"/>
/// <reference path ="./controllers/toolbar-controller.ts"/>
/// <reference path ="./controllers/modal-state-controller.ts"/>
class Editor {
    constructor() {
        this.propertiesAreaController = new PropertiesAreaController(this);
        this.workAreaController = new InteractjsWorkAreaController(this);
        //this.workAreaController  = new CanvasWorkAreaController(this);
        this.toolbarController = new ToolbarController(this);
        this.modalStateController = new ModalStateController(this);
    }
    Initialize() {
        this.propertiesAreaController.Initialize();
        this.workAreaController.Initialize();
        this.toolbarController.Initialize();
        this.modalStateController.Initialize();
    }
    //Events
    OnControlSelected(control) {
        this.propertiesAreaController.ShowControlProperties(control);
        this.propertiesAreaController.ShowPropertiesContainer();
    }
    OnControlValueUpdated(control, propertyName, newValue) {
        this.workAreaController.UpdateControlPropertyValue(control, propertyName, newValue);
    }
    OnControlDeselect() {
        this.propertiesAreaController.HidePropertiesContainer();
    }
    AddNewControl(controlType, text) {
        this.workAreaController.AddControl(controlType, text);
    }
    ClearWorkArea() {
        this.workAreaController.Clear();
        this.propertiesAreaController.HidePropertiesContainer();
    }
    RemoveSelectedControl() {
        this.workAreaController.RemoveSelectedControl();
    }
    ToggleWorkAreaLock(isEnabled) {
        this.workAreaController.IsControlsLocked = isEnabled;
    }
    ShowWorkAreaState() {
        let json = JSON.stringify(this.workAreaController.Controls, null, "\t");
        this.modalStateController.Show("Current work area state", json);
    }
    ShowWorkAreaStateImport() {
        this.modalStateController.ShowImport();
    }
    ImportWorkAreaFromModel(model) {
        this.workAreaController.ImportFromModel(model);
    }
}
//# sourceMappingURL=editor.js.map