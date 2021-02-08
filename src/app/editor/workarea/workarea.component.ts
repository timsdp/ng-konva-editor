import { Component, Input, OnInit } from '@angular/core';
import Konva from "konva";

@Component({
  selector: 'app-editor-workarea',
  templateUrl: './workarea.component.html',
  styleUrls: ['./workarea.component.css']
})

export class WorkareaComponent implements OnInit {
  private stageElementId: string = "divWorkAreaCanvas";
  private currentStage: any;
  constructor() { }

  ngOnInit(): void {
    this.currentStage = new Konva.Stage({
      container: this.stageElementId,
      width: window.innerWidth,
      height: window.innerHeight
    });
  }
  public AddNewControl(): void {
    console.log('new control in work area');
  }
}
