/// <reference path ="./controllers/work-area-controller.ts"/>
/// <reference path ="./controllers/properties-area-controller.ts"/>
/// <reference path ="./editor.ts"/>
class App {
    Start() {
        this.Editor = new Editor();
        this.Editor.Initialize();
        console.log("app started");
    }
}
//# sourceMappingURL=app.js.map