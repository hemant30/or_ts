namespace Origin.Template { 
    export var navtemplate: string = `
        <div class="">
            <div bento-nav-toolbar class="navbar-navbar navbar-default bento-toolbar global-subnav">
                <ul class="nav navbar-nav">
                    <li ng-if="isCMButtonVisible && selectedSubClient" style="padding-right: 17px; border-right: 1px solid #777">
                        <button type="button" class="btn btn-icon btn-primary btn-md" ng-click="showCMdialog()" style="
                                                                            padding: 16px 0px;
                                                                            padding-left: 16px!Important;
                                                                            padding-right: 16px!Important;
                                                                            color: #3c3e45;
                                                                            margin-left: 15px;
                                                                            border: 1px solid #ccc;
                                                                            border-radius: 7px;
                                                                            background-color: #fff;
                                                                            height: 30px;
                                                                            line-height: 30px;
                                                                            margin-top: 5px;
                                                                        ">{{selectedSubClient.name | limitTo: 35 }}{{selectedSubClient.length > 35 ? '...' : ''}}</button>
                    </li>
                    <li ui-sref-active="active">
                        <a ui-sref="wp.home" style="outline: 0" data-translate="Home" analytics-on="click" analytics-product="Workpapers" analytics-category="Navigation Menu"
                            analytics-label="Home"></a>
                    </li>
                    <li has-permission="ActiveWorkpapersView" ui-sref-active="active" class="ng-hide">
                        <a ui-sref="wp.workpapers" style="outline: 0" data-translate="Workpapers" analytics-on="click" analytics-product="Workpapers"
                            analytics-category="Navigation Menu" analytics-label="Active Workpapers"></a>
                    </li>
                    <li ui-sref-active="active" class="">
                        <a ui-sref="wp.attachments" style="outline: 0" data-translate="Attachments" analytics-on="click" analytics-product="Workpapers"
                            analytics-category="Navigation Menu" analytics-label="Attachments"></a>
                    </li>
                    <li has-permission="BatchesView" ui-sref-active="active" class="ng-hide">
                        <a ui-sref='wp.batches' style="outline: 0" data-translate="Batches" analytics-on="click" analytics-product="Workpapers" analytics-category="Navigation Menu"
                            analytics-label="Batches"></a>
                    </li>
                    <li ui-sref-active="active">
                        <a ui-sref="wp.plugin" style="outline: 0" data-translate="Support" analytics-on="click" analytics-product="Workpapers" analytics-category="Navigation Menu"
                            analytics-label="Support"></a>
                    </li>
                    <li>
                        <a ui-sref="wp.help" style="outline: 0" data-translate="Help" analytics-on="click" analytics-product="Workpapers" analytics-category="Navigation Menu"
                            analytics-label="Help"></a>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right ng-hide" has-permission='SuperAdministrator, Provisioning, AttributeManagementView'>
                    <li class="dropdown" uib-dropdown style="min-height: 40px;" is-open="isNavCogOpen">
                        <a href="" class="dropdown-toggle" uib-dropdown-toggle><i class="bento-icon-cog"></i></a>
                        <ul class="dropdown-menu">
                            <li has-permission="AttributeManagementView" ui-sref-active="active" class="ng-hide">
                                <a ui-sref="wp.attributemanagement" style="outline: 0" data-translate="AttributeManagement"></a>
                            </li>
                            <li has-permission='SuperAdministrator, Provisioning' ui-sref-active="active" class="ng-hide">
                                <a ui-sref="wp.clients" style="outline: 0" data-translate="Clients"></a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    `


}

