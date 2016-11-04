namespace Origin.Nav { 
    export var navtemplate: string = `
        <div>
            <div bento-nav-toolbar class="navbar-navbar navbar-default bento-toolbar global-subnav">
                <ul class="nav navbar-nav">
                    <li ui-sref-active="active">
                        <a ui-sref="wp.home" style="outline: 0" data-translate="Home" analytics-on="click" analytics-product="Workpapers" analytics-category="Navigation Menu"
                        analytics-label="Home">Home</a>
                    </li>
                    <li has-permission="ActiveWorkpapersView" ui-sref-active="active" class="ng-hide">
                        <a ui-sref="wp.workpapers" style="outline: 0" data-translate="Workpapers" analytics-on="click" analytics-product="Workpapers"
                            analytics-category="Navigation Menu" analytics-label="Active Workpapers">Workpapers</a>
                    </li>
                    <li ui-sref-active="active" class="">
                        <a ui-sref="wp.attachments" style="outline: 0" data-translate="Attachments" analytics-on="click" analytics-product="Workpapers"
                            analytics-category="Navigation Menu" analytics-label="Attachments">Attachments</a>
                    </li>
                    <li has-permission="BatchesView" ui-sref-active="active" class="ng-hide">
                        <a ui-sref='wp.batches' style="outline: 0" data-translate="Batches" analytics-on="click" analytics-product="Workpapers" analytics-category="Navigation Menu"
                            analytics-label="Batches">Batches</a>
                    </li>
                    <li ui-sref-active="active">
                        <a ui-sref="wp.plugin" style="outline: 0" data-translate="Support" analytics-on="click" analytics-product="Workpapers" analytics-category="Navigation Menu"
                            analytics-label="Support">Support</a>
                    </li>
                    <li>
                        <a ui-sref="wp.help" style="outline: 0" data-translate="Help" analytics-on="click" analytics-product="Workpapers" analytics-category="Navigation Menu"
                            analytics-label="Help"></a>
                    </li>
                </ul>
            </div>
        </div> 
    `


}

