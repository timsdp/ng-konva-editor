abstract class PropertyTemplate{
    protected readOnlyMarkup: string = '<label id="{{element-id}}">{{value}}</label>';
    protected editableMarkup: string = "";

    public get EditableMarkup(): string {
      return this.editableMarkup;
    }

    public get ReadOnlyMarkup(): string {
        return this.readOnlyMarkup;
      }
}