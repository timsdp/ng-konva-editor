/// <reference path ="../../../node_modules/interactjs/dist/interact.js"/>
/// <reference path ="../../enums/control-type.ts"/>

abstract class Control {
    public ElementId: string;
    public ElementGroupIndex: number;
    public NestedElementId: string;
    public CaptionElementId: string;
    public Id: string;
    public Type: ControlType;
    public Text: string;
    public Sizable: boolean = false;
    public X: number = 0;
    public Y: number = 0;
    public IsBold: boolean = false;
}