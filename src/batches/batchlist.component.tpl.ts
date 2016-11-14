namespace Origin.Template { 
    export var batchListTemplate: string = `
        <style type="text/css">
            @media (min-width: 768px) {
                .wp-batchlist .navbar-right {
                    margin-right: 15px;
                }
            }
        </style>
    
        <div id="divrightcontent" class="wp-batchlist">
            <section>
                <div class="justified noselect test-append-to-parent">
                    <div bento-nav-toolbar class="navbar navbar-default grid-toolbar" aria-controls="client-table-1">
                        <ul class="nav navbar-nav">
                            <li has-permission="CreateEditRunBatchesCancelQueuedBatches">
                                <a ng-click="$ctrl.actions.createbatch()" href="">
                                    <i class="bento-icon-batch"></i>&nbsp;<span data-translate="BatchCreate"></span>
                                </a>
                            </li>
                            <li has-permission="CreateEditRunBatchesCancelQueuedBatches" ng-class="{'disabled':$ctrl.wijmo.selectedUsersArray.length <= 0}">
                                <a ng-click="$ctrl.actions.runbatch()" ng-disabled="{{$ctrl.wijmo.selectedUsersArray.length <= 0}}" id="btnrunbatch">
                                    <i class="bento-icon-refresh"></i>&nbsp;<span data-translate="Run"></span>
                                </a>
                            </li>
                            <li has-permission="CreateEditRunBatchesCancelQueuedBatches" ng-class="{'disabled': $ctrl.wijmo.selectedUsersArray.length <= 0 || $ctrl.wijmo.selectedUsersArray.length > 1}">
                                <a ng-click="$ctrl.actions.edit()" id="btnedit" ng-disabled="{{$ctrl.wijmo.selectedUsersArray.length <= 0 || $ctrl.wijmo.selectedUsersArray.length > 1}}">
                                    <i class="bento-icon-edit"></i>&nbsp;<span data-translate="Edit"></span>
                                </a>
                            </li>
                            <li has-permission="DeleteSavedBatches" ng-class="{'disabled': $ctrl.wijmo.selectedUsersArray.length <= 0}">
                                <a ng-click="$ctrl.actions.deletebatch()" ng-disabled="{{$ctrl.wijmo.selectedUsersArray.length <= 0}}" id="btndelete">
                                    <i class="bento-icon-remove"></i>&nbsp;<span data-translate="Delete"></span>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav navbar-right btn-toolbar" role="group" style="">
                            <li class="" style="">
                                <button class="btn btn-default btn-icon btn-toggle" ng-class="{active: $ctrl.wijmo.showfilter}" ng-click="$ctrl.wijmo.toggleFilter()" data-tooltip-placement="bottom" data-uib-tooltip="{{'ShowHideFilters' | translate}}" data-tooltip-append-to-body="true">
                                    <i class="bento-icon-filter-az"></i>
                                </button>
                            </li>
                            <li class="" style="">
                                <button class="btn btn-default btn-icon btn-toggle" ng-class="{active:! $ctrl.wijmo.hideGroupPanel}" ng-click="$ctrl.wijmo.toggleGroupPanel()" data-tooltip-placement="bottom" data-uib-tooltip="{{'ShowHideGroupPanel' | translate}}" data-tooltip-append-to-body="true">
                                    <i class="bento-icon-tree"></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div style="">
                        <wj-group-panel grid="batchlistGrid" placeholder="{{'DragColumns' | translate}}" hide-grouped-columns="false" ng-if="!$ctrl.wijmo.hideGroupPanel">
                        </wj-group-panel>
                        <wj-flex-grid selection-mode="Row" control="batchlistGrid" id="batchlistGrid" item-formatter="itemFormatter" items-source="$ctrl.wijmo.source" child-items-path="workpapers" initialized="$ctrl.wijmo.initflexgrid(s,e)" headers-visibility="Column" class="bento-flex-grid bento-flex-grid-tree"
                            sorted-column="$ctrl.wijmo.sortedcolumn()">
                            <wj-flex-grid-column header="" name="checkbox" binding="" min-width="40" width="40" align="left">
                                <wj-flex-grid-cell-template cell-type="Cell">
                                    <input ng-if="$item.isbatchrow && !$item.isinprogress" style="" type="checkbox" ng-model="$item.selected" ng-click="$ctrl.addToManagedListArray($item)" />
                                    <span ng-if="!$item.isbatchrow && $item.islocked" style="">
                                        <i class="bento-icon-lock" style="color: red"></i>
                                    </span>
                                    <span ng-if="!$item.isbatchrow && $item.ischeckedout" style="">
                                        <i class="bento-icon-save-solid" style="color: red"></i>
                                    </span>
                                </wj-flex-grid-cell-template>
                            </wj-flex-grid-column>
                            <wj-flex-grid-column header="{{ 'Names' | translate}}" binding="name" min-width="200" width="*" align="left" is-read-only="true">
                                <span ng-if="$item.isbatchrow" ng-click="$row.isCollapsed = !$row.isCollapsed">
                                    <i ng-if="$item.workpapers && $item.workpapers.length > 0" class="tree group-icon bento-icon-arraow-right3" ng-class="{'bento-icon-arrow-down2':!$row.isCollapsed,'bento-icon-arrow-right3':$row.isCollapsed}"></i>
                                    <span>{{$item.name}} </span>
                                <span ng-if="$item.batchtype && $item.batchtype.length > 0" style="font-style: italic; color: silver"> ({{ $item.workpapercount}} {{$item.batchtype}})</span>
                                <span ng-if="!$item.batchtype" style="font-style: italic; color: silver"> ({{ $item.workpapercount}})</span>
                                <span style="color: red; font-style: italic;" ng-if="$item.islocked || $item.ischeckedout">
                                        <i class="bento-icon-warning" style="color: red"></i>
                                        <span style="margin-left: 10px;" translate="workpaperalert"></span>
                                </span>
                                </span>
                                <span ng-if="!$item.isbatchrow" class="tree-indent" style="margin-left: 30px;">
                                    <button ng-if="canSeeWorkpapers" class="btn btn-link btn-sm" ng-if="!$item.isdeleted" style="font-size: 15px;" ng-click="$ctrl.download($item)">
                                        <span style="">{{$item.name}} </span>
                                <span style="font-style: italic;"> ({{$item.foldername}})</span>
                                <span translate="checkedout" ng-if="$item.ischeckedout" style="color: red; font-style: italic;"></span>
                                <span translate="locked" ng-if="$item.islocked" style="color: red; font-style: italic;"></span>
                                </button>
                                <span ng-if="!$ctrl.canSeeWorkpapers">
                                    <span>{{$item.name}}</span>
                                <span style="font-style: italic;"> ({{$item.foldername}})</span>
                                <span translate="checkedout" ng-if="$item.ischeckedout" style="color: red; font-style: italic;"></span>
                                <span translate="locked" ng-if="$item.islocked" style="color: red; font-style: italic;"></span>
                                </span>
                                <span ng-if="$item.isdeleted" class="tree-indent">
                                        <span style="">{{$item.name}} (deleted)</span>
                                <span style="font-style: italic;"> ({{$item.foldername}})</span>
                                </span>
                                </span>
                            </wj-flex-grid-column>
                            <wj-flex-grid-column data-type="date" format="MM/dd/yyyy hh:mm tt" header="{{ 'Created' | translate}}" binding="created" min-width="270" width="270" align="left" is-read-only="true" required="false">
                                <wj-flex-grid-cell-template cell-type="Cell">
                                    <span ng-if="$item.isbatchrow" class="">{{ $item.created | localDate}}</span>
                                    <span ng-if="!$item.isbatchrow" class=""></span>
                                </wj-flex-grid-cell-template>
                            </wj-flex-grid-column>
                            <wj-flex-grid-column header="{{ 'CreatedBy' | translate}}" binding="createdby" min-width="270" width="270" align="left" is-read-only="true" required="false">
                                <wj-flex-grid-cell-template cell-type="Cell">
                                    <span ng-if="$item.isbatchrow" class="">{{ $item.createdby}}</span>
                                    <span ng-if="!$item.isbatchrow" class=""></span>
                                </wj-flex-grid-cell-template>
                            </wj-flex-grid-column>
                            <wj-flex-grid-column header="{{ 'LastProcessed' | translate}}" binding="lastmodified" data-type="date" format="MM/dd/yyyy hh:mm tt" min-width="270" width="270" align="left" is-read-only="true" required="false">
                                <wj-flex-grid-cell-template cell-type="Cell">
                                    <span ng-if="$item.isinprogress" class="" style="color: red"><span data-translate="InProgress"></span></span>
                                    <span ng-if="!$item.isinprogress && $item.lastmodified" class="">{{ $item.lastmodified | localDate}}</span>
                                    <span ng-if="!$item.isinprogress && !$item.lastmodified" class="">- - -</span>
                                </wj-flex-grid-cell-template>
                            </wj-flex-grid-column>
                            <wj-flex-grid-column header="{{ 'LastProcessedBy' | translate}}" binding="lastmodifiedby" min-width="270" width="270" align="left" is-read-only="true" required="false">
                                <span ng-if="!$item.lastmodifiedby" class=""></span>
                                <span ng-if="$item.lastmodifiedby" class="">{{$item.lastmodifiedby}}</span>
                            </wj-flex-grid-column>
                        </wj-flex-grid>
                        <div data-bento-pagination data-page="$ctrl.wijmo.page" data-on-change="$ctrl.wijmo.onPageChanged(page)" data-direction-links="true" data-boundary-links="true" data-total-items="$ctrl.wijmo.totalItems" data-items-array="$ctrl.wijmo.selectItems" data-info-text="_START_ {{ 'To' | translate}} _END_ {{ 'Of' | translate}} _MAX_ {{ 'Entries' | translate}}"
                            data-info-page-text="{{ 'Page' | translate}} _PAGE_ {{ 'Of' | translate}} _PAGES_" data-go-to-text="{{ 'Go' | translate}}" data-on-change-size="$ctrl.wijmo.onSelectChanged(size)" style="padding: 0 5px 0 5px" items-per-page="$ctrl.wijmo.numItems">
                        </div>
                    </div>
                </div>
            </section>
        </div>
    
    `
}