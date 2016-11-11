/// <reference path="./folder.component.tpl.ts" />
/// <reference path="../models/folder.model.ts" />
/// <reference path="../core/authorization.service.ts" />
/// <reference path="../config/constants.ts" />
/// <reference path="../main.ts" />


namespace Origin.Component {
    export class FolderController {

        static $inject = ['FolderDataService', 'AuthorizationService', '$q']

        canedit: boolean;
        candelete: boolean;
        folderList;
        authorize;
        refreshtable: Function;
        canchangeeditdelete: boolean;
        showEditDelete: boolean;
        fold

        constructor(private folderDataService: Origin.Model.IFolderDataService, private authorizationService: Origin.Core.IAuthorizationService, private $q: ng.IQService) {
            this.folderList = () => {
                
                return Origin.Model.Folder.List;
            }
            this.showEditDelete = false;
            //this.caneditdelete();
        }

        // private caneditdelete(item: Origin.Model.Folder) {
        //     item.canShowEditDelete = this.canedit || this.candelete;
        // };

        private selectedItemChanged(item) {
            Origin.Model.Folder.MarkSelectedFolder(item);
            this.getFolders(false);
            //broadcastService.originRefreshWPTable(false);
        };

        $onInit = () => {
            let _self = this;
            this.folderDataService.subscribe(this.refreshFolders);
            let editFolderPromise = this.authorizationService.hasPermission(Origin.Config.OriConstant.permissions.CAN_EDIT_FOLDER);
            let deleteFolderPromise = this.authorizationService.hasPermission(Origin.Config.OriConstant.permissions.CAN_DELETE_FOLDER);
            let promises = [editFolderPromise, deleteFolderPromise];

            let suppress = (x) => {
                return x.catch(function () { });
            };
            this.$q.all(promises.map(suppress)).then(function (res: any) {
                _self.canedit = res[0];
                _self.candelete = res[1];
                //_self.caneditdelete();
                _self.getFolders(true);
            });
        }

        getFolders(force? : boolean) {
            this.refreshtable({ 'a' : force});
        }

        private refreshFolders() {
            this.folderList = Origin.Model.Folder.List;
        }
    }

    export class Folder implements ng.IComponentOptions {
        bindings: any;
        controller: any;
        template: string;

        constructor() {
            this.bindings = {
                'refreshtable': '&onrefreshtable'
            };
            this.controller = FolderController;
            this.template = Origin.Template.FolderTemplate;
        }
    }

    Origin.Main.module.component('folder', new Origin.Component.Folder());
}