namespace Origin.Component { 
    export class WorkpaperContainerController { 
        authorize: boolean;
        customattributes;
        refreshtable: string;
        callbacks: Function[];
        

        constructor() { 
            this.callbacks = [];
            
        }

        private publish(force? : boolean) { 
            angular.forEach(this.callbacks, function (c: Function) { 
                c(force);
            })
        }

        subscribe(callback: Function) { 
            if (callback) {
                this.callbacks.push(callback);
            }    
        }

        refreshTable(force? : boolean) { 
            this.publish(force);
        }
    }

    export class WorkpaperContainer implements ng.IComponentOptions {
        bindings: any;
        controller: any;
        template: string;

        constructor() {
            this.bindings = {
                authorize: '<',
                customattributes: '<'
            };
            this.controller = WorkpaperContainerController;
            this.template = Origin.Template.WorkpaperContainerTemplate;
        }
    }
}