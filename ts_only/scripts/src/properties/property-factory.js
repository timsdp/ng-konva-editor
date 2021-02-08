/// <reference path ="./property.ts"/>
/// <reference path ="../enums/property-type.ts"/>
/// <reference path ="./templates/text-property-template.ts"/>
/// <reference path ="./templates/property-template.ts"/>
class PropertyTemplateFactory {
    constructor() {
        this.Templates = new Map([
            [PropertyType.Text, new TextPropertyTemplate()]
        ]);
    }
    GetTemplate(property) {
        if (!this.Templates.has(property.Type))
            return null;
        let template = this.Templates.get(property.Type);
        return template.Markup
            .replaceAll("{{control-id}}", property.NestedElementId)
            .replaceAll("{{value}}", property.Text);
    }
}
//# sourceMappingURL=property-factory.js.map