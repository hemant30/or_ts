/// <reference path="./batchqueue.component.tpl.ts" />
/// <reference path="../core/wijmo_setup.ts" />

namespace Origin.Component {
    export class BatchQueueController {
        isAuthorize: boolean;
        wijmo: Origin.Core.Wijmo.Setup;
        page: number;

        static $inject = ['BatchDataService'];

        constructor(private batchDataService: Origin.Model.IBatchDataService) {

        };

        $onInit() {
            let columnDefinitions: Origin.Core.Wijmo.IColumnDefinition[] = [{
                'name': 'checkbox',
                'canHideColumn': false,
                'visible': true
            }, {
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
                'name': 'endtime',
                header: 'endtime',
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
            this.loadBatches(false);
        }

        private loadBatches = (hideLoader: boolean) => {
            let _self = this;
            this.batchDataService.getAllQueue(false).then(function (res) {
                _self.wijmo.setGridData(res, undefined, 'starttime');
                _self.wijmo.page = 1;
            }, function (res) {

            });
        };
    }

    export class BatchQueue implements ng.IComponentOptions {
        bindings: any;
        controller: any;
        template: string;

        constructor() {
            this.bindings = {
                isAuthorize: '<'
            };
            this.controller = BatchQueueController;
            this.template = Origin.Template.batchqueueTemplate
        }
    }

    Origin.Main.module.component('batchQueue', new BatchQueue())
}