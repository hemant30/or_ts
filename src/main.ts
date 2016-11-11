/// <reference path="../typings/index.d.ts" />


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
                    'angulartics',
                    'wj'
                ]);
            return this._module;


        }
    }
}