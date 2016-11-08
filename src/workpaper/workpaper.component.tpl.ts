namespace Origin.Template { 
    export var WorkpaperTemplate = `
        this is workpaper

        <div class="splitter-group-wrapper">
            <div data-bento-splitter-group data-left-width="18%" data-is-left-collapsed="false" data-resizable="true"   data-event-tracking="" on-resize="trackEvent(eventName)">
                <aside data-bento-splitter-group-left style="overflow: hidden">
                    <div id="divleftmenu" style="width: 100%; padding-right: 10px; vertical-align: top" class="noselect">
                        <div ui-view="folderview" style="padding-right: 0px; position: absolute; top: 5px; left: 0px; right: 0px; height: 95%"></div>
                    </div>
                </aside>

                <section grid-container data-bento-splitter-group-main>
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
                                    <button class="btn btn-default btn-icon btn-toggle" ng-class="{active:wijmo.showfilter}" ng-click="wijmo.toggleFilter()"
                                        data-tooltip-placement="bottom" data-uib-tooltip="{{'ShowHideFilters' | translate}}"
                                        data-tooltip-append-to-body="true">
                                        <i class="bento-icon-filter-az"></i>
                                    </button>
                                </li>
                                <li class="" style="">
                                    <button class="btn btn-default btn-icon btn-toggle" ng-class="{active:!wijmo.hideGroupPanel}" ng-click="wijmo.toggleGroupPanel()"
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
                                        <li ng-repeat="item in wijmo.columnDefinitions" class="">
                                            <a ng-if="item.canHideColumn" ng-click="wijmo.toggleVisibility($index)">
                                                <i ng-class="wijmo.columnDefinitions[$index]['visible'] == true ? 'bento-icon-checkbox-filled' : 'bento-icon-checkbox'">

                                        </i>&nbsp;{{item.header | translate}}
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    `
}