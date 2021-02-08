/// <reference path ="./controls/control.ts"/>
/// <reference path ="./controls/check-box-control.ts"/>
/// <reference path ="./controls/label-control.ts"/>
/// <reference path ="./enums/control-type.ts"/>
/// <reference path ="./controls/templates/control-template-factory.ts"/>
/// <reference path ="./editor.ts"/>
class WorkArea {
    constructor(editor) {
        this.ElementId = "divWorkArea";
        this.Controls = new Array();
        this.isControlsLocked = false;
        this.selectedControl = null;
        this.templateFactory = new ControlTemplateFactory();
        this.textStubs = [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            "Duis aute irure dolor in reprehenderit in",
            "voluptate velit esse cillum dolore eu fugiat nulla pariatur",
            "Excepteur sint occaecat cupidatat non proident",
            "sunt in culpa qui officia deserunt mollit anim id est laborum."
        ];
        this.editor = editor;
    }
    Initialize() {
        this.bindEvents();
    }
    bindEvents() {
        let inner = this;
        $(".add-control-action").on("click", inner, this.onAddControlButtonClick);
        $("#btnClearAll").on("click", inner, this.onClearButtonClick);
        $("#btnRemoveControl").on("click", inner, this.onRemoveControlButtonClick);
        $('#chkLockControls').on("change", inner, this.onLockControlsChange);
    }
    bindControlEvents(elementId) {
        let inner = this;
        let elementSelector = "#" + elementId;
        let position = { x: 0, y: 0 };
        interact(elementSelector).draggable({
            listeners: {
                start(event) {
                    console.log(event.type, event.target);
                    inner.onControlClicked(elementId);
                },
                move(event) {
                    if (!inner.isControlsLocked) {
                        position.x += event.dx;
                        position.y += event.dy;
                        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
                        inner.onControlMoved(elementId, position.x, position.y);
                        inner.onControlClicked(elementId);
                    }
                },
            },
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ]
        });
        interact(elementSelector).on('tap', function (event) {
            inner.onControlClicked(elementId);
            event.preventDefault();
        });
    }
    AddControl(type, text) {
        if (!ControlType[type])
            debugger;
        let elementGroupIndex = this.getNewElementIndex(type);
        let elementId = ControlType[type].toLowerCase() + elementGroupIndex;
        let nestedControlElementId = `control${elementId}`;
        let control = null;
        switch (type) {
            case ControlType.Checkbox:
                control = new CheckBoxControl(elementGroupIndex, elementId, nestedControlElementId, text);
                break;
            case ControlType.Label:
                control = new LabelControl(elementGroupIndex, elementId, nestedControlElementId, text);
                break;
            default:
                break;
        }
        if (control) {
            let template = this.templateFactory.GetTemplate(control);
            $('#' + this.ElementId).append(template);
            control.Initialize();
            this.Controls.push(control);
            this.bindControlEvents(elementId);
        }
    }
    //Helpers
    getNewElementIndex(type) {
        let controls = this.Controls.filter(c => c.Type == type).map(f => f.ElementGroupIndex);
        if (controls.length == 0) {
            return 1;
        }
        ;
        let sortedIndexes = controls.sort((a, b) => a - b);
        return ++sortedIndexes[sortedIndexes.length - 1];
    }
    getControlByElementId(elementId) {
        return this.Controls.filter(c => c.ElementId == elementId)[0];
    }
    getControlPosition(elementId) {
        let workAreaPosition = $(`#${this.ElementId}`).position();
        let elementPosition = $(`#${elementId}`).position();
        return [workAreaPosition.top - elementPosition.top, workAreaPosition.left - elementPosition.left];
    }
    clearControlsSelection() {
        this.Controls.forEach(c => { $(`#${c.ElementId}`).removeClass('selected'); });
        this.selectedControl = null;
    }
    //Events
    onAddControlButtonClick(event) {
        let inner = event.data;
        let controlType = $(event.currentTarget).data("control-type");
        let stringIndex = Math.round(Math.random() * (inner.textStubs.length - 1));
        let testText = inner.textStubs[stringIndex];
        let text = prompt("Enter text:", testText);
        inner.AddControl(controlType, text);
    }
    onClearButtonClick(event) {
        let inner = event.data;
        $(`#${inner.ElementId}`).html("");
        inner.Controls = new Array();
        inner.editor.OnWorkAreaCleared();
    }
    onRemoveControlButtonClick(event) {
        let inner = event.data;
        if (inner.selectedControl) {
            let currentControl = inner.Controls.filter(c => c.ElementId === inner.selectedControl.ElementId)[0];
            let controlArrayIndex = inner.Controls.findIndex(c => c.ElementId === currentControl.ElementId);
            inner.selectedControl = null;
            inner.Controls.splice(controlArrayIndex, 1);
            $(`#${currentControl.ElementId}`).remove();
            inner.editor.OnControlDeselect();
        }
    }
    onLockControlsChange(event) {
        let inner = event.data;
        inner.isControlsLocked = event.currentTarget.checked;
    }
    onControlClicked(elementId) {
        console.log("control clicked");
        this.onControlSelected(elementId);
    }
    onControlMoved(elementId, x, y) {
        let controlPosition = this.getControlPosition(elementId);
        let control = this.getControlByElementId(elementId);
        control.Y = controlPosition[0];
        control.X = controlPosition[1];
        this.onControlSelected(elementId);
    }
    onControlSelected(elementId) {
        this.clearControlsSelection();
        $(`#${elementId}`).addClass("selected");
        this.selectedControl = this.getControlByElementId(elementId);
        this.editor.OnControlSelected(this.selectedControl);
    }
}
//# sourceMappingURL=work-area.js.map