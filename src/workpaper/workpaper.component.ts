/// <reference path="./workpaper.component.tpl.ts" />
/// <reference path="../models/workpaper.model.ts" />
/// <reference path="../core/wijmo_setup.ts" />


namespace Origin.Component {
    export class WorkpaperController {
        static $inject = ['WorkpaperDataService'];
        authorize: any;
        customattributes: Origin.Core.Wijmo.IColumnDefinition;
        refreshtable;
        onsubscribe;
        columnDefinitions: Origin.Core.Wijmo.IColumnDefinition;
        page: number;
        wijmo: Origin.Core.WijmoSetup;
        private filtertext;

        constructor(private workpaperDataService: Origin.Model.IWorkpaperDataService) {
            this.onsubscribe({ 'a': this.getWorkpapers })
            this.columnDefinitions = this.customattributes;
            this.page = 1;
            this.wijmo = new Origin.Core.Wijmo.Setup(this.columnDefinitions)
            this.filtertext = { text: '', pageloaded: false;}
        }

        // $onInit() { 
        //     this.subscribe(this.getWorkpapers)
        // }

        getWorkpapers = (force?: boolean) => {
            let _self = this;
            let folderid: number;
            if (this.filtertext.pageloaded) {
                folderid = Origin.Model.Folder.SelectedFolder ? Origin.Model.Folder.SelectedFolder.id : -1
            }
            else {
                folderid = -1;
            }
            this.workpaperDataService.getAll(folderid, null, !force).then(function (res: Workpaper[]) {
                _self.wijmo.setGridData(res);
                _self.filtertext.pageloaded = true;
                _self.wijmo.page = 1;
                console.log();
            })
        }
    }

    export class Workpaper implements ng.IComponentOptions {
        bindings: any;
        controller: any;
        template: string;

        constructor() {
            this.bindings = {
                customattributes: '<',
                onsubscribe: '&subscribe'
            };
            this.controller = WorkpaperController;
            this.template = Origin.Template.WorkpaperTemplate;
        }
    }
}