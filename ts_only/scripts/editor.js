/// <reference path ="./controllers/work-area-controller.ts"/>
/// <reference path ="./controllers/properties-area-controller.ts"/>
/// <reference path ="./controllers/toolbar-controller.ts"/>
/// <reference path ="./controllers/modal-state-controller.ts"/>
class Editor {
    constructor() {
        this.propertiesAreaController = new PropertiesAreaController(this);
        this.workAreaController = new WorkAreaController(this);
        this.toolbarController = new ToolbarController(this);
        this.modalStateController = new ModalStateController(this);
    }
    Initialize() {
        this.propertiesAreaController.Initialize();
        this.workAreaController.Initialize();
        this.toolbarController.Initialize();
    }
    //Events
    OnControlSelected(control) {
        this.propertiesAreaController.ShowControlProperties(control);
        this.propertiesAreaController.ShowPropertiesContainer();
    }
    OnControlValueUpdated(control, propertyName, newValue) {
        this.workAreaController.UpdateControlPropertyValue(control, propertyName, newValue);
    }
    OnWorkAreaCleared() {
        this.propertiesAreaController.HidePropertiesContainer();
    }
    OnControlDeselect() {
        this.propertiesAreaController.HidePropertiesContainer();
    }
    AddNewControl(controlType, text) {
        this.workAreaController.AddControl(controlType, text);
    }
    ClearWorkArea() {
        this.workAreaController.Clear();
        this.OnWorkAreaCleared();
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
}
//# sourceMappingURL=editor.js.map