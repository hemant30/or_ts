/// <reference path="./auth_token.interceptor.ts" />
/// <reference path="../main.ts" />

namespace Origin.Config {
    export class AuthConfig {
        static $inject = ['$urlRouterProvider', '$translateProvider', '$httpProvider'];

        constructor(private $urlRouterProvider: ng.ui.IUrlRouterProvider, private $translateProvider: ng.translate.ITranslateProvider, private $httpProvider: ng.IHttpProvider) {
            this.$urlRouterProvider.otherwise('/wp');
            this.$httpProvider.interceptors.push('AuthTokenInterceptor');
        }
    }

    Origin.Main.module.config(['$httpProvider', 'ENV', '$urlRouterProvider', '$translateProvider',
        function (
            $httpProvider,
            env: Origin.Config.IEnv,
            $urlRouterProvider: ng.ui.IUrlRouterProvider,
            $translateProvider: ng.translate.ITranslateProvider) {
            if (!env.isLoneStarRunning) {
                return new Origin.Config.AuthConfig($urlRouterProvider, $translateProvider, $httpProvider)
            }
        }])
}