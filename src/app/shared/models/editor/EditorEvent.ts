import { EditorEventType } from "./EditorEventType"



export interface EditorEvent{
    EventType: EditorEventType;
    Target: string;
    Parameter: any;
}