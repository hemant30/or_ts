/// <reference path="./folder.component.tpl.ts" />

namespace Origin.Component { 
    export class FolderController {
        test;

        constructor() { 
            console.log('folder controller loaded');
        }
     }

    export class Folder implements ng.IComponentOptions {
        bindings: any;
        controller: any;
        template: string;

        constructor() {
            this.bindings = {
                test: '<'
            };
            this.controller = FolderController;
            this.template = Origin.Template.FolderTemplate;
        }
    }
}