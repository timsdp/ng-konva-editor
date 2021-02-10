import { ContentElementType } from '../enums/content-element-type';

export class ContentElement {
    public ElementId = '';
    public ElementGroupIndex = 0;
    public NestedElementId = '';
    public TitleElementId = '';
    public TransformerElementId = '';
    public Id = '';
    public Type = ContentElementType.Label;
    public Title = '';
    public Sizable = false;
    public X = 0;
    public Y = 0;
    public IsBold = false;
    public Value: any = null;
}