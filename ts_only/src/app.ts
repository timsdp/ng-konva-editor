/// <reference path ="./controllers/interactjs-work-area-controller.ts"/>
/// <reference path ="./controllers/properties-area-controller.ts"/>
/// <reference path ="./editor.ts"/>


class App{
  public Editor: Editor;

  public Start()
  {
    this.Editor = new Editor();
    this.Editor.Initialize();
    console.log("app started");
  }
}