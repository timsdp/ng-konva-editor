declare abstract class BaseWorkAreaController {
    ElementId: string;
    Controls: Array<Control>;
    IsControlsLocked: boolean;
    protected selectedControl: Control;
    protected editor: Editor;
    abstract AddControl(type: ControlType, text: string): any;
    abstract RemoveSelectedControl(): any;
    abstract Clear(): any;
    abstract UpdateControlPropertyValue(control: Control, propertyName: PropertyName, newValue: string): any;
    abstract ImportFromModel(model: Control[]): any;
    constructor(editor: Editor);
    Initialize(): void;
}
