import { Component, OnInit } from '@angular/core';
import { PropertyName } from '../enums/property-name';
import { PropertyType } from '../enums/property-type';
import { Property } from '../models/property';
import { ContentElement } from '../models/content-element';
import { ContentElementType } from '../enums/content-element-type';


@Component({
  selector: 'app-editor-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  public Properties = new Array<Property>();
  public displayedColumns: string[] = ['name', 'value'];
  private propertiesValueSources =  new Map<PropertyName, (element: ContentElement) => string>([
    [PropertyName.ElementType, (element:ContentElement) => {return ContentElementType[element.Type];}],
    [PropertyName.Name, (element:ContentElement) => {return element.ElementId;}],
    [PropertyName.Caption, (element:ContentElement) => {return element.Title;}],
    [PropertyName.Bold, (element:ContentElement) => {return element.IsBold.toString();}],
    [PropertyName.Left, (element:ContentElement) => {return Math.round(element.X).toString();}],
    [PropertyName.Top, (element:ContentElement) => {return Math.round(element.Y).toString();}],

]);


  constructor() { }

  ngOnInit(): void {
    this.Properties.push(new Property(PropertyType.Text, PropertyName.Caption));
    this.Properties.push(new Property(PropertyType.Boolean, PropertyName.Bold));
    this.Properties.push(new Property(PropertyType.Number, PropertyName.Left));
    this.Properties.push(new Property(PropertyType.Number, PropertyName.Top));
    this.Properties.push(new Property(PropertyType.Text, PropertyName.Name, true));
    this.Properties.push(new Property(PropertyType.Text, PropertyName.ElementType, true));
  }

  public ShowProperties(contentElement: ContentElement){
    this.Properties.forEach(property => {
      let valueSourceFunction = this.propertiesValueSources.get(property.Name);
       
      let value =  valueSourceFunction?.call(contentElement, contentElement);
      property.Value = value ? value : '';

    });
  }
}
