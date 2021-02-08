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
        this.HidePropertiesContainer();
        this.propertyFactory = new PropertyTemplateFactory();
        this.properties = new Map([
            [PropertyName.Caption, new Property(PropertyType.Text, PropertyName.Caption)],
            [PropertyName.Left, new Property(PropertyType.Number, PropertyName.Left)],
            [PropertyName.Top, new Property(PropertyType.Number, PropertyName.Top)],
            [PropertyName.Name, new Property(PropertyType.Text, PropertyName.Name, true)],
            [PropertyName.ControlType, new Property(PropertyType.Text, PropertyName.ControlType, true)],
        ]);
    }
    ShowControlProperties(control) {
        let inner = this;
        let tbodyRowMarkup = "";
        let tbodyElement = $(`#${this.propertiesTableElementId} tbody`);
        tbodyElement.html("");
        this.properties.forEach(property => {
            let controlMarkup = this.propertyFactory.GetMarkup(property, control);
            tbodyRowMarkup = `<tr><td>${property.Name}</td><td>${controlMarkup}</td></tr>`;
            tbodyElement.append(tbodyRowMarkup);
            if (!property.IsReadonly) {
                $(`#${property.ElementId}`).editable({
                    type: 'text',
                    showbuttons: false
                });
                $(`#${property.ElementId}`).on('save', function (e, params) {
                    property.Value = params.newValue;
                    inner.editor.OnControlValueUpdated(control, property.Name, params.newValue);
                });
            }
        });
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
//# sourceMappingURL=properties-area-controller.js.map