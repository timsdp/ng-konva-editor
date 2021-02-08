class LabelTemplate extends ControlTemplate {
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