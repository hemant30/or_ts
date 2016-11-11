/// <reference path="../models/folder.model.ts" />
/// <reference path="./folder_item.component.tpl.ts" />

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

    Origin.Main.module.component('folderItem', new Origin.Component.FolderItem());
}