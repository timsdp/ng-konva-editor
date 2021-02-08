/// <reference path ="../../enums/control-type.ts"/>
/// <reference path ="./dom-checkbox-template.ts"/>
/// <reference path ="./dom-label-template.ts"/>
/// <reference path ="./dom-element-template.ts"/>
class DOMElementTemplateFactory {
    constructor() {
        this.Templates = new Map([
            [ControlType.Checkbox, new DOMCheckboxTemplate()],
            [ControlType.Label, new DOMLabelTemplate()]
        ]);
        //TODO: another way to automate replacements
        this.markupReplaceRelations = new Map([
            ["container-id", "ElementId"],
            ["control-id", "NestedElementId"],
            ["caption-label-id", "CaptionElementId"],
            ["text", "Text"]
        ]);
    }
    GetTemplate(control) {
        if (!this.Templates.has(control.Type))
            return null;
        let template = this.Templates.get(control.Type);
        return template.Markup
            .replaceAll("{{container-id}}", control.ElementId)
            .replaceAll("{{control-id}}", control.NestedElementId)
            .replaceAll("{{caption-label-id}}", control.CaptionElementId)
            .replaceAll("{{text}}", control.Text);
    }
}
//# sourceMappingURL=dom-element-template-factory.js.map