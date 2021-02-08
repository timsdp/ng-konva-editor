class ModalStateController {
    constructor(editor) {
        this.containerElementId = "modalState";
        this.bodyElementId = "modalStateBody";
        this.headerElementId = "modalStateHeader";
        this.buttonImportElementId = "btnStateModalImport";
        this.stateExamples = [
            `[
            {
                "Sizable": false,
                "X": 20,
                "Y": 60,
                "Type": 1,
                "ElementGroupIndex": 1,
                "ElementId": "label1",
                "NestedElementId": "controllabel1",
                "CaptionElementId": "controlCaptionlabel1",
                "Text": "Duis aute irure dolor in reprehenderit in",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 54,
                "Y": 86,
                "Checked": false,
                "Type": 0,
                "ElementGroupIndex": 1,
                "ElementId": "checkbox1",
                "NestedElementId": "controlcheckbox1",
                "CaptionElementId": "controlCaptioncheckbox1",
                "Text": "sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 52,
                "Y": 108,
                "Checked": false,
                "Type": 0,
                "ElementGroupIndex": 2,
                "ElementId": "checkbox2",
                "NestedElementId": "controlcheckbox2",
                "CaptionElementId": "controlCaptioncheckbox2",
                "Text": "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 52,
                "Y": 133,
                "Checked": false,
                "Type": 0,
                "ElementGroupIndex": 3,
                "ElementId": "checkbox3",
                "NestedElementId": "controlcheckbox3",
                "CaptionElementId": "controlCaptioncheckbox3",
                "Text": "sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 696,
                "Y": 156,
                "Checked": false,
                "Type": 0,
                "ElementGroupIndex": 4,
                "ElementId": "checkbox4",
                "NestedElementId": "controlcheckbox4",
                "CaptionElementId": "controlCaptioncheckbox4",
                "Text": "sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 673,
                "Y": 56,
                "Type": 1,
                "ElementGroupIndex": 2,
                "ElementId": "label2",
                "NestedElementId": "controllabel2",
                "CaptionElementId": "controlCaptionlabel2",
                "Text": "sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 696,
                "Y": 82,
                "Checked": false,
                "Type": 0,
                "ElementGroupIndex": 5,
                "ElementId": "checkbox5",
                "NestedElementId": "controlcheckbox5",
                "CaptionElementId": "controlCaptioncheckbox5",
                "Text": "Excepteur sint occaecat cupidatat non proident",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 697,
                "Y": 104,
                "Checked": false,
                "Type": 0,
                "ElementGroupIndex": 6,
                "ElementId": "checkbox6",
                "NestedElementId": "controlcheckbox6",
                "CaptionElementId": "controlCaptioncheckbox6",
                "Text": "Duis aute irure dolor in reprehenderit in",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 695,
                "Y": 131,
                "Checked": false,
                "Type": 0,
                "ElementGroupIndex": 7,
                "ElementId": "checkbox7",
                "NestedElementId": "controlcheckbox7",
                "CaptionElementId": "controlCaptioncheckbox7",
                "Text": "voluptate velit esse cillum dolore eu fugiat nulla pariatur",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 53,
                "Y": 156,
                "Checked": false,
                "Type": 0,
                "ElementGroupIndex": 8,
                "ElementId": "checkbox8",
                "NestedElementId": "controlcheckbox8",
                "CaptionElementId": "controlCaptioncheckbox8",
                "Text": "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 18,
                "Y": 207,
                "Type": 1,
                "ElementGroupIndex": 3,
                "ElementId": "label3",
                "NestedElementId": "controllabel3",
                "CaptionElementId": "controlCaptionlabel3",
                "Text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 18,
                "Y": 231,
                "Type": 1,
                "ElementGroupIndex": 4,
                "ElementId": "label4",
                "NestedElementId": "controllabel4",
                "CaptionElementId": "controlCaptionlabel4",
                "Text": "Duis aute irure dolor in reprehenderit in",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 19,
                "Y": 254,
                "Type": 1,
                "ElementGroupIndex": 5,
                "ElementId": "label5",
                "NestedElementId": "controllabel5",
                "CaptionElementId": "controlCaptionlabel5",
                "Text": "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 49,
                "Y": 279,
                "Checked": false,
                "Type": 0,
                "ElementGroupIndex": 9,
                "ElementId": "checkbox9",
                "NestedElementId": "controlcheckbox9",
                "CaptionElementId": "controlCaptioncheckbox9",
                "Text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 48,
                "Y": 301,
                "Checked": false,
                "Type": 0,
                "ElementGroupIndex": 10,
                "ElementId": "checkbox10",
                "NestedElementId": "controlcheckbox10",
                "CaptionElementId": "controlCaptioncheckbox10",
                "Text": "voluptate velit esse cillum dolore eu fugiat nulla pariatur",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 46,
                "Y": 322,
                "Checked": false,
                "Type": 0,
                "ElementGroupIndex": 11,
                "ElementId": "checkbox11",
                "NestedElementId": "controlcheckbox11",
                "CaptionElementId": "controlCaptioncheckbox11",
                "Text": "Duis aute irure dolor in reprehenderit in",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 45,
                "Y": 349,
                "Checked": false,
                "Type": 0,
                "ElementGroupIndex": 12,
                "ElementId": "checkbox12",
                "NestedElementId": "controlcheckbox12",
                "CaptionElementId": "controlCaptioncheckbox12",
                "Text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 46,
                "Y": 375,
                "Checked": false,
                "Type": 0,
                "ElementGroupIndex": 13,
                "ElementId": "checkbox13",
                "NestedElementId": "controlcheckbox13",
                "CaptionElementId": "controlCaptioncheckbox13",
                "Text": "voluptate velit esse cillum dolore eu fugiat nulla pariatur",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 21,
                "Y": 438,
                "Type": 1,
                "ElementGroupIndex": 6,
                "ElementId": "label6",
                "NestedElementId": "controllabel6",
                "CaptionElementId": "controlCaptionlabel6",
                "Text": "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 51,
                "Y": 460,
                "Checked": false,
                "Type": 0,
                "ElementGroupIndex": 14,
                "ElementId": "checkbox14",
                "NestedElementId": "controlcheckbox14",
                "CaptionElementId": "controlCaptioncheckbox14",
                "Text": "sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 51,
                "Y": 485,
                "Checked": false,
                "Type": 0,
                "ElementGroupIndex": 15,
                "ElementId": "checkbox15",
                "NestedElementId": "controlcheckbox15",
                "CaptionElementId": "controlCaptioncheckbox15",
                "Text": "sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 52,
                "Y": 511,
                "Checked": false,
                "Type": 0,
                "ElementGroupIndex": 16,
                "ElementId": "checkbox16",
                "NestedElementId": "controlcheckbox16",
                "CaptionElementId": "controlCaptioncheckbox16",
                "Text": "sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 51,
                "Y": 539,
                "Checked": false,
                "Type": 0,
                "ElementGroupIndex": 17,
                "ElementId": "checkbox17",
                "NestedElementId": "controlcheckbox17",
                "CaptionElementId": "controlCaptioncheckbox17",
                "Text": "voluptate velit esse cillum dolore eu fugiat nulla pariatur",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 23,
                "Y": 587,
                "Type": 1,
                "ElementGroupIndex": 7,
                "ElementId": "label7",
                "NestedElementId": "controllabel7",
                "CaptionElementId": "controlCaptionlabel7",
                "Text": "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 48,
                "Y": 576,
                "Checked": false,
                "Type": 0,
                "ElementGroupIndex": 18,
                "ElementId": "checkbox18",
                "NestedElementId": "controlcheckbox18",
                "CaptionElementId": "controlCaptioncheckbox18",
                "Text": "Excepteur sint occaecat cupidatat non proident",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 47,
                "Y": 577,
                "Checked": false,
                "Type": 0,
                "ElementGroupIndex": 19,
                "ElementId": "checkbox19",
                "NestedElementId": "controlcheckbox19",
                "CaptionElementId": "controlCaptioncheckbox19",
                "Text": "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
                "IsBold": false
            },
            {
                "Sizable": false,
                "X": 46,
                "Y": 601,
                "Checked": false,
                "Type": 0,
                "ElementGroupIndex": 20,
                "ElementId": "checkbox20",
                "NestedElementId": "controlcheckbox20",
                "CaptionElementId": "controlCaptioncheckbox20",
                "Text": "Excepteur sint occaecat cupidatat non proident",
                "IsBold": false
            }
        ]`
        ];
        this.editor = editor;
    }
    Initialize() {
        this.bindEvents();
    }
    bindEvents() {
        $(`#${this.buttonImportElementId}`).on("click", this, this.onImportButtonClick);
    }
    Show(caption, content) {
        $(`#${this.headerElementId}`).html(caption);
        $(`#${this.bodyElementId}`).html(content);
        $(`#${this.buttonImportElementId}`).hide();
        $(`#${this.containerElementId}`).modal('show');
    }
    ShowImport() {
        let json = this.stateExamples[0];
        this.Show("State import", json);
        $(`#${this.buttonImportElementId}`).show();
    }
    onImportButtonClick(event) {
        let inner = event.data;
        let json = $(`#${inner.bodyElementId}`).html();
        let model = JSON.parse(json);
        inner.editor.ImportWorkAreaFromModel(model);
        $(`#${inner.containerElementId}`).modal('hide');
    }
}
//# sourceMappingURL=modal-state-controller.js.map