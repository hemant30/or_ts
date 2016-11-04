namespace Origin.Nav { 
    export class NavigationComponent { 
        static $inject = ['$injector'];

        isCMButtonVisible: boolean;
        selectedSubClient;
        constructor(private $injector) { 

        }

        showCMdialog() { 

        }

    }

    export class Navigation { 
        bindings: any;
        controller: any;
        template: string;

        constructor() {
            this.bindings = {

            };
            this.controller = NavigationComponent;
            this.template = Origin.Nav.navtemplate
        }
    }
}