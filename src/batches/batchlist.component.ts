/// <reference path="./batchlist.component.tpl.ts" />
/// <reference path="../core/authorization.service.ts" />
/// <reference path="../models/batch.model.ts" />


namespace Origin.Component {
    export class BatchListController {
        canSeeWorkpapers: boolean;
        isAuthorize: boolean;
        page: number;
        wijmo: Origin.Core.Wijmo.Setup;
        columnDefinitions: Origin.Core.Wijmo.IColumnDefinition[];

        static $inject = ['AuthorizationService', 'BatchDataService'];        
        constructor(private authorizationService: Origin.Core.IAuthorizationService, private batchDataService: Origin.Model.IBatchDataService) { }

        $onInit = () => {
            this.columnDefinitions = [{
                'name': 'checkbox',
                'canHideColumn': false,
                'visible': true
            }, {
                'name': 'name',
                'canHideColumn': false,
                'visible': true
            }, {
                'name': 'created',
                header: 'WpGridHeaderLastModified',
                'canHideColumn': false,
                'visible': true
            }, {
                'name': 'createdby',
                header: 'WpGridHeaderLastModifiedBy',
                'canHideColumn': false,
                'visible': true
            }, {
                'name': 'lastprocessed',
                header: 'LastProcessed',
                'canHideColumn': false,
                'visible': true
            }, {
                'name': 'lastprocessedby',
                header: 'LastProcessedBy',
                'canHideColumn': false,
                'visible': true
            }];
            this.page = 1;
            this.wijmo = new Origin.Core.Wijmo.Setup(this.columnDefinitions);
            this.loadBatches(false);
        }

        private loadBatches = (hideBusyloader: boolean) => {
            let _self = this;
            this.authorizationService.hasPermission(Origin.Config.OriConstant.permissions.CAN_SEE_ACTIVE_WORKPAPER).then(function (res) {
                this.canSeeWorkpapers = true;
            }, function (res) {
                this.canSeeWorkpapers = false;
                });
            
            this.batchDataService.getAllList(hideBusyloader).then(function (res) {
                _self.wijmo.setGridData(res, null, 'created');
                _self.wijmo.page = 1;
             }, function (res) { })
            
        }

    }

    export class BatchList implements ng.IComponentOptions {
        bindings: any;
        controller: any;
        template: string;

        constructor() {
            this.bindings = {
                isAuthorize: '<'
            };
            this.controller = BatchListController;
            this.template = Origin.Template.batchListTemplate
        }
    }

    Origin.Main.module.component('batchList', new BatchList())
}