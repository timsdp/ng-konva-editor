import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkareaComponent } from './workarea/workarea.component';
import { PropertiesComponent } from './properties/properties.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from '../shared/material/material.module';

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
  ]
})
export class EditorModule { }
