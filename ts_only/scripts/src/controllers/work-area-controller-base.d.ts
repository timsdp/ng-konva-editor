declare abstract class WorkAreaControllerBase {
    ElementId: string;
    Controls: Array<Control>;
    IsControlsLocked: boolean;
    protected selectedControl: Control;
    protected editor: Editor;
    protected templateFactory: ControlTemplateFactory;
    constructor(editor: Editor);
    Initialize(): void;
}
