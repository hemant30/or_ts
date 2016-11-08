namespace Origin.Home {

    export var hometemplate: string = `
        <style type="text/css">
            .btn.btn-lg.wp-home-main-link-button {
                width: 150px;
                max-width: 100%;
                padding: 0;
                background-color: #ff8000;
                border-color: transparent;
                font-weight: 500;
            }
            
            .wp-home-addin-download-icon {
                font-size: 30px;
                color: green;
                margin-top: 14px;
                margin-right: 10px;
            }
            
            .wp-home-addin-download-div-outer {
                padding: 5px;
                float: left;
            }
            
            .wp-home-addin-download-div-text {
                width: 300px;
                margin: 0 auto;
            }
            
            .homepagetext {
                font-size: 18px;
                margin-top: 50px;
                float: left;
                line-height: 22px;
            }
        </style>
        <div class="view-workpapers">
            <div class="col-md-12">
                <div class="col-md-6 homepagetext">
                    <span translate="onesource" class="strong"> </span>
                    <span translate="homepagetext"></span>
                    <span translate="onesource" class="strong"> </span>
                    <span translate="homepagetext2"></span>
                </div>
            </div>
            <div class="" style="margin-top: 30px; padding-left: 15px;">
                <div class="wp-home-addin-download-div-outer col-md-12">
                    <div class="bento-icon-file-excel pull-left wp-home-addin-download-icon"></div>
                    <div class="" style="margin-top: 20px">
                        <div style="font-size: 16px;">
                            <span data-translate="DownloadPluginInfo"></span>
                            <sapn translate="onesource" class="strong"></sapn>
                            <span translate="DownloadPluginInfo1"></span>
                        </div>
                        <div style="margin-top: 20px;">
                            <button ng-click="downloadExcelAddin()" class="btn btn-lg btn-primary wp-home-main-link-button" style="" translate="DownloadExcelAddin"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `

}