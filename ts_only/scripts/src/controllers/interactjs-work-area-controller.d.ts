/// <reference path="../controls/controls/control.d.ts" />
/// <reference path="../controls/controls/check-box-control.d.ts" />
/// <reference path="../controls/controls/label-control.d.ts" />
/// <reference path="../controls/dom-templates/dom-element-template-factory.d.ts" />
/// <reference path="../models/point.d.ts" />
/// <reference path="../models/position.d.ts" />
/// <reference path="../enums/control-type.d.ts" />
/// <reference path="../editor.d.ts" />
/// <reference path="base-work-area-controller.d.ts" />
declare class InteractjsWorkAreaController extends BaseWorkAreaController {
    protected domElementTemplateFactory: DOMElementTemplateFactory;
    private controlPropertyUpdateActions;
    Initialize(): void;
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
