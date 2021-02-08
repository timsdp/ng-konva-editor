/// <reference path="controllers/work-area-controller.d.ts" />
/// <reference path="controllers/properties-area-controller.d.ts" />
/// <reference path="controllers/toolbar-controller.d.ts" />
/// <reference path="controllers/modal-state-controller.d.ts" />
declare class Editor {
    private workAreaController;
    private propertiesAreaController;
    private toolbarController;
    private modalStateController;
    constructor();
    Initialize(): void;
    OnControlSelected(control: Control): void;
    OnControlValueUpdated(control: Control, propertyName: PropertyName, newValue: string): void;
    OnWorkAreaCleared(): void;
    OnControlDeselect(): void;
    AddNewControl(controlType: ControlType, text: string): void;
    ClearWorkArea(): void;
    RemoveSelectedControl(): void;
    ToggleWorkAreaLock(isEnabled: boolean): void;
    ShowWorkAreaState(): void;
}
