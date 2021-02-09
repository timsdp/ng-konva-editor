import { Injectable } from '@angular/core';
import Konva from 'konva';
import { Layer } from 'konva/types/Layer';
import { ContentElement } from '../models/content-element';
import { ContentElementType } from '../enums/content-element-type';

@Injectable({
  providedIn: 'root',
})
export class CanvasElementServiceFactoryService {
  constructor() {}

  public CreateNewElementLayer(
    contentElement: ContentElement,
    eventsHandlers: Map<string, Function>
  ): Layer {
    const layer = new Konva.Layer();
    let element: any;
    switch (contentElement.Type as ContentElementType) {
      case ContentElementType.Label:
        element = new Konva.Text({
          id: contentElement.ElementId,
          text: contentElement.Title,
          x: 0,
          y: 0,
          fontSize: 16,
          draggable: true,
        });
        break;

      case ContentElementType.Checkbox:
        element = new Konva.Group({
          id: contentElement.ElementId,
          draggable: true,
        });
        const rect = new Konva.Rect({
          id: contentElement.NestedElementId,
          x: 0,
          y: 0,
          width: 16,
          height: 16,
          stroke: 'black',
          strokeWidth: 2,
        });
        const textNode = new Konva.Text({
          id: contentElement.TitleElementId,
          text: contentElement.Title,
          x: 20,
          y: 2,
          fontSize: 16,
        });

        element.add(rect);
        element.add(textNode);
        break;
      default:
        break;
    }
    debugger;
    this.bindEvents(element, eventsHandlers);
    layer.add(element);
    return layer;
  }

  bindEvents(element: any, eventsHandlers: Map<string, Function>) {
    for (let event of eventsHandlers.entries()) {
      let eventName = event[0];
      let handler = event[1];
      element.on(eventName, handler);
    }
  }
}
