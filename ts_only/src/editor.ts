/// <reference path ="./controllers/interactjs-work-area-controller.ts"/>
/// <reference path ="./controllers/canvas-work-area-controller.ts"/>
/// <reference path ="./controllers/base-work-area-controller.ts"/>

/// <reference path ="./controllers/properties-area-controller.ts"/>
/// <reference path ="./controllers/toolbar-controller.ts"/>
/// <reference path ="./controllers/modal-state-controller.ts"/>

class Editor{
    private workAreaController: BaseWorkAreaController;

    private propertiesAreaController: PropertiesAreaController;
    private toolbarController: ToolbarController;
    private modalStateController: ModalStateController;

    constructor(){
        this.propertiesAreaController = new PropertiesAreaController(this);
        this.workAreaController  = new InteractjsWorkAreaController(this);
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
    public OnControlSelected(control: Control) {
        this.propertiesAreaController.ShowControlProperties(control);
        this.propertiesAreaController.ShowPropertiesContainer();
    }

    public OnControlValueUpdated(control: Control, propertyName: PropertyName, newValue: string) {
        this.workAreaController.UpdateControlPropertyValue(control, propertyName, newValue);
    }

    public OnControlDeselect(){
        this.propertiesAreaController.HidePropertiesContainer();
    }

    public AddNewControl(controlType: ControlType, text: string){
        this.workAreaController.AddControl(controlType, text);
    }

    public ClearWorkArea(){
        this.workAreaController.Clear();
        this.propertiesAreaController.HidePropertiesContainer();
    }

    public RemoveSelectedControl(){
        this.workAreaController.RemoveSelectedControl();
    }

    public ToggleWorkAreaLock(isEnabled: boolean){
        this.workAreaController.IsControlsLocked = isEnabled;
    }

    public ShowWorkAreaState(){
        let json = JSON.stringify(this.workAreaController.Controls, null, "\t");
        this.modalStateController.Show("Current work area state", json);
    }

    public ShowWorkAreaStateImport(){
        this.modalStateController.ShowImport();
    }

    public ImportWorkAreaFromModel(model){
        this.workAreaController.ImportFromModel(model);
    }
}