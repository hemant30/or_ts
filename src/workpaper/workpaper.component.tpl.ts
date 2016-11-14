namespace Origin.Template { 
    export var WorkpaperTemplate = `
        
        <div id="divrightcontent" style="" class="justified noselect test-append-to-parent">
            <div bento-nav-toolbar class="navbar navbar-default bento-toolbar" more-button-label="More" aria-controls="client-table-1">
                <ul class="nav navbar-nav">
                    <li>
                        <a class="btn btn-link" style="cursor: default; font-style: normal;">{{wijmo.selectedUsersArray.length}}  <span data-translate="Selected"></span></a>
                    </li>
                    <li has-permission="CreateAndUploadNewWorkpapers">
                        <a ng-click="actions.add()">
                            <i class="bento-icon-add" analytics-on="click" analytics-product="Workpapers" analytics-category="Add" analytics-label="Add Workpaper"></i>
                            <span data-translate="WorkpaperAdd"></span>
                        </a>
                    </li>
                    <li>
                        <a ng-click="actions.addattachments()">
                            <i class="bento-icon-add" analytics-on="click" analytics-product="Workpapers" analytics-category="Add" analytics-label="Add Attachment"></i>
                            <span data-translate="AddAttachment"></span>
                        </a>
                    </li>
                    <li ng-class="{'disabled':isGroupDisabled()}">
                        <a ng-click="actions.group()" id="btnGroup" ng-disabled="isGroupDisabled()">
                            <i class="bento-icon-folder-plus" analytics-on="click" analytics-product="Workpapers" analytics-category="Move to folder"
                                analytics-label="Move to folder"></i>
                            <span data-translate="FolderAddTo"></span>
                        </a>
                    </li>
                    <li has-permission="DeleteWorkpapers" ng-class="{'disabled':wijmo.selectedUsersArray.length <= 0}">
                        <a ng-click="actions.delete()" id="btnDelete" ng-disabled="wijmo.selectedUsersArray.length <= 0">
                            <i class="bento-icon-remove" analytics-on="click" analytics-product="Workpapers" analytics-category="Delete" analytics-label="Delete"></i>
                            <span data-translate="Delete"></span>
                        </a>
                    </li>
                </ul>
                <ul class="nav navbar-right" role="group" style="">
                    <li class="" style="">
                        <button class="btn btn-default btn-icon btn-toggle" ng-class="{active:$ctrl.wijmo.showfilter}" ng-click="$ctrl.wijmo.toggleFilter()"
                            data-tooltip-placement="bottom" data-uib-tooltip="{{'ShowHideFilters' | translate}}"
                            data-tooltip-append-to-body="true">
                            <i class="bento-icon-filter-az"></i>
                        </button>
                    </li>
                    <li class="" style="">
                        <button class="btn btn-default btn-icon btn-toggle" ng-class="{active:!$ctrl.wijmo.hideGroupPanel}" ng-click="$ctrl.wijmo.toggleGroupPanel()"
                            data-tooltip-placement="bottom" data-uib-tooltip="{{'ShowHideGroupPanel' | translate}}"
                            data-tooltip-append-to-body="true">
                            <i class="bento-icon-tree"></i>
                        </button>
                    </li>
                    <li class="dropdown" role="group" uib-dropdown ng-click="$event.stopPropagation()" style="" is-open="isWpCogOpen">
                        <button class="btn btn-default btn-icon dropdown-toggle" uib-dropdown-toggle data-tooltip-placement="bottom" data-uib-tooltip="{{'ShowHideColumns' | translate}}">
                            <i class="bento-icon-cog"></i>
                            <i class="bento-icon-arrow-down2"></i>
                        </button>
                        <ul class="dropdown-menu megamenu pull-right">
                            <li ng-repeat="item in $ctrl.wijmo.columnDefinitions" class="">
                                <a ng-if="item.canHideColumn" ng-click="$ctrl.wijmo.toggleVisibility($index)">
                                    <i ng-class="$ctrl.wijmo.columnDefinitions[$index]['visible'] == true ? 'bento-icon-checkbox-filled' : 'bento-icon-checkbox'">

                            </i>&nbsp;{{item.header | translate}}
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            

            <div style="position: static">
                            <div data-ng-show="1 === 2" id="infopopover" data-clickoninfopopup="infopopup.showpopover" style="" class="wp-notes-info-popup">
                                <div style="background-color: linen; height: 35px; padding: 7px 15px 5px 15px;">
                                    <div style="float: left">
                                        <span class="bento-icon-info"></span><span style="margin-left: 10px; font-weight: bold">Information</span>
                                    </div>
                                    <div id="closeinfopopover" style="cursor: pointer; float: right; font-weight: bold" data-ng-click="actions.closepopover()">X</div>
                                </div>
                                <div style="padding: 10px;">
                                    <div style="border-bottom: 1px solid #ccc; line-height: 30px;" class="row col-xs-12">
                                        <span style="font-weight: bold;text-overflow: ellipsis;overflow: hidden;display: inline-block;width: 140px;white-space: nowrap;"
                                            class="pull-left;">
                                            {{selectedworkpaper.name}}
                                        </span>
                                        <span style="text-overflow: ellipsis;overflow: hidden;display: inline-block;width: 100px;white-space: nowrap;text-align: right;"
                                            class="pull-right">{{selectedworkpaper.foldername}}</span>
                                    </div>
                                    <div style="margin-top: 10px" class="row col-xs-12">
                                        <div>
                                            <span class="bento-icon-file"></span><span style="margin-left: 10px;" data-translate="Notes"></span>
                                        </div>
                                        <div ng-if="selectedworkpaper.notes && selectedworkpaper.notes.length > 0">
                                            <ul style="padding-left: 25px; font-size: 10pt">
                                                <li data-ng-repeat="note in selectedworkpaper.notes" style="list-style-type: none; padding: 0; margin: 0; line-height: 28px; float: left; clear: both; width: 100%">
                                                    <div style="font-size: 1.1em;" class="col-xs-12 row">
                                                        <i has-permission="AddUpdateDeleteWorkpaperNotes" class="bento-icon-close-circle" style="cursor: pointer; " ng-click="actions.deletenote(note)"></i>
                                                        <a id="editnotepopover" data-ng-click="actions.editnote($item, $row, dp, note)" style="cursor: pointer; margin-left: 5px;">
                                                {{note.name | limitTo : 20}}{{note.name.length > 20? '...' : ''}}
                                            </a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div ng-if="!selectedworkpaper.notes || selectedworkpaper.notes.length <=0">
                                            <span translate="nonotesadded"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <wj-group-panel grid="workpaperGrid" placeholder="{{'DragColumns' | translate}}" hide-grouped-columns="false" ng-if="!$ctrl.wijmo.hideGroupPanel">
                            </wj-group-panel>
                            <wj-flex-grid defer-resizing="true" sticky-header="true" selection-mode="Row" control="workpaperGrid" id="wpGrid" item-formatter="formatcell"
                                items-source="$ctrl.wijmo.source" child-items-path="fileversions" initialized="$ctrl.wijmo.initflexgrid(s,e)"
                                headers-visibility="Column" frozen-columns="6" class="bento-flex-grid bento-flex-grid-tree" sorted-column="$ctrl.wijmo.sortedcolumn()"
                                style="height:550px;">
                                <wj-flex-grid-column header="" binding="" allow-dragging=false allow-sorting=false min-width="40" width="40" align="left"
                                    is-read-only="true">
                                    <wj-flex-grid-cell-template cell-type="Cell">
                                        <span ng-if="!$item.iscapturedversion">
                                            <input style="" type="checkbox" ng-model="$item.selected" bindings="id" ng-if="$item.ischeckedout || $item.islocked" disabled="disabled" />
                                            <input style="" type="checkbox" ng-model="$item.selected" ng-click="$ctrl.actions.addToWorkpapersArray($item)" bindings="id" ng-if="!$item.islocked && !$item.ischeckedout" />
                                        </span>
                                    </wj-flex-grid-cell-template>
                                </wj-flex-grid-column>
                                <wj-flex-grid-column header="{{ 'WpGridHeaderActions' | translate}}" binding="" min-width="80" width="80" align="left" is-read-only="true"
                                    allow-dragging=false allow-sorting=false>
                                    <wj-flex-grid-cell-template cell-type="Cell">
                                        <span ng-if="!$item.iscapturedversion">
                                            <span ng-if="!$item.islocked && !$item.ischeckedout">
                                                <span has-permission="EditWorkpaperAttributes" class="bento-icon-edit" ng-click="$ctrl.actions.editWorkpaper($item)" data-uib-tooltip="{{'EditWorkpaper' | translate}}" data-tooltip-trigger="mouseenter" style="cursor: pointer;" tooltip-append-to-body="true"></span>
                                        </span>
                                        <span ng-if="$item.islocked || $item.ischeckedout">
                                                <span has-permission="EditWorkpaperAttributes" class="bento-icon-edit" style="color: silver"></span>
                                        </span>
                                        <span has-permission="AddUpdateDeleteWorkpaperNotes" class="bento-icon-file" ng-click="$ctrl.actions.newNote($item, $row, dp)"
                                            data-uib-tooltip="{{'AddNote' | translate}}" data-tooltip-trigger="mouseenter" tooltip-append-to-body="true"
                                            style="margin-left: 5px; cursor: pointer;"></span>
                                        </span>
                                    </wj-flex-grid-cell-template>
                                </wj-flex-grid-column>
                                <wj-flex-grid-column header="" allow-dragging=false allow-sorting=false binding="" min-width="60" width="60" align="left"
                                    is-read-only="true">
                                    <wj-flex-grid-cell-template cell-type="Cell">
                                        <span ng-if="!$item.iscapturedversion">
                                            <span has-permission="ViewWorkpaperNotes" class="bento-icon-info" ng-click="$ctrl.actions.showInfo($item, $row, dp)" ng-class="{active: dp.isDetailVisible($row)}" tooltip-append-to-body="true" style="cursor: pointer;"></span>
                                        </span>
                                    </wj-flex-grid-cell-template>
                                </wj-flex-grid-column>
                                <wj-flex-grid-column header="{{'access' | translate}}" allow-sorting=false allow-dragging=false binding="" min-width="60"
                                    width="75" align="left" is-read-only="true">
                                    <wj-flex-grid-cell-template cell-type="Cell">
                                        <wpdropdownmenu workpaper="$item" update="$ctrl.updateWorkpaperRow(a)"></wpdropdownmenu>
                                        <!--<div wpdropdownmenu wp="$item" type="{{'workpaper'}}" update="$ctrl.updateWorkpaperRow" style=""></div>-->
                                    </wj-flex-grid-cell-template>
                                </wj-flex-grid-column>
                                <wj-flex-grid-column header="{{ 'WpGridHeaderWpName' | translate}}" binding="name" min-width="200" width="300" align="left"
                                    is-read-only="true" allow-dragging=false>
                                    <wj-flex-grid-cell-template cell-type="Cell">
                                        <span ng-if="$item.hascapturedversions">
                                            <span ng-click="$ctrl.actions.showfileversion($row,dp)">
                                                <i style="margin-right: 0px;" class="tree group-icon bento-icon-arraow-right3" ng-class="{'bento-icon-arrow-down2':!$row.isCollapsed,'bento-icon-arrow-right3':$row.isCollapsed}"></i>
                                            </span>
                                        <button style="padding-left: 0px;" class="btn btn-link btn-sm show-whitespaces" data-uib-tooltip="{{'DownloadToolTip' | translate}}"
                                            ng-click="$ctrl.actions.downloadFile($item)" data-tooltip-trigger="mouseenter" tooltip-append-to-body="true"
                                            analytics-on="click" analytics-product="Workpapers" analytics-category="Workpaper Link"
                                            analytics-label="Download workpaper">{{$item.name }}</button>
                                        </span>
                                        <span ng-if="$item.iscapturedversion" class="tree-indent">
                                            <button style="padding-left: 0px;" class="btn btn-link btn-sm show-whitespaces" data-uib-tooltip="{{'DownloadToolTip' | translate}}" ng-click="$ctrl.actions.downloadFileVersion($item)" data-tooltip-trigger="mouseenter" tooltip-append-to-body="true" analytics-on="click" analytics-product="Workpapers" analytics-category="Workpaper Link" analytics-label="Download workpaper">{{$item.workpapername}}<i> (Version)</i></button>
                                        </span>
                                        <span ng-if="!$item.hascapturedversions && !$item.iscapturedversion">
                                            <button class="btn btn-link btn-sm show-whitespaces" data-uib-tooltip="{{'DownloadToolTip' | translate}}" ng-click="actions.downloadFile($item)" data-tooltip-trigger="mouseenter" tooltip-append-to-body="true" analytics-on="click" analytics-product="Workpapers" analytics-category="Workpaper Link" analytics-label="Download workpaper">{{$item.name }}</button>
                                        </span>
                                    </wj-flex-grid-cell-template>
                                </wj-flex-grid-column>
                                <wj-flex-grid-column header="{{'FolderNameColumn' | translate }}" binding="foldername" min-width="275" width="275" align="left"
                                    is-read-only="true" allow-dragging="false">
                                    <wj-flex-grid-cell-template cell-type="Cell">
                                        <span class="show-whitespaces">{{$item.foldername}}</span>
                                    </wj-flex-grid-cell-template>
                                </wj-flex-grid-column>
                                <wj-flex-grid-column data-type="date" format="MM/dd/yyyy hh:mm tt" header="{{ 'WpGridHeaderLastModified' | translate}}" binding="lastmodified"
                                    min-width="170" width="*" align="left" visible="{{$ctrl.wijmo.columnDefinitions[6]['visible']}}"
                                    is-read-only="true">
                                    <wj-flex-grid-cell-template cell-type="Cell">
                                        <span class="" ng-if="!$item.iscapturedversion && $item.ischeckedout" style="color: red">{{ 'checkedout' | translate}}</span>
                                        <span class="" ng-if="$item.iscapturedversion || !$item.ischeckedout " data-tooltip-placement="bottom" data-uib-tooltip="{{ $item.lastmodified | actualDate}}"
                                            data-tooltip-append-to-body="true">{{ $item.lastmodified | actualDate }}</span>
                                    </wj-flex-grid-cell-template>
                                </wj-flex-grid-column>
                                <wj-flex-grid-column header="{{ 'WpGridHeaderLastModifiedBy' | translate}}" binding="lastmodifiedby" min-width="170" width="*"
                                    align="left" visible="{{$ctrl.wijmo.columnDefinitions[7]['visible']}}" is-read-only="true">
                                    <wj-flex-grid-cell-template cell-type="Cell">
                                        <span class="" ng-if="!$item.iscapturedversion && $item.ischeckedout" style="color: red">{{ $item.checkedoutby }}</span>
                                        <span class="" ng-if="$item.iscapturedversion || !$item.ischeckedout">{{ $item.lastmodifiedby }}</span>
                                    </wj-flex-grid-cell-template>
                                </wj-flex-grid-column>
                                <wj-flex-grid-column ng-repeat="cols in $ctrl.columnDefinitions | filter : {iscusomattributes : 'true'}" header="{{cols.name}}"
                                    binding="attributes[{{$index}}].value" is-read-only="true" width="*" min-width="150" visible="{{$ctrl.wijmo.columnDefinitions[8 + $index]['visible']}}">
                                    <wj-flex-grid-cell-template cell-type="Cell">
                                        <span>{{$item.attributes[$index].value}}</span>
                                    </wj-flex-grid-cell-template>
                                </wj-flex-grid-column>
                                <wj-flex-grid-detail detail-visibility-mode="Code" control="dp">
                                    <workpaper-detail workpaper="selectedworkpaper" row="$row" dp="dp" ednote="$ctrl.actions.editnote(a,b,c,d)" delnote="$ctrl.actions.deletenote(a,b,c,d)"
                                        delattachment="$ctrl.deleteattachment(a,b,c,d)" dldattachment="$ctrl.downloadattachment(d)"></workpaper-detail>
                                </wj-flex-grid-detail>
                            </wj-flex-grid>
                            <div data-bento-pagination data-page="$ctrl.wijmo.page" data-on-change="$ctrl.wijmo.onPageChanged(page)" data-direction-links="true"
                                data-boundary-links="true" data-total-items="$ctrl.wijmo.totalItems" data-items-array="$ctrl.wijmo.selectItems"
                                data-info-text="_START_ {{ 'To' | translate}} _END_ {{ 'Of' | translate}} _MAX_ {{ 'Entries' | translate}}"
                                data-info-page-text="{{ 'Page' | translate}} _PAGE_ {{ 'Of' | translate}} _PAGES_" data-go-to-text="{{ 'Go' | translate}}"
                                data-on-change-size="$ctrl.wijmo.onSelectChanged(size)" style="padding: 0 5px 0 5px" items-per-page="$ctrl.wijmo.numItems">
                            </div>
                        </div>


        </div>
               
    `
}