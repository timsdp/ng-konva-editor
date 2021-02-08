/// <reference path ="./dom-element-template.ts"/>
class DOMLabelTemplate extends DOMElementTemplate {
    constructor() {
        super();
        this.markup = `
        <div id="{{container-id}}" class="draggable label">
            <label id="{{control-id}}">{{text}}</label>
        </div>
    `;
    }
}
//# sourceMappingURL=label-template.js.map