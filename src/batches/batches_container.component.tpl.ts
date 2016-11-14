namespace Origin.Template { 
    export var batchTemplate: string = `
    
        <div>
        <div class="bento-container" style="padding: 20px 0 0 5px; height: 72px;">
            <uib-tabset class="tabs-top" active="tabs.activetab">
                <uib-tab data-ng-click="$ctrl.batchlistClick()">
                    <uib-tab-heading>
                        {{'BatchList' | translate}}
                        <!-- <span class="badge">{{batchlistcount || 0}}</span> -->
                    </uib-tab-heading>
                </uib-tab>
                <uib-tab data-ng-click="$ctrl.batchqueueClick()">
                    <uib-tab-heading>
                        {{'BatchQueue' | translate}}
                        <!-- <span class="badge">{{batchqueuecount || 0}}</span> -->
                    </uib-tab-heading>
                </uib-tab>
                <uib-tab data-ng-click="$ctrl.batchhistoryClick()">
                    <uib-tab-heading>
                        {{'BatchHistory' | translate}}
                        <!-- <span class="badge">{{batchhistorycount || 0}}</span> -->
                    </uib-tab-heading>
                </uib-tab>
            </uib-tabset>
        </div>
        </div>
        <div ui-view="batchesview" style="margin-top: -7px;"></div>
    `
}