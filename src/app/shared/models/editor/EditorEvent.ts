import { HttpEventType } from "@angular/common/http"



export interface EditorEvent{
    EventType: EditorEventType;
    Target: string;
    Parameter: any;
}