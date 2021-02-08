/// <reference path ="../../enums/control-type.ts"/>
/// <reference path ="./dom-checkbox-template.ts"/>
/// <reference path ="./dom-label-template.ts"/>
/// <reference path ="./dom-element-template.ts"/>

class DOMElementTemplateFactory{
    private Templates : Map<ControlType, DOMElementTemplate> = new Map<ControlType, DOMElementTemplate>([
        [ControlType.Checkbox, new DOMCheckboxTemplate()],
        [ControlType.Label, new DOMLabelTemplate()]
    ]);

    //TODO: another way to automate replacements
    private markupReplaceRelations = new Map<string,string>([
        ["container-id","ElementId"],
        ["control-id","NestedElementId"],
        ["caption-label-id","CaptionElementId"],
        ["text","Text"]
    ]);

    public GetTemplate(control: Control): string{
        if(!this.Templates.has(control.Type)) return null;

        let template: DOMElementTemplate = this.Templates.get(control.Type);

        return template.Markup
                    .replaceAll("{{container-id}}",control.ElementId)
                    .replaceAll("{{control-id}}", control.NestedElementId)
                    .replaceAll("{{caption-label-id}}", control.CaptionElementId)
                    .replaceAll("{{text}}", control.Text);
    }
}