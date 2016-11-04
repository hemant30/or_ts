/// <reference path="./home.component.tpl.ts" />


namespace Origin.Home {

    export class HomeController {

        downloadExcelAddin() {

        }
    }

    export class Home implements ng.IComponentOptions {
        bindings: any;
        controller: any;
        template: string;

        constructor() {
            this.bindings = {

            };
            this.controller = HomeController;
            this.template = Origin.Home.hometemplate
        }
    }
}