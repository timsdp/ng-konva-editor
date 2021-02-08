declare abstract class PropertyTemplate {
    protected readOnlyMarkup: string;
    protected editableMarkup: string;
    get EditableMarkup(): string;
    get ReadOnlyMarkup(): string;
}
