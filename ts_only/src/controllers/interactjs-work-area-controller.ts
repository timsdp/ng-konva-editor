/// <reference path ="../controls/controls/control.ts"/>
/// <reference path ="../controls/controls/check-box-control.ts"/>
/// <reference path ="../controls/controls/label-control.ts"/>
/// <reference path ="../controls/dom-templates/dom-element-template-factory.ts"/>
/// <reference path ="../models/point.ts"/>
/// <reference path ="../models/position.ts"/>
/// <reference path ="../enums/control-type.ts"/>
/// <reference path ="../editor.ts"/>
/// <reference path ="./base-work-area-controller.ts"/>

class InteractjsWorkAreaController extends BaseWorkAreaController {
    protected domElementTemplateFactory: DOMElementTemplateFactory;
    private controlPropertyUpdateActions =  new Map<PropertyName, (control:Control, newValue: string) => void>([
        [PropertyName.ControlType, (control:Control, newValue: string) => {control.Type = ControlType[newValue];}],
        [PropertyName.Name, (control:Control, newValue: string) => {}], //should be readonly
        [PropertyName.Caption, (control:Control, newValue: string) => {
            control.Text = newValue;
            $(`#${control.NestedElementId}`).html(newValue);
            $(`#${control.CaptionElementId}`).html(newValue);
        }],
        [PropertyName.Left, (control:Control, newValue: string) => {
            let x = Number(newValue);
            let delta = x - control.X;
            control.X = Math.round(x);
            
            let currentLocation = this.getControlAbsoluteLocation(control.ElementId);
            currentLocation.X = +delta;
            this.setControlLocation(control.ElementId, currentLocation);

            //$(`#${control.ElementId}`).css("transform", `translateX(${delta}px)`)
        }],
        [PropertyName.Top, (control:Control, newValue: string) => {
            let y = Number(newValue);
            let delta = y - control.Y;
            control.Y = Math.round(y);
            $(`#${control.ElementId}`).css("transform", `translateX(${delta}px)`)
        }],
        [PropertyName.Bold, (control:Control, newValue: string) => {
            control.IsBold = newValue.toLowerCase() == "true";
            let cssValue = control.IsBold ? "bold" : "";
            $(`#${control.NestedElementId}`).css("font-weight", cssValue);
        }]
    ]);

    public Initialize(){
        super.Initialize();
        this.domElementTemplateFactory = new DOMElementTemplateFactory();       
        $(`#${this.ElementId}`).show();
    }
    public AddControl(type: ControlType, text: string){
        if(!ControlType[type]) debugger;

        let control : Control = null;
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

        if(control){
            control.ElementGroupIndex = this.getNewElementIndex(type);
            control.ElementId = ControlType[type].toLowerCase() + control.ElementGroupIndex;
            control.NestedElementId = `control${control.ElementId}`;
            control.CaptionElementId = `controlCaption${control.ElementId}`;
            control.Text = text;
            let template: string =  this.domElementTemplateFactory.GetTemplate(control);
            $(`#${this.ElementId}`).append(template);

            this.Controls.push(control);
            this.bindControlEvents(control.ElementId);
            this.onControlSelected(control.ElementId);
        }
    }

    public RemoveSelectedControl(){
        let inner = this;
        if(inner.selectedControl != null){
            let currentControl = inner.Controls.filter(c=>c.ElementId === inner.selectedControl.ElementId)[0];
            let controlArrayIndex = inner.Controls.findIndex(c=>c.ElementId === currentControl.ElementId);
            inner.selectedControl = null;
            inner.Controls.splice(controlArrayIndex,1);
            $(`#${currentControl.ElementId}`).remove();
            inner.editor.OnControlDeselect();
        }
    }

    public Clear(){
        $(`#${this.ElementId}`).html("");
        this.Controls = new Array<Control>();
    }

    public UpdateControlPropertyValue(control: Control, propertyName: PropertyName, newValue: string){
        let controlItem = this.Controls.filter(c=>c.ElementId === control.ElementId)[0];
        let updateAction = this.controlPropertyUpdateActions.get(propertyName);
        updateAction(controlItem,newValue);
    }

    public ImportFromModel(model: Control[]){
        this.Clear();
        this.Controls = model;
        this.Controls.forEach(control => {
            let template: string =  this.domElementTemplateFactory.GetTemplate(control);
            $(`#${this.ElementId}`).append(template);

            //Adjust location
            let workAreaOffset = $(`#${this.ElementId}`).offset();
            let left = workAreaOffset.left + control.X;
            let top = workAreaOffset.top + control.Y;
            $(`#${control.ElementId}`).offset({left,top});

            this.bindControlEvents(control.ElementId);
        });
    }

    private bindControlEvents(elementId: string){
        let inner = this;
        let elementSelector = "#" + elementId;
        let location = new Point(0,0);
        interact(elementSelector).draggable({
            listeners: {
              start (event) {
                console.log(event.type, event.target)
                inner.onControlClicked(elementId);
              },//
              move (event) {
                if(!inner.IsControlsLocked){
                    location.X += event.dx
                    location.Y += event.dy
                    
                    let controlLocation = inner.getControlAbsoluteLocation(elementId);
                    console.log(`moved to {${controlLocation.X}:${controlLocation.Y}}`);
                    if(controlLocation.X < 0){
                        location.X = 0;
                    } 
                    if(controlLocation.Y < 0){
                        location.Y = 0;
                    } 

                    event.target.style.transform =`translate(${location.X}px, ${location.Y}px)`
                    inner.onControlMoved(elementId);
                    inner.onControlClicked(elementId);
                }
              },
            },
          });

        //   interact(elementSelector)
        //   .resizable({
        //     edges: { top: false, left: false, bottom: true, right: true },
        //     listeners: {
        //       move: function (event) {
        //         if(inner.IsControlsLocked) return;
        //         let { x, y } = event.target.dataset
        
        //         x = (parseFloat(x) || 0) + event.deltaRect.left
        //         y = (parseFloat(y) || 0) + event.deltaRect.top
        
        //         Object.assign(event.target.style, {
        //           width: `${event.rect.width}px`,
        //           height: `${event.rect.height}px`,
        //           transform: `translate(${x}px, ${y}px)`
        //         })
        
        //         Object.assign(event.target.dataset, { x, y })
        //       }
        //     }
        //   })

          interact(elementSelector).on('tap', function (event) {
            inner.onControlClicked(elementId);
            event.preventDefault();
          })
    }
    
    //Helpers
    private getNewElementIndex(type: ControlType){
        let controls = this.Controls.filter(c=>c.Type == type).map(f=>f.ElementGroupIndex);
        if(controls.length==0) {return 1};

        let sortedIndexes = controls.sort((a,b)=> a - b);
        return ++sortedIndexes[sortedIndexes.length-1];
    }

    private getControlByElementId(elementId: string){
        return this.Controls.filter(c=> c.ElementId == elementId)[0];
    }

    private getControlOffset(elementId: string):Position {
        let elementPosition = $(`#${elementId}`).offset();
        return new Position(elementPosition.top, elementPosition.left);
    }

    private getControlAbsoluteLocation(elementId: string):Point {
        let elementPosition = $(`#${elementId}`).offset();
        let workAreaPosition = $(`#${this.ElementId}`).offset();
        let x = elementPosition.left - workAreaPosition.left;
        let y = elementPosition.top - workAreaPosition.top;
        return new Point(x,y);
    }

    private setControlLocation(elementId: string, location: Point){
        let workAreaPosition = $(`#${this.ElementId}`).offset();
        let left = location.X + workAreaPosition.left;
        let top = location.Y + workAreaPosition.top;
        $(`#${elementId}`).offset({top,left});
    }

    private clearControlsSelection(){
        this.Controls.forEach(c => {$(`#${c.ElementId}`).removeClass('selected')});
        this.selectedControl = null;
    }

    //Events
    private onControlClicked(elementId: string)
    {
        console.log("control clicked");
        this.onControlSelected(elementId);
    }

    private onControlMoved(elementId: string){
        let control = this.getControlByElementId(elementId);
        let contolLocation = this.getControlAbsoluteLocation(elementId);
        control.X = Math.round(contolLocation.X);
        control.Y = Math.round(contolLocation.Y);
        console.log(`[MOVE]: ${elementId} TO {${control.X}:${control.Y}}`)
        this.onControlSelected(elementId);
    }

    private onControlSelected(elementId: string)
    {
        this.clearControlsSelection();
        $(`#${elementId}`).addClass("selected");
        this.selectedControl = this.getControlByElementId(elementId);
        this.editor.OnControlSelected(this.selectedControl);
    }

}