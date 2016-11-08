/// <reference path="./workpaper.component.tpl.ts" />

namespace Origin.Component {
    export class WorkpaperController {
        authorize: any;
        customattributes: any;

        constructor() {
        }

        $onChanges = (changes: any) => {
         }
    }

    export class Workpaper implements ng.IComponentOptions {
        bindings: any;
        controller: any;
        template: string;

        constructor() {
            this.bindings = {
                authorize: '<',
                customattributes: '<'
            };
            this.controller = WorkpaperController;
            this.template = Origin.Template.WorkpaperTemplate;
        }
    }
}