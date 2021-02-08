
import { Component, ViewChild } from '@angular/core';
import { EditorEventType } from '../shared/models/editor/EditorEventType';
import { WorkareaComponent } from './workarea/workarea.component';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  @ViewChild(WorkareaComponent) child:WorkareaComponent;

  public handleRequest(event: any): void{
    switch (event.EventType)
    {
      case EditorEventType.ToolBoxButtonClick:
        console.log('ToolBoxButtonClick');
        break;
      case EditorEventType.ActionButtonClick:
        console.log('ActionButtonClick');
        break;
    }
  }
}
