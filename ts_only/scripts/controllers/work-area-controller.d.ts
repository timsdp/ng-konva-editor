/// <reference path="../controls/controls/control.d.ts" />
/// <reference path="../controls/controls/check-box-control.d.ts" />
/// <reference path="../controls/controls/label-control.d.ts" />
/// <reference path="../controls/templates/control-template-factory.d.ts" />
/// <reference path="../models/point.d.ts" />
/// <reference path="../models/position.d.ts" />
/// <reference path="../enums/control-type.d.ts" />
/// <reference path="../editor.d.ts" />
declare class WorkAreaController {
    ElementId: string;
    Controls: Array<Control>;
    IsControlsLocked: boolean;
    private selectedControl;
    private editor;
    private templateFactory;
    private controlPropertyUpdateActions;
    constructor(editor: Editor);
    Initialize(): void;
    AddControl(type: ControlType, text: string): void;
    RemoveSelectedControl(): void;
    Clear(): void;
    UpdateControlPropertyValue(control: Control, propertyName: PropertyName, newValue: string): void;
    private bindControlEvents;
    private getNewElementIndex;
    private getControlByElementId;
    private getControlOffset;
    private getControlAbsoluteLocation;
    private setControlLocation;
    private setControlOffset;
    private clearControlsSelection;
    private onControlClicked;
    private onControlMoved;
    private onControlSelected;
}
