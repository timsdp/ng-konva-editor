/// <reference path="../editor.d.ts" />
declare class ToolbarController {
    ContainerElementId: string;
    private editor;
    private textStubs;
    constructor(editor: Editor);
    Initialize(): void;
    private bindEvents;
    private onAddControlButtonClick;
    private onClearButtonClick;
    private onRemoveControlButtonClick;
    private onLockControlsChange;
    private onShowAreaStateButtonClick;
}
