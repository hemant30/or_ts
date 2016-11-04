namespace Origin { 
    export class AppComponentController { 
        static $inject = [];

        constructor() { 

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
            this.template = Origin.apptemplate;
        }
    }
}