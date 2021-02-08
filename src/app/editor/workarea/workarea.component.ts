import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'editor-workarea',
  templateUrl: './workarea.component.html',
  styleUrls: ['./workarea.component.css']
})

export class WorkareaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public AddNewControl(): void {
    console.log("new control");
  }
}
