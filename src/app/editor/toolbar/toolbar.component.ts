import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { EditorEvent } from 'src/app/shared/models/editor/EditorEvent';
import { EditorEventType } from '../../shared/models/editor/EditorEventType';
import { ContentElementType } from '../enums/content-element-type';
import { ToolbarButton } from '../models/toolbar-button';


@Component({
  selector: 'app-editor-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {

  @Output() editorRequest = new EventEmitter<any>();
  public buttons: ToolbarButton[] = [
    new ToolbarButton(1, 'Question', 'help', 'Question Box Control', ContentElementType.Question),
    new ToolbarButton(2, 'Label','font_download', 'Label Box Control', ContentElementType.Label),
    new ToolbarButton(3, 'Free Text Box', 'input', 'Free Text Box Control', ContentElementType.FreeTextBox),
    new ToolbarButton(4, 'Check Box','check_circle', 'Check Box Control', ContentElementType.Checkbox),
    new ToolbarButton(5, 'Calendar','date_range', 'Calendar Box Control', ContentElementType.Calendar),
    new ToolbarButton(6, 'Diagnosis Control','fact_check', 'Diagnosis Control', ContentElementType.Diagnosis),
    new ToolbarButton(7, 'Number','calculate', 'Number Entry', ContentElementType.Number),
    new ToolbarButton(8, 'Time','schedule', 'Time Entry', ContentElementType.Time),
    new ToolbarButton(9, 'Primary Physician','content_paste', 'Primary Physician Control', ContentElementType.PrimaryPhysician),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public onButtonClick(elementType: string): void {
    console.log('Toolbar button clicked!');
    const editorEvent: EditorEvent = {
      EventType: EditorEventType.ToolBoxButtonClick,
      Target: elementType,
      Parameter: null
    };
    this.editorRequest.emit(editorEvent);
  }
}
