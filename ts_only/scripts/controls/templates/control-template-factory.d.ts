/// <reference path="../../enums/control-type.d.ts" />
/// <reference path="checkbox-template.d.ts" />
/// <reference path="label-template.d.ts" />
declare class ControlTemplateFactory {
    private Templates;
    private markupReplaceRelations;
    GetTemplate(control: Control): string;
}
