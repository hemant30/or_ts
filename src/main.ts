/// <reference path="./core/global.functions.ts" />
/// <reference path="./app/app.component.ts" />
/// <reference path="./home/home.component.ts" />
/// <reference path="./topnavigation/nav.component.ts" />
/// <reference path="./models/user.model.ts" />
/// <reference path="./config/constants.ts" />
/// <reference path="./config/env.config.ts" />
/// <reference path="./core/custom_interceptor.ts" />
/// <reference path="./core/permission.directive.ts" />
/// <reference path="./Workpaper/workpaper.component.ts" />
/// <reference path="./Workpaper/folder.component.ts" />

namespace Origin {
    export class Main {
        private static _module: ng.IModule;

        static get module(): ng.IModule {
            if (this._module) {
                return this._module;
            }
            this._module = angular.module('wp',
                [
                    'ui.router',
                    'pascalprecht.translate',
                    'fef',
                    'bento.modern',
                    'ngCookies',
                    'wj'
                ]);

            this.module
                .constant('Constant', Origin.Config.OriConstant)
                .constant('ENV', Origin.Config.ENV)
                .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
                    return new Origin.Config.RouteConfig($stateProvider, $urlRouterProvider);
                }])
                .config(['$httpProvider', function ($httpProvider) {
                    $httpProvider.interceptors.push('CustomInterceptor')
                }])
                .config(['$httpProvider', 'ENV', '$urlRouterProvider', '$translateProvider', function ($httpProvider, env: Origin.Config.IEnv, $urlRouterProvider: ng.ui.IUrlRouterProvider, $translateProvider: ng.translate.ITranslateProvider) {
                    if (!env.isLoneStarRunning) {
                        return new Origin.Config.AuthConfig($urlRouterProvider, $translateProvider, $httpProvider)
                    }
                }])

            this._module.component('originapp', new Origin.App())
                .component('home', new Origin.Home.Home())
                .component('nav', new Origin.Nav.Navigation())
                .component('workpaperContainer', new Origin.Component.WorkpaperContainer())
                .component('workpaper', new Origin.Component.Workpaper())
                .component('folder', new Origin.Component.Folder())
                .component('folderItem', new Origin.Component.FolderItem())
                .service('AlertService', Origin.Core.AlertService)
                .service('OriginAnalytics', Origin.Core.OriginAnalytics)
                .service('AppService', Origin.Core.AppService)
                .service('HttpService', Origin.Core.HttpService)
                .service('HttpMicroService', Origin.Core.HttpMicroService)
                .service('AuthorizationService', Origin.Core.AuthorizationService)
                .service('CustomInterceptor', Origin.Core.CustomInterceptor)
                .service('AuthTokenInterceptor', Origin.Core.AuthTokenInterceptor)
                .service('FormDataService', Origin.Core.FormDataService)
                .service('DemService', Origin.Core.OriginDem)
                .service('UserDataService', Origin.Model.UserDataService)
                .service('AttributeDataService', Origin.Model.AttributeDataService)
                .service('FolderDataService', Origin.Model.FolderDataService)
                .service('WorkpaperDataService', Origin.Model.WorkpaperDataService)
                .filter('actualDate', Origin.Core.ActualDate)
                .directive('hasPermission', ['AuthorizationService', (authorizationService) => new Origin.Core.PermissionDirective(authorizationService)])

            return this._module;
        }
    }
}

// var x = Origin.App.module;