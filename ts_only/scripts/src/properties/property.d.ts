/// <reference path="../enums/property-type.d.ts" />
/// <reference path="../enums/property-name.d.ts" />
declare class Property {
    ElementId: string;
    Name: PropertyName;
    Value: string;
    Type: PropertyType;
    IsReadonly: boolean;
    constructor(type: PropertyType, name: PropertyName, isReadOnly?: boolean, value?: string);
}
