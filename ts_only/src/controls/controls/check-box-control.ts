/// <reference path ="control.ts"/>


class CheckBoxControl extends Control
{
    public Checked: boolean = false;

    constructor(){
        super();
        this.Type = ControlType.Checkbox;
    }
}