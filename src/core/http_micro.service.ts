/// <reference path="../main.ts" />

namespace Origin.Core {
    export interface IHttpMicroService {
        get(url: string, parameters?: any, hideBusyLoader?: boolean)
    }
    export class HttpMicroService implements IHttpMicroService {
        static $inject = ['$q', '$http', 'ENV'];
        busyLoader: any;
        clockCount: number;
        constructor(private $q: ng.IQService,
            private $http: ng.IHttpService,
            private env: Origin.Config.IEnv) {

        }

        private incmntClockCount = () => {
            let showBusyLoader = () => {
                if (this.clockCount <= 0) {
                    this.busyLoader.show(150);
                }
            };
            showBusyLoader();
            this.clockCount = this.clockCount + 1;
        }

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
        }

        private decmntClockCount = () => {
            let hideBusyLoader = () => {
                this.busyLoader.hide();
            };
            this.clockCount = this.clockCount - 1;
            if (this.clockCount <= 0) {
                hideBusyLoader();
            }
        }

        private handleErrors = (response: any) => { 

        }

        get = (url: string, parameters?: any, hideBusyLoader?: boolean) => {
            let _self = this;
            _self.incmntClockCount();
            var deferred = _self.$q.defer();
            //getServiceUrl().then(function (res) {
            url = _self.addTimeStampParam(url);
            _self.$http({
                method: 'GET',
                url: url,
                params: parameters
            }).then(function (response) {
                _self.decmntClockCount();
                deferred.resolve(response.data);

            }, function (response) {
                _self.decmntClockCount();
                _self.handleErrors(response);
                deferred.reject(response);
            });
            return deferred.promise;
        }

    }

    Origin.Main.module.service('HttpMicroService', Origin.Core.HttpMicroService);
}