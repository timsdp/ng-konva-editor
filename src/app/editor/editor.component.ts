import { Component, ViewChild } from '@angular/core';
import { EditorEventType } from '../shared/models/editor/EditorEventType';
import { PropertiesComponent } from './properties/properties.component';
import { WorkareaComponent } from './workarea/workarea.component';
import { ContentElementType } from './enums/content-element-type';
import { ContentElement } from './models/content-element';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
  @ViewChild('workArea') workAreaComponent!: WorkareaComponent;
  @ViewChild('properties') propertiesComponent!: PropertiesComponent;

  private titleStubs: string[] = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    'Duis aute irure dolor in reprehenderit in',
    'voluptate velit esse cillum dolore eu fugiat nulla pariatur',
    'Excepteur sint occaecat cupidatat non proident',
    'sunt in culpa qui officia deserunt mollit anim id est laborum.',
  ];

  constructor() {}
  public handleRequest(event: any): void {
    console.log('[EDITOR REQUEST] -->');
    console.log(event);
    switch (event.EventType) {
      case EditorEventType.ToolBoxButtonClick:
        const stringIndex = Math.round(
          Math.random() * (this.titleStubs.length - 1)
        );
        const defaultTitle = this.titleStubs[stringIndex];
        const title = prompt('Enter element title:', defaultTitle) || '';
        const contentElementType = Number(event.Target) as ContentElementType;
        this.workAreaComponent.AddNewElement(contentElementType, title, null);
        break;

      case EditorEventType.ActionButtonClick:
        console.log('ActionButtonClick');
        break;

      case EditorEventType.ContentElementSelected:
        let contentElement: ContentElement = event.Target;
        this.propertiesComponent.ShowProperties(contentElement);
        break;
    }
  }
}
