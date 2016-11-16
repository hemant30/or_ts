/// <reference path="../main.ts" />

namespace Origin.Core {
    export interface IFormDataService { 
        getTokenAndAccountId(): ng.IPromise<{}>;
        uploadFile(url: string, formData: any);
    };

    export class FormDataService implements IFormDataService {
        static $inject = ['$http', '$q', 'ENV', 'AppService', '$cookies', '$injector'];
        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private env: Origin.Config.IEnv, private originAppService: Origin.Core.IAppService, private $cookies: ng.cookies.ICookiesService, private $injector: ng.auto.IInjectorService) {

        }

        getTokenAndAccountId(): ng.IPromise<{}> {
            let defer = this.$q.defer();
            let response: any = {};
            if (this.env.isLoneStarRunning) {
                let $lonestarUser: any = this.$injector.get('$lonestarUser');
                let $lonestarConfig: any = this.$injector.get('$lonestarConfig');
                var user = $lonestarUser.user;
                response.udsLongToken = user.udsLongToken;
                response.accountid = $lonestarUser.subAccountId || user.clientId;
                response.firmid = $lonestarConfig.firmId;
                var subClient = $lonestarConfig.selectedSubClient;
                if (subClient) {
                    response.cmid = subClient.id;
                }
                defer.resolve(response);
            } else {
                response.udsLongToken = this.$cookies.get('UDSLongToken');
                response.accountid = '';
                response.firmid = '';
                defer.resolve(response);
            }
            return defer.promise;
        }

        uploadFile(url: string, formData: any) { 
            var deferred = this.$q.defer();
            var instance =this. originAppService.getOtpInstanceid();

            function uploadComplete(e) {
                deferred.resolve(JSON.parse(e.target.responseText));
            }

            function uploadFailed(e) {
                deferred.reject('Failed to post');
            }

            this.getTokenAndAccountId().then(function(response: any) {
                var xhr = new XMLHttpRequest();
                xhr.addEventListener('load', uploadComplete);
                xhr.addEventListener('error', uploadFailed, false);
                xhr.open('POST', url);
                xhr.setRequestHeader('Authorization', 'UDSLongToken ' + response.udsLongToken);
                xhr.setRequestHeader('X-LoneStar-AccountId', response.accountid);
                xhr.setRequestHeader('X-LoneStar-Product-FirmId', response.firmid);
                if (response.cmid) {
                    xhr.setRequestHeader('X-LoneStar-CMId', response.cmid);
                }
                xhr.setRequestHeader('Accept', 'application/json');
                var language = this.$cookies.get('LSLanguage');
                language = language || 'en-US';
                xhr.setRequestHeader('LSLanguage', language);
                if (instance) {
                    xhr.setRequestHeader('TRTA-OTP-INSTANCE', instance);
                }
                xhr.send(formData);
            }, function(response) {
                deferred.reject('Failed to get token');
            });

            return deferred.promise;
        }
    }

    Origin.Main.module.service('FormDataService', Origin.Core.FormDataService);
}