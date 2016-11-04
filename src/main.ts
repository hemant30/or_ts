/// <reference path="./app/app.component.ts" />
/// <reference path="./home/home.component.ts" />
/// <reference path="./topnavigation/nav.component.ts" />


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
                    'bento.modern'
                    ]);

            this.module.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
                return new Origin.Config.RouteConfig($stateProvider, $urlRouterProvider);
            }]);

            this._module.component('originapp', new Origin.App())
                .component('home', new Origin.Home.Home())
                .component('nav', new Origin.Nav.Navigation())
                .component('workpaper', new Origin.Workpaper.Workpaper());

            return this._module;
        }
    }
}

// var x = Origin.App.module;