/// <reference path ="./property.ts"/>
/// <reference path ="../enums/property-type.ts"/>
/// <reference path ="../enums/property-name.ts"/>
/// <reference path ="./templates/text-property-template.ts"/>
/// <reference path ="./templates/number-property-template.ts"/>
/// <reference path ="./templates/property-template.ts"/>
/// <reference path ="./property.ts"/>
class PropertyTemplateFactory {
    constructor() {
        this.templatesByType = new Map([
            [PropertyType.Text, new TextPropertyTemplate()],
            [PropertyType.Number, new NumberPropertyTemplate()]
        ]);
        this.propertiesValueSources = new Map([
            [PropertyName.ControlType, (control) => { return ControlType[control.Type]; }],
            [PropertyName.Name, (control) => { return control.ElementId; }],
            [PropertyName.Caption, (control) => { return control.Text; }],
            [PropertyName.Left, (control) => { return Math.round(control.X).toString(); }],
            [PropertyName.Top, (control) => { return Math.round(control.Y).toString(); }]
        ]);
    }
    GetMarkup(property, control) {
        if (!this.templatesByType.has(property.Type))
            return null;
        let template = this.templatesByType.get(property.Type);
        let propertyValue = this.propertiesValueSources.get(property.Name)(control);
        let markup = property.IsReadonly ? template.ReadOnlyMarkup : template.EditableMarkup;
        return markup
            .replaceAll("{{element-id}}", property.ElementId)
            .replaceAll("{{name}}", property.Name)
            .replaceAll("{{value}}", propertyValue);
    }
}
//# sourceMappingURL=property-template-factory.js.map