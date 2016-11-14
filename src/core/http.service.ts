/// <reference path="../config/env.config.ts" />
/// <reference path="../core/app.service.ts" />
/// <reference path="../core/alert.service.ts" />
/// <reference path="../core/formData.service.ts" />
/// <reference path="../config/constants.ts" />
/// <reference path="../main.ts" />

namespace Origin.Core {

    export interface IHttpService {
        get(url: string, parameters?: any, hideBusyLoader?: boolean)
        post(url: string, data?: any, hideBusyLoader?: boolean, rejectError?: boolean, useZuul?: boolean);
        put();
        delete();
        DownloadFile(url: string);
    }

    export class HttpService implements IHttpService {

        busyLoader: any;
        surl: string;
        zuulurl: string;
        directurl: string;
        serviceurl: string;
        clockCount: number;

        static $inject = ['$http', '$q', 'ENV', '$window', '$bentoBusyLoader', '$injector', '$cookies', 'AlertService', 'Constant', '$translate', 'FormDataService', 'AppService'];
        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private env: Origin.Config.IEnv,
            private $window: ng.IWindowService,
            private $bentoBusyLoader: any,
            private $injector: ng.auto.IInjectorService,
            private $cookies: ng.cookies.ICookiesService,
            private alertService: Origin.Core.IAlertService,
            private constants: Origin.Config.IConstant,
            private $translate: ng.translate.ITranslateService,
            private formDataService: Origin.Core.IFormDataService,
            private originAppService: Origin.Core.IAppService) {

            this.surl = this.env.apiEndPoint;
            this.zuulurl = this.env.zuulEndPoint;
            this.serviceurl = '';
            this.clockCount = 0;
            this.busyLoader = this.$bentoBusyLoader.getNewLoader('body');
        }

        private showAlert(msg: any): void {
            if (msg && msg.data && msg.data.message) {
                this.$translate('UnauthorizedAccess').then(function (message) {
                    if (message === msg.data.message) {
                        this.alertService.addAlert('error', message, 15000);
                    } else {
                        this.alertService.addAlert('error', msg && msg.data && msg.data.message);
                    }
                });
            } else {
                this.alertService.addAlert(Origin.Core.AlertType.danger, this.constants.default_500_error_msg);
            }
        }

        private handleErrors = (response: any) => {

        }

        private incmntClockCount(): void {
            let showBusyLoader = () => {
                if (this.clockCount <= 0) {
                    this.busyLoader.show(150);
                }
            };
            showBusyLoader();
            this.clockCount = this.clockCount + 1;
        };

        private decmntClockCount(): void {
            let hideBusyLoader = () => {
                this.busyLoader.hide();
            };
            this.clockCount = this.clockCount - 1;
            if (this.clockCount <= 0) {
                hideBusyLoader();
            }
        };

        private addTimeStampParam(url: string): string {
            let getnewparm = () => {
                return 'qcnp =' + new Date().getTime();
            };
            if (url.indexOf('?') > 0) {
                url += '&' + getnewparm();
            } else {
                url += '?' + getnewparm();
            }
            return url;
        };

        private getServiceUrl = (): ng.IPromise<{}> => {
            let def = this.$q.defer();

            if (!this.surl) {
                this.$http({
                    method: 'GET',
                    url: this.surl
                }).then(function (response: any) {
                    this.serviceurl = response.data.replace('"', '').replace('"', '');
                    def.resolve(this.serviceurl);

                }, function (response) {
                    this.handleErrors(response);
                    def.reject('failed to getserviceurl');
                });

            } else {
                def.resolve(this.surl);
            }
            return def.promise;
        };

        get = (url: string, parameters?: any, hideBusyLoader?: boolean): ng.IPromise<{}> => {
            let _self = this;
            let deferred = this.$q.defer();
            if (!url) {
                deferred.reject('Unspecified url');
                return deferred.promise;
            }

            if (!hideBusyLoader) {
                this.incmntClockCount();
            }

            this.getServiceUrl().then(function (res) {
                url = _self.addTimeStampParam(res + url);
                _self.$http({
                    method: 'GET',
                    url: url,
                    params: parameters
                }).then(function (response) {
                    if (!hideBusyLoader) {
                        _self.decmntClockCount();
                    }
                    deferred.resolve(response.data);

                }, function (response) {
                    if (!hideBusyLoader) {
                        _self.decmntClockCount();
                    }
                    _self.handleErrors(response);
                });
            });
            return deferred.promise;
        };

        post(url: string, data?: any, hideBusyLoader?: boolean, rejectError?: boolean, useZuul?: boolean) {
            let _self = this;
            if (!hideBusyLoader) {
                this.incmntClockCount();
            }

            let deferred = this.$q.defer();
            this.getServiceUrl().then(function (res) {
                if (useZuul) {
                    url = _self.directurl + url;
                } else {
                    url = res + url;
                }

                _self.$http({
                    method: 'POST',
                    url: url,
                    data: data
                }).then(function (response) {
                    if (!hideBusyLoader) {
                        _self.decmntClockCount();
                    }
                    deferred.resolve(response.data);
                }, function (response) {
                    if (!hideBusyLoader) {
                        _self.decmntClockCount();
                    }
                    if (!rejectError) {
                        _self.handleErrors(response);
                    } else {
                        deferred.reject(response);
                    }
                });
            });
            return deferred.promise;
        };
        put() { };
        delete() { };
        UploadForm(url: string, formData: any): ng.IPromise<{}> {
            this.incmntClockCount();
            let deferred = this.$q.defer();
            //getServiceUrl().then(function(res) {
            url = this.directurl + url;

            this.formDataService.uploadFile(url, formData).then(function (response) {
                this.decmntClockCount();
                deferred.resolve(response);
            }, function (reason) {
                this.decmntClockCount();
                deferred.reject('Failed to post file to the server');
            });

            return deferred.promise;
        };

        DownloadFile = (url: string) => {
            let _self = this;
            this.getServiceUrl().then(function (res) {
                var instance = _self.originAppService.getOtpInstanceid();
                _self.formDataService.getTokenAndAccountId().then(function (response: any) {
                    url = res + url + '?UDSLongToken=' + response.udsLongToken;
                    if (instance) {
                        url = url + '&instance=' + instance;
                    }
                    if (_self.env.isLoneStarRunning) {
                        url = url + '&LoneStarAccountId=' + response.accountid + '&LoneStarProductFirmId=' + response.firmid;
                        if (response.cmid) {
                            url = url + '&LonestarCmId=' + response.cmid;
                        }
                    }
                    _self.$window.location = url;
                }, function (response) {

                });
            });
        }

    }

    Origin.Main.module.service('HttpService', Origin.Core.HttpService);
}