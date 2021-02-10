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
      width: 1200,
      height: 600
    });

    this.currentStage.on('click', function (event: any) { inner.onStageClicked(event, inner) });
    // declare handlers for element events
    // Konva supports mouseover, mouseout, mouseenter, mouseleave, mousemove, mousedown, mouseup, wheel, click, dblclick, dragstart, dragmove, and dragend desktop events.
    // https://konvajs.org/docs/events/Binding_Events.html
    this.eventsHandlers.set('click', function(data: any){ inner.onElementClick(data, inner);});
    this.eventsHandlers.set('dragmove', function(data: any){ inner.onElementMove(data, inner);});
    this.eventsHandlers.set('dragstart', function(data: any){ inner.onElementDragStart(data, inner);});
    this.eventsHandlers.set('mouseenter', function(data: any){ inner.onElementMouseEnter(data, inner);});
    this.eventsHandlers.set('mouseleave', function(data: any){ inner.onElementMouseLeave(data, inner);});
    this.eventsHandlers.set('transform', function(data: any){ inner.onElementTransform(data, inner);});



  }

  public AddNewElement(type: ContentElementType, title: string, value: any): void {
    const contentElement = this.contentElementServiceFactoryService.CreateNewContentElement(type, title, value, this.contentElements);
    this.contentElements.push(contentElement);

    const layer = this.canvasElementServiceFactoryService.CreateNewElementLayer(contentElement, this.eventsHandlers);
    layer.draw();

    this.currentStage.add(layer);
  }

  public ClearSelection(exceptedElementId: string = null){
    this.contentSelectedElement = null;
    this.contentElements.forEach(element => {
      if(exceptedElementId != null && element.ElementId == exceptedElementId) { return; }

      let transformerElement = this.currentStage.find(`#${element.TransformerElementId}`)[0];
      if (transformerElement != null) {
        let parentLayer = transformerElement.parent;
        transformerElement.destroy();
        parentLayer.draw();
      }
    });

    //send ivent
    const editorEvent: EditorEvent = {
      EventType: EditorEventType.WorkAreaSelectionCleared,
      Target: null,
      Parameter: null
    };

    this.editorRequest.emit(editorEvent);
  }

  public SelectElement(canvasElementId: string){
    if(this.contentSelectedElement != null && canvasElementId === this.contentSelectedElement.ElementId){
      return;
    }
    this.ClearSelection(canvasElementId);
    this.contentSelectedElement = this.contentElements.filter(e => e.ElementId === canvasElementId)[0];
    let textCanvasElementId = this.contentSelectedElement.TitleElementId;
    let textCanvasElement = this.currentStage.find(`#${textCanvasElementId}`)[0];

    //Add transformer
    const MIN_WIDTH = 50;
    let elementNode = this.currentStage.find(`#${this.contentSelectedElement.ElementId}`)[0];
    let elementLayer = elementNode.parent;
    
    let transformer = new Konva.Transformer({
      id: this.contentSelectedElement.TransformerElementId,
      rotateEnabled: false,
      keepRatio: true,
      enabledAnchors: ['middle-left', 'middle-right'],
      padding: 5,
      nodes: [textCanvasElement],
      // limit transformer size
      boundBoxFunc: (oldBox, newBox) => {
        if (newBox.width < MIN_WIDTH) {
          return oldBox;
        }
        return newBox;
      },
    });
    textCanvasElement.on('transform', () => {
      // with enabled anchors we can only change scaleX
      // so we don't need to reset height
      // just width
      textCanvasElement.setAttrs({
        width: Math.max(textCanvasElement.width() * textCanvasElement.scaleX(), MIN_WIDTH),
        scaleX: 1,
        scaleY: 1,
      });
    });

    elementLayer.add(transformer);
    elementLayer.draw();
  }

  //#region Element events
  private onElementClick(data: any, workAreaComponent: WorkareaComponent): void{
    let canvasElementId = data.currentTarget.attrs.id;
    workAreaComponent.SelectElement(canvasElementId);

    const editorEvent: EditorEvent = {
      EventType: EditorEventType.ContentElementSelected,
      Target: workAreaComponent.contentSelectedElement,
      Parameter: null
    };

    this.editorRequest.emit(editorEvent);
  }

  private onElementMove(data: any, workAreaComponent: WorkareaComponent): void{
    let canvasElementId = data.currentTarget.attrs.id;
    workAreaComponent.contentSelectedElement = workAreaComponent.contentElements.filter(e => e.ElementId === canvasElementId)[0];
    
    
    workAreaComponent.contentSelectedElement.X = data.currentTarget.attrs.x;
    workAreaComponent.contentSelectedElement.Y = data.currentTarget.attrs.y;

    const editorEvent: EditorEvent = {
      EventType: EditorEventType.ContentElementSelected,
      Target: workAreaComponent.contentSelectedElement,
      Parameter: null
    };
    this.editorRequest.emit(editorEvent);
  }

  private onElementDragStart(data: any, workAreaComponent: WorkareaComponent): void{
    let canvasElementId = data.currentTarget.attrs.id;
    workAreaComponent.SelectElement(canvasElementId);
  }

  private onElementMouseEnter(data: any, workAreaComponent: WorkareaComponent): void{
    workAreaComponent.currentStage.container().style.cursor = 'move';
  }

  private onElementMouseLeave(data: any, workAreaComponent: WorkareaComponent): void{
    workAreaComponent.currentStage.container().style.cursor = 'default';
  }

  private onElementTransform(data: any, workAreaComponent: WorkareaComponent): void{
    let canvasElementId = data.currentTarget.attrs.id;
    workAreaComponent.contentSelectedElement = workAreaComponent.contentElements.filter(e => e.ElementId === canvasElementId)[0];
    workAreaComponent.contentSelectedElement.X = data.currentTarget.attrs.x;
    workAreaComponent.contentSelectedElement.Y = data.currentTarget.attrs.y;

    const editorEvent: EditorEvent = {
      EventType: EditorEventType.ContentElementSelected,
      Target: this.contentSelectedElement,
      Parameter: null
    };
    this.editorRequest.emit(editorEvent);
  }

  private onStageClicked(eventArgs: any, workAreaComponent: WorkareaComponent): void{
    if(eventArgs.target.parent === null){
      workAreaComponent.ClearSelection();
    }
  }
  //#endregion
}
