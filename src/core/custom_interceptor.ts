/// <reference path="./app.service.ts" />
/// <reference path="../main.ts" />


namespace Origin.Core {
    export class CustomInterceptor {
        static $inject = ['$q', '$cookies', 'AppService'];
        constructor(
            private $q: ng.IQService,
            private $cookies: ng.cookies.ICookiesService,
            private appService: Origin.Core.IAppService) { }

        request = (config: ng.IRequestConfig) => {
            let language = this.$cookies.get('LSLanguage');
            language = language || 'en-US';
            config.headers['LSLanguage'] = language;
            var instance = this.appService.getOtpInstanceid();
            if (instance) {
                config.headers['TRTA-OTP-INSTANCE'] = instance;
            }
            return config;
        }

        responseError = (response) => {
            return this.$q.reject(response);
        }
    }

    // Origin.Main.module.config(['$httpProvider', function ($httpProvider) {
    //     $httpProvider.interceptors.push('CustomInterceptor');
    // }])

}