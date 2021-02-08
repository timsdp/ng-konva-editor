/// <reference path="../controls/controls/control.d.ts" />
/// <reference path="../controls/controls/check-box-control.d.ts" />
/// <reference path="../controls/controls/label-control.d.ts" />
/// <reference path="../controls/templates/control-template-factory.d.ts" />
/// <reference path="../models/point.d.ts" />
/// <reference path="../models/position.d.ts" />
/// <reference path="../enums/control-type.d.ts" />
/// <reference path="../editor.d.ts" />
/// <reference path="work-area-controller-base.d.ts" />
declare class WorkAreaController extends WorkAreaControllerBase {
    private controlPropertyUpdateActions;
    AddControl(type: ControlType, text: string): void;
    RemoveSelectedControl(): void;
    Clear(): void;
    UpdateControlPropertyValue(control: Control, propertyName: PropertyName, newValue: string): void;
    ImportFromModel(model: Control[]): void;
    private bindControlEvents;
    private getNewElementIndex;
    private getControlByElementId;
    private getControlOffset;
    private getControlAbsoluteLocation;
    private setControlLocation;
    private clearControlsSelection;
    private onControlClicked;
    private onControlMoved;
    private onControlSelected;
}
