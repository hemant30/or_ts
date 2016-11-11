/// <reference path="../config/env.config.ts" />
/// <reference path="../core/alert.service.ts" />
/// <reference path="../main.ts" />
/// <reference path="./app.component.tpl.ts" />
/// <reference path="../config/env.config.ts" />
/// <reference path="../core/alert.service.ts" />



namespace Origin {
    export class AppComponentController {
        static $inject = ['ENV', 'AlertService'];

        origin: any;
        isLoneStarRunning: boolean;
        constructor(private env: Origin.Config.IEnv, private alertService: Origin.Core.AlertService) {
            this.isLoneStarRunning = this.env.isLoneStarRunning;

            this.origin = {
                alerts: []
            }
            this.alertService.originAlerts = this.origin.alerts;
        }

    }

    export class App implements ng.IComponentOptions {
        bindings: any;
        controller: any;
        template: string;

        constructor() {
            this.bindings = {

            };
            this.controller = AppComponentController;
            this.template = Origin.Template.apptemplate;
        }
    }

    Origin.Main.module.component('originapp', new Origin.App())
}