/// <reference path="../../enums/control-type.d.ts" />
/// <reference path="dom-checkbox-template.d.ts" />
/// <reference path="dom-label-template.d.ts" />
/// <reference path="dom-element-template.d.ts" />
declare class DOMElementTemplateFactory {
    private Templates;
    private markupReplaceRelations;
    GetTemplate(control: Control): string;
}
