namespace Origin.Template { 
    export var batchqueueTemplate: string = `
    
        <style type="text/css">
            @media (min-width: 768px) {
                .wp-batchqueue .navbar-right {
                    margin-right: 15px;
                }
        }
        </style>
        
        <div id="divrightcontent" class="view-batches wp-batchqueue" style="">
        <section>
            <div bento-nav-toolbar class="navbar navbar-default grid-toolbar" aria-controls="client-table-1">
                <ul class="nav navbar-nav">
                    <li has-permission="CreateEditRunBatchesCancelQueuedBatches">
                        <a ng-click="$ctrl.actions.createbatch()" href="">
                            <i class="bento-icon-batch"></i>&nbsp; &nbsp;<span data-translate="BatchCreate"></span>
                        </a>
                    </li>
                    
                </ul>
                <ul class="nav navbar-right btn-toolbar" role="group" style="">
                    <li class="" style="">
                        <button class="btn btn-default btn-icon btn-toggle" ng-class="{active:$ctrl.wijmo.showfilter}" ng-click="$ctrl.wijmo.toggleFilter()" data-tooltip-placement="bottom" data-uib-tooltip="{{'ShowHideFilters' | translate}}" data-tooltip-append-to-body="true">
                            <i class="bento-icon-filter-az"></i>
                        </button>
                    </li>
                    <li class="" style="">
                        <button class="btn btn-default btn-icon btn-toggle" ng-class="{active:!$ctrl.wijmo.hideGroupPanel}" ng-click="$ctrl.wijmo.toggleGroupPanel()" data-tooltip-placement="bottom" data-uib-tooltip="{{'ShowHideGroupPanel' | translate}}" data-tooltip-append-to-body="true">
                            <i class="bento-icon-tree"></i>
                        </button>
                    </li>
                    
                </ul>
            </div>
            <div>
                <wj-group-panel grid="batchqueueGrid" placeholder="{{'DragColumns' | translate}}" hide-grouped-columns="false" ng-if="!$ctrl.wijmo.hideGroupPanel">
                </wj-group-panel>
                <wj-flex-grid selection-mode="Row" control="batchqueueGrid" id="batchqueueGrid" item-formatter="itemFormatter" items-source="$ctrl.wijmo.source" child-items-path="workpapers" initialized="$ctrl.wijmo.initflexgrid(s,e)" headers-visibility="Column" class="bento-flex-grid bento-flex-grid-tree" sorted-column="$ctrl.wijmo.sortedcolumn()">
                    <wj-flex-grid-column header="" name="checkbox" binding="" min-width="40" width="40" align="left">
                        <wj-flex-grid-cell-template cell-type="Cell">
                            <input ng-if="$item.isbatchrow" style="" type="checkbox" ng-model="$item.selected" ng-click="$ctrl.addToManagedListArray($item)" ng-disabled="$item.status != 'Completed' || $item.status != 'Errored' || $item.status != 'Canceled'" />
                        </wj-flex-grid-cell-template>
                    </wj-flex-grid-column>
                    <wj-flex-grid-column header="{{ 'Names' | translate}}" binding="name" min-width="200" width="*" align="left" is-read-only="true">
                        <span ng-if="$item.isbatchrow" ng-click="$row.isCollapsed = !$row.isCollapsed">
                                <i ng-if="$item.workpapers && $item.workpapers.length > 0" class="tree group-icon bento-icon-arraow-right3" ng-class="{'bento-icon-arrow-down2':!$row.isCollapsed,'bento-icon-arrow-right3':$row.isCollapsed}"></i>
                                <span>{{$item.name}} </span>
                        <span ng-if="$item.batchtype && $item.batchtype.length > 0" style="font-style: italic; color: silver"> ({{ $item.workpapercount}} {{$item.batchtype}})</span>
                        <span ng-if="!$item.batchtype" style="font-style: italic; color: silver"> ({{ $item.workpapercount}})</span>
                        <span style="color: red; font-style: italic;" ng-if="$item.islocked">
                                    <i class="bento-icon-lock" style="color: red"></i>
                                    <span style="margin-left: 10px;"><span data-translate="LockedWorkpaper"></span></span>
                        </span>
                        </span>
                        <span ng-if="!$item.isbatchrow" class="tree-indent">
                            <span style="">{{$item.name}} </span>
                        <span style="font-style: italic;"> ({{$item.foldername}})</span>
                        </span>
                    </wj-flex-grid-column>
                    <wj-flex-grid-column data-type="date" format="MM/dd/yyyy hh:mm tt" header="{{ 'AddedToQueue' | translate}}" binding="created" min-width="270" width="270" align="left" is-read-only="true" required="false">
                        <wj-flex-grid-cell-template cell-type="Cell">
                            <span class="" ng-if="$item.isbatchrow">{{ $item.created | localDate}}</span>
                        </wj-flex-grid-cell-template>
                    </wj-flex-grid-column>
                    <wj-flex-grid-column data-type="date" format="MM/dd/yyyy hh:mm tt" header="{{ 'StartTime' | translate}}" binding="starttime" min-width="270" width="270" align="left" is-read-only="true" required="false">
                        <wj-flex-grid-cell-template cell-type="Cell">
                            <span class="" ng-if="$item.isbatchrow">{{ $item.starttime | localDate}}</span>
                        </wj-flex-grid-cell-template>
                    </wj-flex-grid-column>
                    <wj-flex-grid-column data-type="date" format="MM/dd/yyyy hh:mm tt" header="{{ 'EndTime' | translate}}" binding="endtime" min-width="270" width="270" align="left" is-read-only="true" required="false">
                        <wj-flex-grid-cell-template cell-type="Cell">
                            <span class="">{{ $item.endtime | localDate}}</span>
                        </wj-flex-grid-cell-template>
                    </wj-flex-grid-column>
                    <wj-flex-grid-column header="{{ 'Status' | translate}}" binding="status" min-width="270" width="270" align="left" is-read-only="true" required="false">
                        <div class="col-xs-12">
                            <div ng-if="$item.isbatchrow" batch-status={{$item.status}}></div>
                            <div class="pull-left" ng-if="!$item.isbatchrow" batch-workpaper-status={{$item.status}}></div>
                            <!-- <div class="pull-right" ng-if="!$item.isbatchrow && $item.status == 'Errored' && !$item.batchtype">
                                <i class="bento-icon-refresh"></i>
                                <button class="btn btn-link btn-xs" style="margin-left: 10px;" translate="Re-Run"></button>
                            </div> -->
                        </div>
                    </wj-flex-grid-column>
                </wj-flex-grid>
                <div data-bento-pagination data-page="$ctrl.wijmo.page" data-on-change="$ctrl.wijmo.onPageChanged(page)" data-direction-links="true" data-boundary-links="true" data-total-items="$ctrl.wijmo.totalItems" data-items-array="$ctrl.wijmo.selectItems" data-info-text="_START_ {{ 'To' | translate}} _END_ {{ 'Of' | translate}} _MAX_ {{ 'Entries' | translate}}" data-info-page-text="{{ 'Page' | translate}} _PAGE_ {{ 'Of' | translate}} _PAGES_" data-go-to-text="{{ 'Go' | translate}}" data-on-change-size="$ctrl.wijmo.onSelectChanged(size)" style="padding: 0 5px 0 5px" items-per-page="$ctrl.wijmo.numItems">
                </div>
        </section>
        </div>

    `
}