/// <reference path="../main.ts" />

/// <reference path="../app/app.component.tpl.ts" />
/// <reference path="../models/attribute.model.ts" />
/// <reference path="./constants.ts" />
/// <reference path="../core/wijmo_setup.ts" />


namespace Origin.Config {

    export class RouteConfig {
        constructor(private $stateProvider: ng.ui.IStateProvider, private $urlRouterProvider: ng.ui.IUrlRouterProvider) {
            this.init();
        }

        init() {
            this.$stateProvider.state('wp', this.defaultState());
            this.$stateProvider.state('wp.home', this.wphomeState());
            this.$stateProvider.state('wp.workpapers', this.workpaperState());
            this.$stateProvider.state('wp.plugin', this.supportState())
            this.$stateProvider.state('wp.batches', this.batchesState())
            this.$stateProvider.state('wp.batches.list', this.batchesListState())
            this.$stateProvider.state('wp.batches.queue', this.batchQueueState())
            this.$stateProvider.state('wp.batches.history', this.batchHistoryState())
            this.$stateProvider.state('wp.attachments', this.attachmentsState())
            this.$stateProvider.state('wp.help', this.helpState())
            this.$urlRouterProvider.otherwise('/wp')
            // if (typeof LoneStar !== 'object') {
            //     this.env.isLoneStarRunning = false;
            // } else { 
            //     this.env.isLoneStarRunning = true;
            // }
        }

        private getColumnDefinitionsForWorkpaper(attributeDataService: Origin.Model.IAttributeDataService, $q: ng.IQService) {
            let columns: Array<Origin.Core.Wijmo.IColumnDefinition> = [{
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
                        template: '<workpaper-container authorize="$resolve.authorize" customattributes="$resolve.customattributes"></workpaer-container>',
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
                    // 'mainView@wp': {
                    //     template: '<workpaper authorize="$resolve.authorize" customattributes="$resolve.customattributes"></workpaper>',
                    //     resolve: {
                    //         authorize: ['AuthorizationService', function (authorizationService: Origin.Core.IAuthorizationService) {
                    //             let x = authorizationService.hasPermission(OriConstant.permissions.CAN_SEE_ACTIVE_WORKPAPER);
                    //             return x;
                    //         }],
                    //         customattributes: ['AttributeDataService', '$q', function (AttributeDataService: Origin.Model.IAttributeDataService, $q: ng.IQService) {
                    //             let x =
                    //                 _self.getColumnDefinitionsForWorkpaper(AttributeDataService, $q);
                    //             return x;
                    //         }]
                    //     }
                    // },
                    // 'folderview@wp.workpapers': {
                    //     template: '<folder authorize="$resolve.authorize"></folder>',
                    //     resolve: {
                    //         authorize: ['AuthorizationService', function (authorizationService: Origin.Core.IAuthorizationService) {
                    //             let x = authorizationService.hasPermission(OriConstant.permissions.CAN_SEE_ACTIVE_WORKPAPER);
                    //             return x;
                    //         }]
                    //     }
                    // }
                }
            }

        }

        private batchHistoryState(): ng.ui.IState { 
            return {
                url: '/history',
                views: {
                    'batchesview@wp.batches': {
                        template : '<batch-history></batch-history>'
                    }
                }
            }
        }

        private batchQueueState(): ng.ui.IState { 
            return {
                url: '/queue',
                views: {
                    "batchesview@wp.batches": {
                        template: '<batch-queue></batch-queue>'
                    }
                }
            }
        }

        private batchesListState(): ng.ui.IState {
            return {
                url: '/list',
                views: {
                    "batchesview@wp.batches": {
                        template: '<batch-list></batch-list>',
                        resolve: {
                            isAuthorize: ['AuthorizationService',
                                function (authorizationservice) {
                                    return authorizationservice.hasPermission(OriConstant.permissions.CAN_SEE_BATCHES);
                                }
                            ]
                        }
                    }
                }
            }
        }

        private batchesState(): ng.ui.IState {
            return {
                url: '/batches',
                views: {

                    mainView: {
                        template: '<batch-container isAuthorize="$reolve.isAuthorize"></batch-container>',
                        resolve: {
                            isAuthorize: ['AuthorizationService',
                                function (authorizationservice) {
                                    return authorizationservice.hasPermission(OriConstant.permissions.CAN_SEE_BATCHES);
                                }
                            ]
                        }
                    },
                    "batchesview@wp.batches": {
                        template: '<batch-list></batch-list>',
                        resolve: {
                            isAuthorize: ['AuthorizationService',
                                function (authorizationservice) {
                                    return authorizationservice.hasPermission(OriConstant.permissions.CAN_SEE_BATCHES);
                                }
                            ]
                        }
                    }
                }
            }
        }

        private supportState(): ng.ui.IState {
            return {
                url: '/support',
                views: {
                    '': {
                        template: ''
                    },
                    mainView: {
                        template: ''
                    }
                }
            }
        }

        private attachmentsState(): ng.ui.IState {
            return {
                views: {
                    '': {
                        template: ''
                    },
                    mainView: {
                        template: 'this is attachment'
                    }
                }
            }
        }

        private helpState() {
            return {
                url: '/webhelp/default.htm',
                external: true
            }
        }
    }

    Origin.Main.module.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        return new Origin.Config.RouteConfig($stateProvider, $urlRouterProvider);
    }])
}