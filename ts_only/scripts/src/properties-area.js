/// <reference path ="./editor.ts"/>
/// <reference path ="./properties/property-template-factory.ts"/>
/// <reference path ="./properties/property.ts"/>
class PropertiesAreaController {
    constructor(editor) {
        this.propertiesTableElementId = "propertiesTable";
        this.propertiesContainerElementId = "propertiesAreaContainer";
        this.propertiesNotSelectedElementId = "propertiesNotSelectedMessage";
        this.editor = editor;
    }
    Initialize() {
        $(`#${this.propertiesTableElementId}`).hide();
        $(`#${this.propertiesNotSelectedElementId}`).show();
        this.propertyFactory = new PropertyTemplateFactory();
        this.properties = new Map([
            [PropertyName.Caption, new Property(PropertyType.Text, PropertyName.Caption)],
            [PropertyName.Left, new Property(PropertyType.Number, PropertyName.Left)],
            [PropertyName.Top, new Property(PropertyType.Number, PropertyName.Top)],
            [PropertyName.Name, new Property(PropertyType.Text, PropertyName.Name)],
            [PropertyName.ControlType, new Property(PropertyType.Text, PropertyName.ControlType)],
        ]);
    }
    ShowControlProperties(control) {
        let tbodyElement = $(`#${this.propertiesTableElementId} tbody`);
        tbodyElement.html("");
        let tbodyContent = "";
        this.properties.forEach(property => {
            let controlMarkup = this.propertyFactory.GetMarkup(property, control);
            tbodyContent += `<tr><td>${property.Name}</td><td>${controlMarkup}</td></tr>`;
        });
        tbodyElement.append(tbodyContent);
        $(`#${this.propertiesNotSelectedElementId}`).hide();
    }
    ShowPropertiesContainer() {
        $(`#${this.propertiesTableElementId}`).show();
    }
    HidePropertiesContainer() {
        $(`#${this.propertiesTableElementId}`).hide();
        $(`#${this.propertiesNotSelectedElementId}`).show();
    }
}
//# sourceMappingURL=properties-area.js.map