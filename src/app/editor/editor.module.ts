import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkareaComponent } from './workarea/workarea.component';
import { PropertiesComponent } from './properties/properties.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from '../shared/material/material.module';
import { ContentElementServiceFactoryService} from './services/content-element-service-factory.service';
import { CanvasElementServiceFactoryService} from './services/canvas-element-service-factory.service';
import { ContentElement } from './models/content-element';

@NgModule({
  declarations: [
    WorkareaComponent,
    PropertiesComponent,
    ToolbarComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    WorkareaComponent,
    PropertiesComponent,
    ToolbarComponent,
    MaterialModule
  ],
  providers: [
    CanvasElementServiceFactoryService,
    ContentElementServiceFactoryService
  ]
})
export class EditorModule { }
