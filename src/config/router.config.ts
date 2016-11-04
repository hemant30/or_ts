/// <reference path="../app/app.component.tpl.ts" />

namespace Origin.Config { 
    export class RouteConfig { 
        constructor(private $stateProvider: ng.ui.IStateProvider, private $urlRouterProvider : ng.ui.IUrlRouterProvider) { 
            this.init();
        }

        init() { 
            this.$stateProvider.state('wp', this.defaultState());
            this.$stateProvider.state('wp.home', this.wphomeState());
            this.$stateProvider.state('wp.workpapers', this.workpaperState());
            this.$urlRouterProvider.otherwise('/wp')
            // if (typeof LoneStar !== 'object') {
            //     this.env.isLoneStarRunning = false;
            // } else { 
            //     this.env.isLoneStarRunning = true;
            // }
        }

        
        private defaultState() : ng.ui.IState{ 
            return {
                url: '/wp',
                views: {
                    '': {
                        template : '<originapp></originapp>'
                    },
                    'subNav@wp': {
                        template : '<nav></nav>'
                    },
                    'mainView@wp': {
                        template : '<home></home>'
                    }
                }
            }
        }  
        
        private wphomeState(): ng.ui.IState { 
            return {
                url: '/home',
                views: {
                    'mainView@wp': {
                        template : '<home></home>'
                    }
                }
            }
        }
        
        private workpaperState(): ng.ui.IState { 
            return {
                url: '/workpapers',
                views: {
                    'mainView@wp': {
                        template: '<workpaper></workpaper>',
                        
                    }
                }
            }

        }

        private batchesState(): ng.ui.IState { 
            return {
                views: {
                    
                }
            }
        }
    }
}