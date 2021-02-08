import { Component, OnInit } from '@angular/core';
import { PropertyName } from '../enums/property-name';
import { PropertyType } from '../enums/property-type';
import { Property } from '../models/property';


@Component({
  selector: 'app-editor-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  public Properties = new Array<Property>();
  displayedColumns: string[] = ['name', 'value'];
  constructor() { }

  ngOnInit(): void {
    this.Properties.push(new Property(PropertyType.Text, PropertyName.Caption));
    this.Properties.push(new Property(PropertyType.Boolean, PropertyName.Bold));
    this.Properties.push(new Property(PropertyType.Number, PropertyName.Left));
    this.Properties.push(new Property(PropertyType.Number, PropertyName.Top));
    this.Properties.push(new Property(PropertyType.Text, PropertyName.Name, true));
    this.Properties.push(new Property(PropertyType.Text, PropertyName.ElementType, true));
  }

}
