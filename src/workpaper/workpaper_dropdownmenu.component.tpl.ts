namespace Origin.Template {
    export var dropdownMenuTemplate: string = `
    
        <i class=\"dropdown grid-dropdown\" uib-dropdown bento-dropdown-append-to-parent bento-append-to-parent style=\"margin-right: 10px;\">
            <button class=\"btn btn-link btn-xs dropdown-toggle\" uib-dropdown-toggle>
                 <span class="bento-icon-chevron-medium-down">
                    <ul class=\"dropdown-menu grid-dropdown\">
                        <li ng-if=\"!$ctrl.workpaper.islocked && !$ctrl.workpaper.ischeckedout && !$ctrl.workpaper.iscapturedversion\"><a ng-click=\"$ctrl.openWorkpaper($ctrl.workpaper)\"><i class=\"bento-icon-file-excel\" style=\"color: green\"></i><span translate=\"open\" style=\"margin-left: 10px;\"></span></a></li>
                        <li ><a ng-click=\"$ctrl.openWorkpaperReadonly($ctrl.workpaper)\"><i class=\"bento-icon-eye\"></i><span translate=\"openreadonly\" style=\"margin-left: 10px;\"></span></a></li>
                        <!--unlocktemplate-->
                        <li ng-if=\"$ctrl.canLockUnlock && !$ctrl.workpaper.islocked && !$ctrl.workpaper.ischeckedout && !$ctrl.workpaper.iscapturedversion\"><a ng-click=\"$ctrl.lockWorkpaper($ctrl.workpaper)\"><i class=\"bento-icon-lock\"></i><span translate=\"lock\" style=\"margin-left: 10px;\"></span></a></li>
                        <!--unlocktemplate-->
                        <!--overridecheckouttemplate-->
                        <li ng-if=\"$ctrl.canOverride && $ctrl.workpaper.ischeckedout && !$ctrl.workpaper.iscapturedversion\"><a ng-click=\"$ctrl.overrideCheckout($ctrl.workpaper)\"><i class=\"bento-icon-save-solid\"></i><span translate=\"overridecheckout\" style=\"margin-left: 10px;\"></span></a></li>
                        <!--overridecheckouttemplate-->
                        <!--locktemplate-->
                        <li ng-if=\"$ctrl.canLockUnlock && $ctrl.workpaper.islocked && !$ctrl.workpaper.iscapturedversion\"><a ng-click=\"$ctrl.unlockWorkpaper($ctrl.workpaper)\"><i class=\"bento-icon-unlocked\"></i><span translate=\"unlock\" style=\"margin-left: 10px;\"></span></a></li>
                        <!--locktemplate-->
                        <!--revertvertemplate-->
                        <li ng-if=\"!$ctrl.workpaper.islocked && !$ctrl.workpaper.ischeckedout && $ctrl.workpaper.iscapturedversion\"><a ng-click=\"$ctrl.revertVerWorkpaper($ctrl.workpaper)\"><i class=\"bento-icon-redo\"></i><span translate=\"revert\" style=\"margin-left: 10px;\"></span></a></li>
                        <!--revertvertemplate-->
                    </ul>
                </span>
            </button>
        </i>
        <i ng-if=\"$ctrl.workpaper.islocked && !$ctrl.workpaper.iscapturedversion\" class=\"bento-icon-lock\" style=\"color: red; margin-right : 10px;\"></i>
        <i ng-if=\"$ctrl.workpaper.ischeckedout && !$ctrl.workpaper.iscapturedversion\" class=\"bento-icon-save-solid\" style=\"color: red; margin-right : 10px;\"></i>
    `
}