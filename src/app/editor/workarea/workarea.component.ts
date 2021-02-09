import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import Konva from 'konva';
import { CanvasElementServiceFactoryService} from '../services/canvas-element-service-factory.service';
import { ContentElementServiceFactoryService} from '../services/content-element-service-factory.service';
import { ContentElement } from '../models/content-element';
import { ContentElementType } from '../enums/content-element-type';
import { EditorEvent } from 'src/app/shared/models/editor/EditorEvent';
import { EditorEventType } from '../../shared/models/editor/EditorEventType';

@Component({
  selector: 'app-editor-workarea',
  templateUrl: './workarea.component.html',
  styleUrls: ['./workarea.component.css']
})

export class WorkareaComponent implements OnInit {
  private stageElementId = 'divWorkAreaCanvas';
  private contentElements = new Array<ContentElement>();
  private contentSelectedElement: ContentElement = new ContentElement();

  private currentStage: any;
  private eventsHandlers = new Map<string, Function>();

  @Output() editorRequest = new EventEmitter<any>();
  constructor(
    private contentElementServiceFactoryService: ContentElementServiceFactoryService,
    private canvasElementServiceFactoryService: CanvasElementServiceFactoryService
  ) {}

  ngOnInit(): void {
    let inner = this;
    this.currentStage = new Konva.Stage({
      container: this.stageElementId,
      width: window.innerWidth,
      height: window.innerHeight
    });

    this.eventsHandlers.set('click', function(data: any){ inner.onElementClick(data, inner);});
  }

  public AddNewElement(type: ContentElementType, title: string, value: any): void {
    const contentElement = this.contentElementServiceFactoryService.CreateNewContentElement(type, title, value, this.contentElements);
    this.contentElements.push(contentElement);

    const layer = this.canvasElementServiceFactoryService.CreateNewElementLayer(contentElement, this.eventsHandlers);
    layer.draw();

    this.currentStage.add(layer);
  }

  private onElementClick(data: any, workAreaComponent: WorkareaComponent): void{
    let canvasElementId = data.currentTarget.attrs.id;
    this.contentSelectedElement = workAreaComponent.contentElements.filter(e => e.ElementId === canvasElementId)[0];

    const editorEvent: EditorEvent = {
      EventType: EditorEventType.ContentElementSelected,
      Target: this.contentSelectedElement,
      Parameter: null
    };

    this.editorRequest.emit(editorEvent);
  }
}
