/// <reference path="../../enums/control-type.d.ts" />
declare abstract class Control {
    ElementId: string;
    ElementGroupIndex: number;
    NestedElementId: string;
    CaptionElementId: string;
    Id: string;
    Type: ControlType;
    Text: string;
    Sizable: boolean;
    X: number;
    Y: number;
    IsBold: boolean;
}
