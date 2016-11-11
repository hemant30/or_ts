namespace Origin.Template {
    export var FolderTemplate: string =
        `
        <style>
            .wp-folder-list-item {
                display: inline-block;
                width: calc(100% - 56px);
                /* width: ~"calc(100% - 55px)"; */
                ;
            }

            .wp-folder-list-item-icon {
                display: inline-block;
                margin-right: 15px;
                top: -4px;
            }

            .wp-folder-list-item-name {
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                width: calc(100% - 30px);
                white-space: nowrap;
                /* width: ~"calc(100% - 30px)"; */
                ;
            }
        </style>
        <div class="row" style="padding: 0 25px 0 2px;">
            <div style="padding:  0 12px; float: left">
                <label style="text-transform: uppercase; height: 100%; font-size: 16pt" data-translate="Folders"></label>
                <!--<div class="glyphicon glyphicon-folder-close" style="width: 25px; height: 25px; float: right; cursor: pointer; font-size: 22px;" ng-click="c$ctrl.reatefolder()"></div>-->
            </div>
            <div has-permission='CreateNewFoldersActiveWorkpapers'>
                <div style="margin: 0 0 15px 0;" class="pull-right">
                    <button class="btn btn-primary btn-sm" style="" ng-click="$ctrl.createfolder()" data-translate="NewFolder" analytics-on="click" analytics-product="Workpapers" analytics-category="Folders" analytics-label="New Folder"></button>
                </div>
            </div>
        </div>
        <div style="position: relative" ng-if="1 === 2">
            <i class="bento-icon-search" style="position: absolute; padding: 22px 12px; pointer-events: none; color: #bbb"> </i>
            <input placeholder="{{ 'SearchFolders' | translate }}" style="width: 100%; padding-left: 30px; height: 35px;" readonly="readonly" />
        </div>
        <ul class="list-group" style="overflow: auto; border-left-width: 0px; border-right-width: 0px; height: 95%">
            <li ng-if="item.id < 0" id="{{item.id}}" ng-repeat="item in $ctrl.folderList()" class="list-group-item" style="cursor: pointer; padding-right: 3px; color: black" ng-class="{'active' : item.selected === true}" ng-click="$ctrl.selectedItemChanged(item)" data-orgn-drop data-folder="{{item.id}}">
                <div class="wp-folder-list-item">
                    <span class="bento-icon-bullet-list wp-folder-list-item-icon"></span><span class="wp-folder-list-item-name">{{item.name}}</span>
                </div>
                <div style="float: right; width: 40px; text-align: center">
                    <span style="" class="badge">{{item.workpapercount}}</span>
                </div>
            </li>
            <li ng-if="item.id > 0" id="{{item.id}}" 
                ng-repeat="item in $ctrl.folderList()" 
                class="list-group-item" style="cursor: pointer; padding-right: 3px; color: black; height: 42px;" 
                ng-class="{'active' : item.selected === true}" 
                ng-click="$ctrl.selectedItemChanged(item)" 
                ng-mouseenter="item.canShowEditDelete  =(($ctrl.canedit || $ctrl.candelete) * true)" 
                ng-mouseleave="item.canShowEditDelete  = (($ctrl.canedit || $ctrl.candelete) * false)" 
                data-orgn-drop data-folder="{{item.id}}">
                    <div class="pull-right" style="width: 40px; text-align: center" ng-click="$ctrl.doNothing($event)">
                        <span style="" class="badge" ng-show="!item.canShowEditDelete">{{item.workpapercount}}</span>
                        <div has-permission="EditFoldersActiveWorkpapers" class="pull-left">
                            <span class="bento-icon-edit" ng-show="item.canShowEditDelete" ng-click="$ctrl.editFolder(item)"></span>
                        </div>
                        <div has-permission="DeleteFoldersActiveWorkpapers" class="pull-right">
                            <span class="bento-icon-remove" ng-show="item.canShowEditDelete" style="margin-left: 5px;" ng-click="$ctrl.deleteFolder(item)"></span>
                        </div>
                    </div>
                    <div class="wp-folder-list-item">
                        <span class="wp-folder-list-item-icon" ng-class="{'bento-icon-folder-open' : item.selected  , 'bento-icon-folder' : !item.selected }"></span><span class="show-whitespaces wp-folder-list-item-name">{{item.name}}</span>
                    </div>
                
            </li>
        </ul>


        `

}