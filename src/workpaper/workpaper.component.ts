namespace Origin.Component {
    export class WorkpaperController {
        authorize: any;
        customattributes: any;
        
        constructor() {
            console.log(this.authorize);
        }

        $onChanges = (changes: any) => {
            console.log(changes);
         }
    }

    export class Workpaper {
        bindings: any;
        controller: any;
        template: string;

        constructor() {
            this.bindings = {
                authorize: '<',
                customattributes: '<'
            };
            this.controller = WorkpaperController;
            this.template = Origin.Workpaper.wptemplate;
        }
    }
}