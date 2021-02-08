declare class ModalStateController {
    private containerElementId;
    private bodyElementId;
    private headerElementId;
    private buttonImportElementId;
    private stateExamples;
    private editor;
    constructor(editor: Editor);
    Initialize(): void;
    private bindEvents;
    Show(caption: string, content: string): void;
    ShowImport(): void;
    private onImportButtonClick;
}
