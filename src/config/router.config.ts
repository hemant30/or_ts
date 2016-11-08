/// <reference path="../app/app.component.tpl.ts" />
/// <reference path="../models/attribute.model.ts" />
/// <reference path="./constants.ts" />


namespace Origin.Config {

    interface IColumn {
        name: string;
        header?: string;
        canHideColumn: boolean;
        visible: boolean;
        type?: number;
        iscusomattributes?: boolean;
    }
    export class RouteConfig {
        constructor(private $stateProvider: ng.ui.IStateProvider, private $urlRouterProvider: ng.ui.IUrlRouterProvider) {
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

        private getColumnDefinitionsForWorkpaper(attributeDataService: Origin.Model.IAttributeDataService, $q: ng.IQService) {
            let columns: Array<IColumn> = [{
                'name': 'checkbox',
                'canHideColumn': false,
                'visible': true
            }, {
                'name': 'actions',
                'canHideColumn': false,
                'visible': true
            }, {
                'name': 'info',
                'canHideColumn': false,
                'visible': true
            }, {
                'name': 'access',
                'canHideColumn': false,
                'visible': true
            }, {
                'name': 'name',
                'canHideColumn': false,
                'visible': true
            }, {
                'name': 'foldername',
                'canHideColumn': false,
                'visible': true
            }, {
                'name': 'lastmodified',
                header: 'WpGridHeaderLastModified',
                'canHideColumn': true,
                'visible': true
            }, {
                'name': 'lastmodifiedby',
                header: 'WpGridHeaderLastModifiedBy',
                'canHideColumn': true,
                'visible': true
            }];
            var defer = $q.defer();
            let addtocolumns = (attr: Origin.Model.Attribute) => {
                if (attr.isincluded) {
                    columns.push({
                        'name': attr.name,
                        'header': attr.name,
                        'type': attr.type,
                        canHideColumn: true,
                        visible: true,
                        iscusomattributes: true
                    });
                }
            };

            attributeDataService.get().then(function (res: any) { 
                res.map(addtocolumns);
                defer.resolve(columns);
            }, function (reason: any) { })            

            return defer.promise;
        };

        private defaultState(): ng.ui.IState {
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
            }
        }

        private wphomeState(): ng.ui.IState {
            return {
                url: '/home',
                views: {
                    'mainView@wp': {
                        template: '<home></home>'
                    }
                }
            }
        }

        private workpaperState = (): ng.ui.IState => {
            let _self = this;
            return {
                url: '/workpapers',
                views: {
                    'mainView@wp': {
                        template: '<workpaper authorize="$resolve.authorize" customattributes="$resolve.customattributes"></workpaper>',
                        resolve: {
                            authorize: ['AuthorizationService', function (authorizationService: Origin.Core.IAuthorizationService) {
                                let x = authorizationService.hasPermission(OriConstant.permissions.CAN_SEE_ACTIVE_WORKPAPER);
                                return x;
                            }],
                            customattributes: ['AttributeDataService', '$q', function (AttributeDataService: Origin.Model.IAttributeDataService, $q: ng.IQService) {
                                let x =
                                    _self.getColumnDefinitionsForWorkpaper(AttributeDataService, $q);
                                return x;
                            }]
                        }
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