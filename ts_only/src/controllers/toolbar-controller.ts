/// <reference path ="../editor.ts"/>

class ToolbarController{
    public ContainerElementId: string = "divToolbar";
    private editor: Editor;
    private textStubs: string[] = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit", 
        "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", 
        "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", 
        "Duis aute irure dolor in reprehenderit in", 
        "voluptate velit esse cillum dolore eu fugiat nulla pariatur",
        "Excepteur sint occaecat cupidatat non proident", 
        "sunt in culpa qui officia deserunt mollit anim id est laborum."];


    constructor(editor: Editor){
        this.editor = editor;
    }

    public Initialize(){
        this.bindEvents();
    }

    private bindEvents(){
        let inner = this;
        $(".add-control-action").on("click", inner, this.onAddControlButtonClick);
        $("#btnClearAll").on("click", inner, this.onClearButtonClick);
        $("#btnRemoveControl").on("click", inner, this.onRemoveControlButtonClick);
        $('#chkLockControls').on("change", inner, this.onLockControlsChange)
        $("#btnShowWorkAreaState").on("click", inner, this.onShowAreaStateButtonClick);
        $("#btnShowWorkAreaImport").on("click", inner, this.onShowAreaStateImportButtonClick);
    }

    private onAddControlButtonClick(event: any)
    {
        let inner = event.data;
        let controlType = $(event.currentTarget).data("control-type");
        let stringIndex = Math.round(Math.random()*(inner.textStubs.length-1));
        let testText = inner.textStubs[stringIndex];
        let text = prompt("Enter text:", testText);
        inner.editor.AddNewControl(controlType, text);
    }

    private onClearButtonClick(event: any)
    {
        let inner = event.data;
        inner.editor.ClearWorkArea();
    }

    private onRemoveControlButtonClick(event: any)
    {
        let inner = event.data;
        inner.editor.RemoveSelectedControl();
    }

    private onLockControlsChange(event: any)
    {
        let inner = event.data;
        inner.editor.ToggleWorkAreaLock(event.target.checked);
    }

    private onShowAreaStateButtonClick(event: any)
    {
        let inner = event.data;
        inner.editor.ShowWorkAreaState();
    }

    private onShowAreaStateImportButtonClick(event: any)
    {
        let inner = event.data;
        inner.editor.ShowWorkAreaStateImport();
    }
}