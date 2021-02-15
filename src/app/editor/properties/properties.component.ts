import { Component, OnInit } from '@angular/core';
import { PropertyName } from '../enums/property-name';
import { PropertyType } from '../enums/property-type';
import { Property } from '../models/property';
import { ContentElement } from '../models/content-element';
import { ContentElementType } from '../enums/content-element-type';

@Component({
  selector: 'app-editor-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit {
  public Properties = new Array<Property>();
  public displayedColumns: string[] = ['name', 'value'];
  public IsVisible = false;
  private propertiesValueSources = new Map<
    PropertyName,
    (element: ContentElement) => string
  >([
    [
      PropertyName.ControlType,
      (element: ContentElement) => {
        return ContentElementType[element.Type];
      },
    ],
    [
      PropertyName.Name,
      (element: ContentElement) => {
        return element.ElementId;
      },
    ],
    [
      PropertyName.Caption,
      (element: ContentElement) => {
        return element.Title;
      },
    ],
    [
      PropertyName.Bold,
      (element: ContentElement) => {
        return element.IsBold.toString();
      },
    ],
    [
      PropertyName.Left,
      (element: ContentElement) => {
        return Math.round(element.Left).toString();
      },
    ],
    [
      PropertyName.Top,
      (element: ContentElement) => {
        return Math.round(element.Top).toString();
      },
    ],
    [
      PropertyName.Width,
      (element: ContentElement) => {
        return Math.round(element.Width).toString();
      },
    ],
    [
      PropertyName.Height,
      (element: ContentElement) => {
        return Math.round(element.Height).toString();
      },
    ],
  ]);

  constructor() { }

  ngOnInit(): void {
    this.Properties.push(new Property(PropertyType.Text, PropertyName.Name, true, 10));
    this.Properties.push(new Property(PropertyType.Custom, PropertyName.Parent, false, 20));
    this.Properties.push(new Property(PropertyType.Text, PropertyName.OASISName, false, 30));
    this.Properties.push(new Property(PropertyType.Text, PropertyName.OASISLabel, false, 40));
    this.Properties.push(new Property(PropertyType.Boolean, PropertyName.Bold, false, 50));
    this.Properties.push(new Property(PropertyType.Text, PropertyName.Caption, false, 60));
    this.Properties.push(new Property(PropertyType.Custom, PropertyName.CarePlans, false, 70));
    this.Properties.push(new Property(PropertyType.Custom, PropertyName.Children, false, 80));
    this.Properties.push(new Property(PropertyType.Text, PropertyName.ClearAll, true, 90));
    this.Properties.push(new Property(PropertyType.Custom, PropertyName.ControlGroup, true, 100));
    this.Properties.push(new Property(PropertyType.Text, PropertyName.ControlType, true, 110));
    this.Properties.push(new Property(PropertyType.Boolean, PropertyName.DisableAll, false, 120));
    this.Properties.push(new Property(PropertyType.Number, PropertyName.Height, false, 130));
    this.Properties.push(new Property(PropertyType.Number, PropertyName.Left, false, 140));
    this.Properties.push(new Property(PropertyType.Text, PropertyName.OASISCode, false, 150));
    this.Properties.push(new Property(PropertyType.Custom, PropertyName.Rules, false, 160));
    this.Properties.push(new Property(PropertyType.Number, PropertyName.Top, false, 170));
    this.Properties.push(new Property(PropertyType.Number, PropertyName.Width, false, 180));
  }

  public ShowProperties (contentElement: ContentElement): void {
    this.Properties.forEach((property: Property) => {
      const valueSourceFunction = this.propertiesValueSources.get(property.Name);

      const value = valueSourceFunction?.call(contentElement, contentElement);
      property.Value = value ? value : '';
    });
    this.IsVisible = true;
  }

  public HideProperties(): void {
    this.Properties.forEach((property) => {
      property.Value = null;
    });
    this.IsVisible = false;
  }
}
