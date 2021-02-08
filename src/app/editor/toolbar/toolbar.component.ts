import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { EditorEvent } from 'src/app/shared/models/editor/EditorEvent';
import { EditorEventType } from '../../shared/models/editor/EditorEventType';

@Component({
  selector: 'app-editor-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output() editorRequest = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
  }

  onButtonClick(controlType: string): void{
    console.log(controlType);
    const editorEvent: EditorEvent = { EventType: EditorEventType.ToolBoxButtonClick, Target: controlType, Parameter: null};
    this.editorRequest.emit(editorEvent);
  }
}
