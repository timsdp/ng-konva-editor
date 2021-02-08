/// <reference path="property.d.ts" />
/// <reference path="../enums/property-type.d.ts" />
/// <reference path="../enums/property-name.d.ts" />
/// <reference path="templates/text-property-template.d.ts" />
/// <reference path="templates/number-property-template.d.ts" />
/// <reference path="templates/property-template.d.ts" />
declare class PropertyTemplateFactory {
    private templatesByType;
    private propertiesValueSources;
    GetMarkup(property: Property, control: Control): string;
}
