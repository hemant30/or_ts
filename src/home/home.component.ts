/// <reference path="./home.component.tpl.ts" />


namespace Origin.Home {

    export class HomeController {
        static $inject = ['HttpService', 'UserDataService'];

        constructor(private httpService: Origin.Core.IHttpService, private userDataService: Origin.Model.UserDataService) { }        

        downloadExcelAddin() {
            this.httpService.DownloadFile('support/downloadaddin');
        }

        $onDestroy() { 
            this.userDataService.LogOffCurrentUser();
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