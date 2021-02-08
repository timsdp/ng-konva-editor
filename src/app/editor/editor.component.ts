
import { Component, ViewChild } from '@angular/core';
import { EditorEventType } from '../shared/models/editor/EditorEventType';
import { PropertiesComponent } from './properties/properties.component';
import { WorkareaComponent } from './workarea/workarea.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  @ViewChild('workArea') workAreaComponent: WorkareaComponent;
  @ViewChild('properties') propertiesComponent: PropertiesComponent;

  constructor(){
    this.workAreaComponent = new WorkareaComponent();
    this.propertiesComponent = new PropertiesComponent();
  }
  public handleRequest(event: any): void{
    switch (event.EventType)
    {
      case EditorEventType.ToolBoxButtonClick:
        this.workAreaComponent.AddNewControl();
        console.log('ToolBoxButtonClick');
        break;
      case EditorEventType.ActionButtonClick:
        console.log('ActionButtonClick');
        break;
    }
  }
}
