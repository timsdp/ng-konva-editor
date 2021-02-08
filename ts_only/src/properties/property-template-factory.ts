/// <reference path ="./property.ts"/>
/// <reference path ="../enums/property-type.ts"/>
/// <reference path ="../enums/property-name.ts"/>

/// <reference path ="./templates/text-property-template.ts"/>
/// <reference path ="./templates/number-property-template.ts"/>
/// <reference path ="./templates/boolean-property-template.ts"/>
/// <reference path ="./templates/property-template.ts"/>
/// <reference path ="./property.ts"/>

class PropertyTemplateFactory{
    private templatesByType : Map<PropertyType, PropertyTemplate> = new Map<PropertyType, PropertyTemplate>([
        [PropertyType.Text, new TextPropertyTemplate()],
        [PropertyType.Number, new NumberPropertyTemplate()],
        [PropertyType.Boolean, new BooleanPropertyTemplate()]
    ]);

    private propertiesValueSources =  new Map<string, (control:Control) => string>([
        [PropertyName.ControlType, (control:Control) => {return ControlType[control.Type];}],
        [PropertyName.Name, (control:Control) => {return control.ElementId;}],
        [PropertyName.Caption, (control:Control) => {return control.Text;}],
        [PropertyName.Bold, (control:Control) => {return control.IsBold.toString();}],
        [PropertyName.Left, (control:Control) => {return Math.round(control.X).toString();}],
        [PropertyName.Top, (control:Control) => {return Math.round(control.Y).toString();}],

    ]);

    public GetMarkup(property: Property, control: Control): string{
        if(!this.templatesByType.has(property.Type)) return null;

        let template: PropertyTemplate = this.templatesByType.get(property.Type);
        let propertyValue = this.propertiesValueSources.get(property.Name)(control);
        let markup = property.IsReadonly ? template.ReadOnlyMarkup : template.EditableMarkup;

        return markup
                    .replaceAll("{{element-id}}", property.ElementId)
                    .replaceAll("{{name}}", property.Name)
                    .replaceAll("{{value}}", propertyValue);
    }
}