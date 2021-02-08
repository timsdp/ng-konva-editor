/// <reference path="controls/control.d.ts" />
/// <reference path="controls/check-box-control.d.ts" />
/// <reference path="controls/label-control.d.ts" />
/// <reference path="enums/control-type.d.ts" />
/// <reference path="controls/templates/control-template-factory.d.ts" />
/// <reference path="editor.d.ts" />
declare class WorkArea {
    ElementId: string;
    Controls: Array<Control>;
    private isControlsLocked;
    private selectedControl;
    private editor;
    private templateFactory;
    private textStubs;
    constructor(editor: Editor);
    Initialize(): void;
    private bindEvents;
    private bindControlEvents;
    AddControl(type: ControlType, text: string): void;
    private getNewElementIndex;
    private getControlByElementId;
    private getControlPosition;
    private clearControlsSelection;
    private onAddControlButtonClick;
    private onClearButtonClick;
    private onRemoveControlButtonClick;
    private onLockControlsChange;
    private onControlClicked;
    private onControlMoved;
    private onControlSelected;
}
