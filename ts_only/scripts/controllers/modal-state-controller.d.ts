declare class ModalStateController {
    private containerElementId;
    private bodyElementId;
    private headerElementId;
    private editor;
    constructor(editor: Editor);
    Show(caption: string, content: string): void;
}
