/// <reference path ="./editor.ts"/>
class PropertiesArea {
    constructor(editor) {
        this.propertiesTableElementId = "tableProperties";
        this.editor = editor;
    }
    ShowProperties(control) {
        let tbodyElement = $(`#${this.propertiesTableElementId} tbody`);
        tbodyElement.html('');
        let tableRows = `
        <tr><td>Type</td><td>${control.Type}</td></tr>
        <tr><td>ElementId</td><td>${control.ElementId}</td></tr>
        <tr><td>Text</td><td>${control.Text}</td></tr>
        `;
        tbodyElement.append(tableRows);
    }
}
//# sourceMappingURL=properties-area.js.map