namespace Origin.Template {
    export var apptemplate: string = `
        <div class="originContainer"> 
            <div ui-view="subNav"></div>
            <div ng-if="!$ctrl.isLoneStarRunning" bento-alert bento-alert-object="origin.alerts"></div>
            <div ui-view="mainView" class="originMainView"></div>
        </div>
    `
}