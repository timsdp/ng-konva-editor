/// <reference path ="../../enums/control-type.ts"/>
/// <reference path ="./checkbox-template.ts"/>
/// <reference path ="./label-template.ts"/>
/// <reference path ="./control-template.ts"/>
class ControlTemplateFactory {
    constructor() {
        this.Templates = new Map([
            [ControlType.Checkbox, new CheckboxTemplate()],
            [ControlType.Label, new LabelTemplate()]
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
//# sourceMappingURL=control-template-factory.js.map