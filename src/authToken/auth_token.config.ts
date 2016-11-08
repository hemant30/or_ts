/// <reference path="./auth_token.interceptor.ts" />

namespace Origin.Config { 
    export class AuthConfig { 
        static $inject = ['$urlRouterProvider', '$translateProvider', '$httpProvider'];

        constructor(private $urlRouterProvider: ng.ui.IUrlRouterProvider, private $translateProvider: ng.translate.ITranslateProvider, private $httpProvider : ng.IHttpProvider) { 
            this.$urlRouterProvider.otherwise('/wp');
            this.$httpProvider.interceptors.push('AuthTokenInterceptor');
        }
    }
}