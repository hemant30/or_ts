namespace Origin.Component { 
    export class FolderItemController {
        item: Origin.Model.Folder;
        
    }
    
    export class FolderItem implements ng.IComponentOptions {
        bindings: any;
        controller: any;
        template: string;

        constructor() {
            this.bindings = {
                item: '<'
            };
            this.controller = FolderItemController;
            this.template = Origin.Template.FolderItemTemplate;
        }
    }
}