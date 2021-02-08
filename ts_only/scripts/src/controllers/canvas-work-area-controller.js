/// <reference path ="../controls/controls/control.ts"/>
/// <reference path ="../controls/controls/check-box-control.ts"/>
/// <reference path ="../controls/controls/label-control.ts"/>
/// <reference path ="../controls/dom-templates/dom-element-template-factory.ts"/>
/// <reference path ="../models/point.ts"/>
/// <reference path ="../models/position.ts"/>
/// <reference path ="../enums/control-type.ts"/>
/// <reference path ="../enums/property-name.ts"/>
/// <reference path ="../editor.ts"/>
/// <reference path ="./base-work-area-controller.ts"/>
class CanvasWorkAreaController extends BaseWorkAreaController {
    constructor() {
        super(...arguments);
        this.controlPropertyUpdateActions = new Map([
            [PropertyName.ControlType, (control, newValue) => { control.Type = ControlType[newValue]; }],
            [PropertyName.Name, (control, newValue) => { }],
            [PropertyName.Caption, (control, newValue) => {
                    control.Text = newValue;
                    $(`#${control.NestedElementId}`).html(newValue);
                    $(`#${control.CaptionElementId}`).html(newValue);
                }],
            [PropertyName.Left, (control, newValue) => {
                    let x = Number(newValue);
                    let delta = x - control.X;
                    control.X = Math.round(x);
                    let currentLocation = this.getControlAbsoluteLocation(control.ElementId);
                    currentLocation.X = +delta;
                    this.setControlLocation(control.ElementId, currentLocation);
                    //$(`#${control.ElementId}`).css("transform", `translateX(${delta}px)`)
                }],
            [PropertyName.Top, (control, newValue) => {
                    let y = Number(newValue);
                    let delta = y - control.Y;
                    control.Y = Math.round(y);
                    $(`#${control.ElementId}`).css("transform", `translateX(${delta}px)`);
                }],
            [PropertyName.Bold, (control, newValue) => {
                    control.IsBold = newValue.toLowerCase() == "true";
                    let cssValue = control.IsBold ? "bold" : "";
                    $(`#${control.NestedElementId}`).css("font-weight", cssValue);
                }]
        ]);
    }
    Initialize() {
        super.Initialize();
        this.ElementId = "divCanvasWorkArea";
        this.initializeCanvas();
    }
    initializeCanvas() {
        $(`#${this.ElementId}`).show();
        this.currentStage = new Konva.Stage({
            container: this.ElementId,
            width: window.innerWidth,
            height: window.innerHeight
        });
    }
    AddControl(type, text) {
        let inner = this;
        if (!ControlType[type])
            debugger;
        let control = null;
        switch (type) {
            case ControlType.Checkbox:
                control = new CheckBoxControl();
                break;
            case ControlType.Label:
                control = new LabelControl();
                break;
            default:
                break;
        }
        if (control) {
            control.ElementGroupIndex = this.getNewElementIndex(type);
            control.ElementId = ControlType[type].toLowerCase() + control.ElementGroupIndex;
            control.NestedElementId = `control${control.ElementId}`;
            control.CaptionElementId = `controlCaption${control.ElementId}`;
            control.Text = text;
            this.Controls.push(control);
            //let template: string =  this.templateFactory.GetTemplate(control);
            var layer = new Konva.Layer();
            if (type == ControlType.Label) {
                var textNode = new Konva.Text({
                    id: control.ElementId,
                    text: text,
                    x: 50,
                    y: 50,
                    fontSize: 14,
                    draggable: true
                });
                layer.add(textNode);
            }
            else {
                let group = new Konva.Group({
                    id: control.ElementId,
                    draggable: true
                });
                let rect = new Konva.Rect({
                    id: control.NestedElementId,
                    x: 0,
                    y: 0,
                    width: 14,
                    height: 14,
                    stroke: 'black',
                    strokeWidth: 2
                });
                var textNode = new Konva.Text({
                    id: control.CaptionElementId,
                    text: text,
                    x: 18,
                    y: 0,
                    fontSize: 14
                });
                group.add(rect);
                group.add(textNode);
                layer.add(group);
            }
            layer.draw();
            this.currentStage.add(layer);
            this.bindControlEvents(layer, control.ElementId);
            this.onControlSelected(control.ElementId);
        }
    }
    RemoveSelectedControl() {
        let inner = this;
        if (inner.selectedControl != null) {
            let currentControl = inner.Controls.filter(c => c.ElementId === inner.selectedControl.ElementId)[0];
            let controlArrayIndex = inner.Controls.findIndex(c => c.ElementId === currentControl.ElementId);
            inner.selectedControl = null;
            inner.Controls.splice(controlArrayIndex, 1);
            $(`#${currentControl.ElementId}`).remove();
            inner.editor.OnControlDeselect();
        }
    }
    Clear() {
        this.currentStage.clear();
        this.Controls = new Array();
    }
    UpdateControlPropertyValue(control, propertyName, newValue) {
        let controlItem = this.Controls.filter(c => c.ElementId === control.ElementId)[0];
        let updateAction = this.controlPropertyUpdateActions.get(propertyName);
        updateAction(controlItem, newValue);
    }
    ImportFromModel(model) {
        this.Clear();
        this.Controls = model;
        this.Controls.forEach(control => {
            let template = this.templateFactory.GetTemplate(control);
            $(`#${this.ElementId}`).append(template);
            //Adjust location
            let workAreaOffset = $(`#${this.ElementId}`).offset();
            let left = workAreaOffset.left + control.X;
            let top = workAreaOffset.top + control.Y;
            $(`#${control.ElementId}`).offset({ left, top });
            //this.bindControlEvents(control.ElementId);
        });
    }
    bindControlEvents(canvasElement, elementId) {
        let inner = this;
        canvasElement.on('click', function () { inner.onControlClicked(elementId); });
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
    getControlOffset(elementId) {
        let elementPosition = $(`#${elementId}`).offset();
        return new Position(elementPosition.top, elementPosition.left);
    }
    getControlAbsoluteLocation(elementId) {
        let elementPosition = $(`#${elementId}`).offset();
        let workAreaPosition = $(`#${this.ElementId}`).offset();
        let x = elementPosition.left - workAreaPosition.left;
        let y = elementPosition.top - workAreaPosition.top;
        return new Point(x, y);
    }
    setControlLocation(elementId, location) {
        let workAreaPosition = $(`#${this.ElementId}`).offset();
        let left = location.X + workAreaPosition.left;
        let top = location.Y + workAreaPosition.top;
        $(`#${elementId}`).offset({ top, left });
    }
    clearControlsSelection() {
        this.Controls.forEach(c => { $(`#${c.ElementId}`).removeClass('selected'); });
        this.selectedControl = null;
    }
    //Events
    onControlClicked(elementId) {
        console.log("control clicked");
        this.onControlSelected(elementId);
    }
    onControlMoved(elementId) {
        let control = this.getControlByElementId(elementId);
        let contolLocation = this.getControlAbsoluteLocation(elementId);
        control.X = Math.round(contolLocation.X);
        control.Y = Math.round(contolLocation.Y);
        console.log(`[MOVE]: ${elementId} TO {${control.X}:${control.Y}}`);
        this.onControlSelected(elementId);
    }
    onControlSelected(elementId) {
        this.clearControlsSelection();
        this.selectedControl = this.getControlByElementId(elementId);
        this.editor.OnControlSelected(this.selectedControl);
    }
}
//# sourceMappingURL=canvas-work-area-controller.js.map