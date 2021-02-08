import { Injectable } from '@angular/core';
import Konva from 'konva';
import { Layer } from 'konva/types/Layer';
import { ContentElement } from '../models/content-element';
import { ContentElementType } from '../enums/content-element-type';

@Injectable({
  providedIn: 'root'
})
export class ContentElementServiceFactoryService {

  constructor() { }

  public CreateNewContentElement(type: ContentElementType, title: string, value: any, elements: Array<ContentElement>): ContentElement {
    const contentElement = new ContentElement();
    contentElement.Type = type;
    contentElement.ElementGroupIndex = this.getNewElementIndex(type, elements);
    contentElement.ElementId = ContentElementType[type].toLowerCase() + contentElement.ElementGroupIndex;
    contentElement.NestedElementId = `control${contentElement.ElementId}`;
    contentElement.TitleElementId = `controlTitle${contentElement.ElementId}`;
    contentElement.Title = title != null ? title : contentElement.ElementId;
    return contentElement;
  }

  private getNewElementIndex(type: ContentElementType, elements: Array<ContentElement>): number {
    const sameTypeElements = elements.filter(c => c.Type === type).map(f => f.ElementGroupIndex);
    if (sameTypeElements.length === 0) { return 1; }

    const sortedIndexes = sameTypeElements.sort((a, b) => a - b);
    return ++sortedIndexes[sortedIndexes.length - 1];
  }
}
