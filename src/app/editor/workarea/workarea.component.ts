import { Component, Input, OnInit } from '@angular/core';
import Konva from 'konva';
import { CanvasElementServiceFactoryService} from '../services/canvas-element-service-factory.service';
import { ContentElementServiceFactoryService} from '../services/content-element-service-factory.service';

import { ContentElement } from '../models/content-element';
import { ContentElementType } from '../enums/content-element-type';

@Component({
  selector: 'app-editor-workarea',
  templateUrl: './workarea.component.html',
  styleUrls: ['./workarea.component.css']
})

export class WorkareaComponent implements OnInit {
  private stageElementId = 'divWorkAreaCanvas';
  private contentElements = new Array<ContentElement>();
  private currentStage: any;

  constructor(
    private contentElementServiceFactoryService: ContentElementServiceFactoryService,
    private canvasElementServiceFactoryService: CanvasElementServiceFactoryService
  ) { }

  ngOnInit(): void {
    this.currentStage = new Konva.Stage({
      container: this.stageElementId,
      width: window.innerWidth,
      height: window.innerHeight
    });
  }
  public AddNewElement(type: ContentElementType, title: string, value: any): void {
    const contentElement = this.contentElementServiceFactoryService.CreateNewContentElement(type, title, value, this.contentElements);
    this.contentElements.push(contentElement);

    const layer = this.canvasElementServiceFactoryService.CreateNewElementLayer(contentElement);
    layer.draw();

    this.currentStage.add(layer);
  }
}
