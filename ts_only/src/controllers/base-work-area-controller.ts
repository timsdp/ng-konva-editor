abstract class BaseWorkAreaController{
    public ElementId: string = "divWorkArea";
    public Controls: Array<Control> = new Array<Control>();
    public IsControlsLocked: boolean = false;
    protected selectedControl: Control = null;
    protected editor: Editor;


    abstract AddControl(type: ControlType, text: string);
    abstract RemoveSelectedControl();
    abstract Clear();
    abstract UpdateControlPropertyValue(control: Control, propertyName: PropertyName, newValue: string);
    abstract ImportFromModel(model: Control[]);

    constructor(editor: Editor){
        this.editor = editor;
    }

    public Initialize(){
    }


}