/// <reference path ="../enums/property-type.ts"/>
/// <reference path ="../enums/property-name.ts"/>

class Property{
    public ElementId: string;
    public Name: PropertyName;
    public Value: string;
    public Type: PropertyType;
    public IsReadonly: boolean;

    constructor(type: PropertyType, name: PropertyName, isReadOnly: boolean = false, value: string = "") {
        this.Type = type;
        this.Name = name;
        this.Value = value;
        this.ElementId = `property${name}`;
        this.IsReadonly = isReadOnly;
    }
}