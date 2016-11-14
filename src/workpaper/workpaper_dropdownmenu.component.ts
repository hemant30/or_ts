/// <reference path="../main.ts" />
/// <reference path="./workpaper_dropdownmenu.component.tpl.ts" />

namespace Origin.Component {
    export class WPDropdownMenuController {
        workpaper: Origin.Model.Workpaper;
        update: Function;
        private canOverride: boolean;
        private canLockUnlock: boolean;


        static $inject = ['WorkpaperDataService', '$translate', 'AlertService', 'OriginAnalytics', 'AuthorizationService', '$q', 'UserDataService'];

        constructor(private workpaperDataService: Model.IWorkpaperDataService, private $translate: ng.translate.ITranslateService, private alertService: Core.IAlertService, private analyticsService: Core.IOriginAnalytics, private authorizationService: Core.IAuthorizationService, private $q: ng.IQService, private userDataService: Model.IUserDatService) { }

        $onInit = () => {
            let _self = this;
            let canOverridePromise = this.authorizationService.hasPermission('OverrideCheckout');
            let canLockUnlockPromise = this.authorizationService.hasPermission('LockUnlock');
            let isSelfCheckedOutPromise = this.isSelfCheckedOut()
            let promises = [canOverridePromise, canLockUnlockPromise, isSelfCheckedOutPromise];

            let suppress = (x) => {
                return x.catch(function () { });
            };

            this.$q.all(promises.map(suppress)).then(function (res: any) { 
                _self.canOverride = res[2] || res[0];
                _self.canLockUnlock = res[1];
            });
        }

        private isSelfCheckedOut(): ng.IPromise<{}> {
            let _self = this;
            var def = this.$q.defer();
            if (this.workpaper.ischeckedout) {
                this.userDataService.GetCurrentUser().then(function (res: Model.User) {
                    var user = res;
                    if (_self.workpaper.checkedoutby === user.loginname) {
                        def.resolve(true);
                    } else {
                        def.resolve(false);
                    }
                });
            } else {
                def.resolve(false);
            }
            return def.promise;
        }

        openWorkpaper = (workpaper: Model.Workpaper) => {
            let _self = this;
            this.workpaperDataService.checkout(workpaper).then(function (res) {
                _self.update({ a: res });
                //callback(res);
            }, function (res) {
                _self.$translate('checkout_failure_message').then(function (msg) {
                    _self.alertService.addAlert(Core.AlertType.danger, msg);
                });
            });
            _self.analyticsService.trackEvent('select', 'Access Menu', 'Open');
        };

        openWorkpaperReadonly = (workpaper: Model.Workpaper) => {
            this.workpaperDataService.downloadWorkpaperReadonly(workpaper);
            this.analyticsService.trackEvent('select', 'Access Menu', 'Read Only');
        };

        lockWorkpaper = (workpaper: Model.Workpaper) => {
            let _self = this;
            this.workpaperDataService.lock(workpaper).then(function (res) {
                _self.update({ a: res });
                _self.analyticsService.trackEvent('select', 'Access Menu', 'Lock');
            });
        };

        overrideCheckout = (workpaper: Model.Workpaper) => {
            let _self = this;
            this.workpaperDataService.uncheckout(workpaper).then(function (res) {
                _self.update({ a: res });
                _self.analyticsService.trackEvent('select', 'Access Menu', 'Override Checkout');
            });
        };

        unlockWorkpaper = (workpaper) => {
            let _self = this;
            this.workpaperDataService.unlock(workpaper).then(function (res) {
                _self.update({ a: res });
            }, function (exmsg) {
                _self.alertService.addAlert(Core.AlertType.danger, exmsg);
            });
        };

        revertVerWorkpaper = (workpaper) => {

            // var modalinstance = $modal.open({
            //     backdrop: 'static',
            //     keyboard: true,
            //     controller: 'revertWorkpaperController',
            //     templateUrl: 'js/components/workpapers/templates/' + '_revertWpConfirmation.html'
            // });

            // modalinstance.result.then(function (result) {
            //     if (result === 'revert') {
            //         workpaper.revert().then(function (res) {
            //             callback(res);
            //         }, function (exmsg) {
            //             alertService.addAlert('error', exmsg);
            //         });
            //     }
            // });

        };


    }

    export class WPDropdownMenu implements ng.IComponentOptions {
        bindings: any;
        controller: any;
        template: string;

        constructor() {
            this.bindings = {
                workpaper: '<',
                update: '&'
            };
            this.controller = WPDropdownMenuController;
            this.template = Origin.Template.dropdownMenuTemplate;
        }
    }

    Origin.Main.module.component('wpdropdownmenu', new Origin.Component.WPDropdownMenu())
}