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
                    position.x += event.dx;
                    position.y += event.dy;
                    event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
                },
            }
        });
        interact(elementSelector).on('tap', function (event) {
            console.log("control tapped");
            inner.onControlClicked(elementId);
            event.preventDefault();
        });
    }
    AddControl(type, text, elementId = null) {
        if (!ControlType[type])
            debugger;
        let elementGroupIndex = this.getNewElementIndex(type);
        if (!elementId) {
            elementId = ControlType[type].toLowerCase() + elementGroupIndex;
        }
        let control = null;
        switch (type) {
            case ControlType.Checkbox:
                control = new CheckBoxControl(elementGroupIndex, elementId, text);
                break;
            case ControlType.Label:
                control = new LabelControl(elementGroupIndex, elementId, text);
                break;
            default:
                break;
        }
        if (control) {
            let template = this.templateFactory.GetTemplate(type, elementId, text);
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
    //Events
    onAddControlButtonClick(event) {
        let inner = event.data;
        let controlType = $(event.currentTarget).data("control-type");
        let stringIndex = Math.round(Math.random() * (inner.textStubs.length - 1));
        let testText = inner.textStubs[stringIndex];
        let text = prompt("Enter text:", testText);
        inner.AddControl(controlType, text);
    }
    onControlClicked(elementId) {
        let control = this.Controls.filter(c => c.ElementId == elementId)[0];
        this.editor.OnControlSelected(control);
    }
}
//# sourceMappingURL=work-area.js.map