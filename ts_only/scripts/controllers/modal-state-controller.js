class ModalStateController {
    constructor(editor) {
        this.containerElementId = "modalState";
        this.bodyElementId = "modalStateBody";
        this.headerElementId = "modalStateHeader";
        this.editor = editor;
    }
    Show(caption, content) {
        $(`#${this.containerElementId}`).modal('show');
        $(`#${this.headerElementId}`).html(caption);
        $(`#${this.bodyElementId}`).html(content);
    }
}
//# sourceMappingURL=modal-state-controller.js.map