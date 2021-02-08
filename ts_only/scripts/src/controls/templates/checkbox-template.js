/// <reference path ="./dom-element-template.ts"/>
class DOMCheckboxTemplate extends DOMElementTemplate {
    constructor() {
        super();
        this.markup = `
        <div class="form-check draggable checkbox" id="{{container-id}}">
            <input class="form-check-input" type="checkbox" value="" id="{{control-id}}">
            <label class="form-check-label" for="{{control-id}}" id={{caption-label-id}}>{{text}}</label>
        </div>
    `;
    }
}
//# sourceMappingURL=checkbox-template.js.map