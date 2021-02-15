export class ToolbarButton{
    public Index: number;
    public Title: string;
    public Tooltip: string;

    public Icon: string;
    public Enabled: boolean = true;
    public Visible: boolean = true;
    public ShowTitle: boolean;
    public Command: any;
    public CommandArgument: any

    constructor(index: number, title: string, icon: string, tooltip: string, command: any){
        this.Index = index;
        this.Title = title;
        this.Icon = icon;
        this.Command = command;
        this.Tooltip = tooltip;
    }
}