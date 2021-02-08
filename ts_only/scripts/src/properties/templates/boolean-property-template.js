/// <reference path ="./property-template.ts"/>
class BooleanPropertyTemplate extends PropertyTemplate {
    constructor() {
        super();
        this.editableMarkup = `
        <a href="#" id="{{element-id}}" 
        data-type="text" 
        data-pk="1" 
        data-title="{{name}}" 
        class="editable editable-click" 
        style="display: inline;">{{value}}</a>
    `;
    }
}
//# sourceMappingURL=boolean-property-template.js.map