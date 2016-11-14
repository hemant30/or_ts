/// <reference path="./batches_container.component.tpl.ts" />


namespace Origin.Component {
    export class BatchContainerController {
        static $inject = ['$state'];

        isAuthorize: boolean;

        constructor(private $state: ng.ui.IStateService) { }

        batchlistClick() {
            this.$state.go('wp.batches.list');
        }

        batchqueueClick() {
            this.$state.go('wp.batches.queue');
        }

        batchhistoryClick() {
            this.$state.go('wp.batches.history');
        }

    }

    export class BatchContainer implements ng.IComponentOptions {
        bindings: any;
        controller: any;
        template: string;

        constructor() {
            this.bindings = {
                isAuthorize: '<'
            };
            this.controller = BatchContainerController;
            this.template = Origin.Template.batchTemplate;
        }
    }

    Origin.Main.module.component('batchContainer', new BatchContainer())
}