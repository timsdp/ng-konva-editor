/// <reference path="editor.d.ts" />
/// <reference path="properties/property-template-factory.d.ts" />
/// <reference path="properties/property.d.ts" />
declare class PropertiesAreaController {
    private editor;
    private propertiesTableElementId;
    private propertiesContainerElementId;
    private propertiesNotSelectedElementId;
    private propertyFactory;
    private properties;
    constructor(editor: Editor);
    Initialize(): void;
    ShowControlProperties(control: Control): void;
    ShowPropertiesContainer(): void;
    HidePropertiesContainer(): void;
}
