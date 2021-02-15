import { PropertyName } from '../enums/property-name';
import { PropertyType } from '../enums/property-type';

export class Property{
    public ElementId: string;
    public Name: PropertyName;
    public Value: string;
    public Type: PropertyType;
    public IsReadonly: boolean;
    public SortOrder: number;

    constructor(type: PropertyType, name: PropertyName, isReadOnly: boolean = false, sortOrder: number = 0, value: string = '') {
        this.Type = type;
        this.Name = name;
        this.Value = value;
        this.ElementId = `property${name}`;
        this.IsReadonly = isReadOnly;
        this.SortOrder = sortOrder;
    }
}