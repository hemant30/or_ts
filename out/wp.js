var Origin;
(function (Origin) {
    Origin.apptemplate = "\n        <div class=\"originContainer\"> \n            <div ui-view=\"subNav\"></div>\n            <div ng-if=\"!$ctrl.isLoneStarRunning\" bento-alert bento-alert-object=\"origin.alerts\"></div>\n            <div ui-view=\"mainView\" class=\"originMainView\"></div>\n        </div>\n    ";
})(Origin || (Origin = {}));
var Origin;
(function (Origin) {
    var AppComponentController = (function () {
        function AppComponentController() {
        }
        AppComponentController.$inject = [];
        return AppComponentController;
    }());
    Origin.AppComponentController = AppComponentController;
    var App = (function () {
        function App() {
            this.bindings = {};
            this.controller = AppComponentController;
            this.template = Origin.apptemplate;
        }
        return App;
    }());
    Origin.App = App;
})(Origin || (Origin = {}));
var Origin;
(function (Origin) {
    var Config;
    (function (Config) {
        Config.ENV = {
            isLoneStarRunning: false
        };
    })(Config = Origin.Config || (Origin.Config = {}));
})(Origin || (Origin = {}));
/// <reference path="../app/app.component.tpl.ts" />
var Origin;
(function (Origin) {
    var Config;
    (function (Config) {
        var RouteConfig = (function () {
            function RouteConfig($stateProvider, $urlRouterProvider) {
                this.$stateProvider = $stateProvider;
                this.$urlRouterProvider = $urlRouterProvider;
                this.init();
            }
            RouteConfig.prototype.init = function () {
                this.$stateProvider.state('wp', this.defaultState());
                this.$stateProvider.state('wp.home', this.wphomeState());
                this.$stateProvider.state('wp.workpapers', this.workpaperState());
                this.$urlRouterProvider.otherwise('/wp');
                // if (typeof LoneStar !== 'object') {
                //     this.env.isLoneStarRunning = false;
                // } else { 
                //     this.env.isLoneStarRunning = true;
                // }
            };
            RouteConfig.prototype.defaultState = function () {
                return {
                    url: '/wp',
                    views: {
                        '': {
                            template: '<originapp></originapp>'
                        },
                        'subNav@wp': {
                            template: '<nav></nav>'
                        },
                        'mainView@wp': {
                            template: '<home></home>'
                        }
                    }
                };
            };
            RouteConfig.prototype.wphomeState = function () {
                return {
                    url: '/home',
                    views: {
                        'mainView@wp': {
                            template: '<home></home>'
                        }
                    }
                };
            };
            RouteConfig.prototype.workpaperState = function () {
                return {
                    url: '/workpapers',
                    views: {
                        'mainView@wp': {
                            template: '<workpaper></workpaper>',
                        }
                    }
                };
            };
            RouteConfig.prototype.batchesState = function () {
                return {
                    views: {}
                };
            };
            return RouteConfig;
        }());
        Config.RouteConfig = RouteConfig;
    })(Config = Origin.Config || (Origin.Config = {}));
})(Origin || (Origin = {}));
var Origin;
(function (Origin) {
    var Home;
    (function (Home) {
        Home.hometemplate = "\n    this is home\n    ";
    })(Home = Origin.Home || (Origin.Home = {}));
})(Origin || (Origin = {}));
/// <reference path="./home.component.tpl.ts" />
var Origin;
(function (Origin) {
    var Home;
    (function (Home_1) {
        var HomeController = (function () {
            function HomeController() {
            }
            HomeController.prototype.downloadExcelAddin = function () {
            };
            return HomeController;
        }());
        Home_1.HomeController = HomeController;
        var Home = (function () {
            function Home() {
                this.bindings = {};
                this.controller = HomeController;
                this.template = Origin.Home.hometemplate;
            }
            return Home;
        }());
        Home_1.Home = Home;
    })(Home = Origin.Home || (Origin.Home = {}));
})(Origin || (Origin = {}));
var Origin;
(function (Origin) {
    var Nav;
    (function (Nav) {
        var NavigationComponent = (function () {
            function NavigationComponent($injector) {
                this.$injector = $injector;
            }
            NavigationComponent.prototype.showCMdialog = function () {
            };
            NavigationComponent.$inject = ['$injector'];
            return NavigationComponent;
        }());
        Nav.NavigationComponent = NavigationComponent;
        var Navigation = (function () {
            function Navigation() {
                this.bindings = {};
                this.controller = NavigationComponent;
                this.template = Origin.Nav.navtemplate;
            }
            return Navigation;
        }());
        Nav.Navigation = Navigation;
    })(Nav = Origin.Nav || (Origin.Nav = {}));
})(Origin || (Origin = {}));
/// <reference path="./app/app.component.ts" />
/// <reference path="./home/home.component.ts" />
/// <reference path="./topnavigation/nav.component.ts" />
var Origin;
(function (Origin) {
    var Main = (function () {
        function Main() {
        }
        Object.defineProperty(Main, "module", {
            get: function () {
                if (this._module) {
                    return this._module;
                }
                this._module = angular.module('wp', [
                    'ui.router',
                    'pascalprecht.translate',
                    'fef',
                    'bento.modern'
                ]);
                this.module.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
                        return new Origin.Config.RouteConfig($stateProvider, $urlRouterProvider);
                    }]);
                this._module.component('originapp', new Origin.App())
                    .component('home', new Origin.Home.Home())
                    .component('nav', new Origin.Nav.Navigation())
                    .component('workpaper', new Origin.Workpaper.Workpaper());
                return this._module;
            },
            enumerable: true,
            configurable: true
        });
        return Main;
    }());
    Origin.Main = Main;
})(Origin || (Origin = {}));
// var x = Origin.App.module; 
var Origin;
(function (Origin) {
    var Nav;
    (function (Nav) {
        Nav.navtemplate = "\n        <div>\n            <div bento-nav-toolbar class=\"navbar-navbar navbar-default bento-toolbar global-subnav\">\n                <ul class=\"nav navbar-nav\">\n                    <li ui-sref-active=\"active\">\n                        <a ui-sref=\"wp.home\" style=\"outline: 0\" data-translate=\"Home\" analytics-on=\"click\" analytics-product=\"Workpapers\" analytics-category=\"Navigation Menu\"\n                        analytics-label=\"Home\">Home</a>\n                    </li>\n                    <li has-permission=\"ActiveWorkpapersView\" ui-sref-active=\"active\" class=\"ng-hide\">\n                        <a ui-sref=\"wp.workpapers\" style=\"outline: 0\" data-translate=\"Workpapers\" analytics-on=\"click\" analytics-product=\"Workpapers\"\n                            analytics-category=\"Navigation Menu\" analytics-label=\"Active Workpapers\">Workpapers</a>\n                    </li>\n                    <li ui-sref-active=\"active\" class=\"\">\n                        <a ui-sref=\"wp.attachments\" style=\"outline: 0\" data-translate=\"Attachments\" analytics-on=\"click\" analytics-product=\"Workpapers\"\n                            analytics-category=\"Navigation Menu\" analytics-label=\"Attachments\">Attachments</a>\n                    </li>\n                    <li has-permission=\"BatchesView\" ui-sref-active=\"active\" class=\"ng-hide\">\n                        <a ui-sref='wp.batches' style=\"outline: 0\" data-translate=\"Batches\" analytics-on=\"click\" analytics-product=\"Workpapers\" analytics-category=\"Navigation Menu\"\n                            analytics-label=\"Batches\">Batches</a>\n                    </li>\n                    <li ui-sref-active=\"active\">\n                        <a ui-sref=\"wp.plugin\" style=\"outline: 0\" data-translate=\"Support\" analytics-on=\"click\" analytics-product=\"Workpapers\" analytics-category=\"Navigation Menu\"\n                            analytics-label=\"Support\">Support</a>\n                    </li>\n                    <li>\n                        <a ui-sref=\"wp.help\" style=\"outline: 0\" data-translate=\"Help\" analytics-on=\"click\" analytics-product=\"Workpapers\" analytics-category=\"Navigation Menu\"\n                            analytics-label=\"Help\"></a>\n                    </li>\n                </ul>\n            </div>\n        </div> \n    ";
    })(Nav = Origin.Nav || (Origin.Nav = {}));
})(Origin || (Origin = {}));
var Origin;
(function (Origin) {
    var Workpaper;
    (function (Workpaper) {
        Workpaper.wptemplate = "\n        this is workpaper\n    ";
    })(Workpaper = Origin.Workpaper || (Origin.Workpaper = {}));
})(Origin || (Origin = {}));
var Origin;
(function (Origin) {
    var Workpaper;
    (function (Workpaper_1) {
        var WorkpaperComponent = (function () {
            function WorkpaperComponent() {
            }
            return WorkpaperComponent;
        }());
        Workpaper_1.WorkpaperComponent = WorkpaperComponent;
        var Workpaper = (function () {
            function Workpaper() {
                this.bindings = {};
                this.controller = WorkpaperComponent;
                this.template = Origin.Workpaper.wptemplate;
            }
            return Workpaper;
        }());
        Workpaper_1.Workpaper = Workpaper;
    })(Workpaper = Origin.Workpaper || (Origin.Workpaper = {}));
})(Origin || (Origin = {}));
//# sourceMappingURL=wp.js.map