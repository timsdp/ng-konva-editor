import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { EditorEvent } from 'src/app/shared/models/editor/EditorEvent';
import { EditorEventType } from '../../shared/models/editor/EditorEventType';
import { ContentElementType } from '../enums/content-element-type';


@Component({
  selector: 'app-editor-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {

  @Output() editorRequest = new EventEmitter<any>();
  public buttons: any[] = [
    { ContentElementType: ContentElementType.Label, Title: 'Label', Icon: 'label', IsEnabled: true },
    { ContentElementType: ContentElementType.Checkbox, Title: 'Checkbox', Icon: 'check_circle_outline', IsEnabled: true },
    { ContentElementType: ContentElementType.TextInput, Title: 'Text Input', Icon: 'input', IsEnabled: false },
    { ContentElementType: ContentElementType.DropdownList, Title: 'Dropdown List', Icon: 'arrow_drop_down', IsEnabled: false },
    { ContentElementType: ContentElementType.DatePicker, Title: 'Date Picker', Icon: 'calendar_today', IsEnabled: false },
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
