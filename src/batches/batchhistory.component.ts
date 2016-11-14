/// <reference path="./batchhistory.component.tpl.ts" />
/// <reference path="../main.ts" />
/// <reference path="../core/wijmo_setup.ts" />

namespace Origin.Component {
    export class BatchHistoryController {

        static $inject = ['BatchDataService'];

        page: number;
        wijmo: Origin.Core.Wijmo.Setup;

        constructor(private batchDataService: Origin.Model.IBatchDataService) {

        }

        $onInit() {
            let columnDefinitions: Origin.Core.Wijmo.IColumnDefinition[] = [{
                'name': 'name',
                'canHideColumn': false,
                'visible': true
            }, {
                'name': 'created',
                header: 'Created',
                'canHideColumn': false,
                'visible': true
            }, {
                'name': 'starttime',
                header: 'starttime',
                'canHideColumn': false,
                'visible': true
            }, {
                'name': 'status',
                header: 'status',
                'canHideColumn': false,
                'visible': true
            }];
            this.page = 1;
            this.wijmo = new Origin.Core.Wijmo.Setup(columnDefinitions);
            this.loadBatchesHistory();
        }

        private loadBatchesHistory = () => {
            let _self = this;
            this.batchDataService.getAllHistory().then(function (res) {
                _self.wijmo.setGridData(res, undefined, 'endtime');
                _self.wijmo.page = 1;
            }, function (res) {

            });
        }

    }

    export class BatchHistory implements ng.IComponentOptions {
        bindings: any;
        controller: any;
        template: string;

        constructor() {
            this.bindings = {
                isAuthorize: '<'
            };
            this.controller = BatchHistoryController;
            this.template = Origin.Template.batchhistoryTemplate
        }
    }

    Origin.Main.module.component('batchHistory', new BatchHistory())
}