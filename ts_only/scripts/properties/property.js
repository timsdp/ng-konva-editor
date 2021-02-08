/// <reference path ="../enums/property-type.ts"/>
/// <reference path ="../enums/property-name.ts"/>
class Property {
    constructor(type, name, isReadOnly = false, value = "") {
        this.Type = type;
        this.Name = name;
        this.Value = value;
        this.ElementId = `property${name}`;
        this.IsReadonly = isReadOnly;
    }
}
//# sourceMappingURL=property.js.map