import { EditorEventType } from "./EditorEventType"

export interface EditorEvent{
    EventType: EditorEventType;
    Target: any;
    Parameter: any;
}