namespace Origin.Template { 
    export var FolderItemTemplate: string = `
        
        <div class="pull-right" style="width: 40px; text-align: center" ng-click="$ctrl.doNothing($event)">
            <span style="" class="badge" ng-show="!$ctrl.showEditDelete">{{$ctrl.item.workpapercount}}</span>
            <div has-permission="EditFoldersActiveWorkpapers" class="pull-left">
                <span class="bento-icon-edit" ng-show="$ctrl.showEditDelete" ng-click="$ctrl.editFolder($ctrl.item)"></span>
            </div>
            <div has-permission="DeleteFoldersActiveWorkpapers" class="pull-right">
                <span class="bento-icon-remove" ng-show="$ctrl.showEditDelete" style="margin-left: 5px;" ng-click="$ctrl.deleteFolder(item)"></span>
            </div>
        </div>
        <div class="wp-folder-list-item">
            <span class="wp-folder-list-item-icon" ng-class="{'bento-icon-folder-open' : item.selected  , 'bento-icon-folder' : !item.selected }"></span><span class="show-whitespaces wp-folder-list-item-name">{{$ctrl.item.name}}</span>
        </div>

    `
}