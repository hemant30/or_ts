namespace Origin.Workpaper {
    export class WorkpaperComponent {

    }

    export class Workpaper {
        bindings: any;
        controller: any;
        template: string;

        constructor() {
            this.bindings = {

            };
            this.controller = WorkpaperComponent;
            this.template = Origin.Workpaper.wptemplate;
        }
    }
}