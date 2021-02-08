class PropertyTemplate {
    constructor() {
        this.readOnlyMarkup = '<label id="{{element-id}}">{{value}}</label>';
        this.editableMarkup = "";
    }
    get EditableMarkup() {
        return this.editableMarkup;
    }
    get ReadOnlyMarkup() {
        return this.readOnlyMarkup;
    }
}
//# sourceMappingURL=property-template.js.map