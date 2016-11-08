var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Origin;
(function (Origin) {
    Origin.apptemplate = "\n        <div class=\"originContainer\"> \n            <div ui-view=\"subNav\"></div>\n            <div ng-if=\"!$ctrl.isLoneStarRunning\" bento-alert bento-alert-object=\"origin.alerts\"></div>\n            <div ui-view=\"mainView\" class=\"originMainView\"></div>\n        </div>\n    ";
})(Origin || (Origin = {}));
var Origin;
(function (Origin) {
    var Config;
    (function (Config) {
        Config.ENV = {
            isLoneStarRunning: false,
            apiEndPoint: 'https://dev-origin-uiservices.int.thomsonreuters.com/api/v1/',
            zuulEndPoint: '/zuul/dev2/workpaper-uiservices/api/v1/',
            directurl: '',
            attrEndPoint: 'https://dev-origin-attributes.int.thomsonreuters.com/api/v1/'
        };
    })(Config = Origin.Config || (Origin.Config = {}));
})(Origin || (Origin = {}));
/// <reference path="../config/env.config.ts" />
var Origin;
(function (Origin) {
    var AppComponentController = (function () {
        function AppComponentController(env, alertService) {
            this.env = env;
            this.alertService = alertService;
            this.isLoneStarRunning = this.env.isLoneStarRunning;
            this.origin = {
                alerts: []
            };
            this.alertService.originAlerts = this.origin.alerts;
        }
        AppComponentController.$inject = ['ENV', 'AlertService'];
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
    var Core;
    (function (Core) {
        var AuthTokenInterceptor = (function () {
            function AuthTokenInterceptor($q, $window, $cookies, $location) {
                var _this = this;
                this.$q = $q;
                this.$window = $window;
                this.$cookies = $cookies;
                this.$location = $location;
                this.key = 'auth-token';
                this.request = function (config) {
                    config.headers.Authorization = 'UDSLongToken ' + _this.getToken();
                    return config;
                };
                this.responseError = function (response) {
                    return _this.$q.reject(response);
                };
                this.store = this.$window.sessionStorage;
                this.initToken();
            }
            AuthTokenInterceptor.prototype.initToken = function () {
                var token = this.$cookies.get('UDSLongToken');
                if (!token) {
                    token = this.$location.search().UDSLongToken;
                }
                this.setToken(token);
            };
            AuthTokenInterceptor.prototype.getToken = function () {
                return this.store.getItem(this.key);
            };
            AuthTokenInterceptor.prototype.setToken = function (token) {
                if (token) {
                    this.store.setItem(this.key, token);
                }
                else {
                    this.store.removeItem(this.key);
                }
            };
            AuthTokenInterceptor.$inject = ['$q', '$window', '$cookies', '$location'];
            return AuthTokenInterceptor;
        }());
        Core.AuthTokenInterceptor = AuthTokenInterceptor;
    })(Core = Origin.Core || (Origin.Core = {}));
})(Origin || (Origin = {}));
/// <reference path="./auth_token.interceptor.ts" />
var Origin;
(function (Origin) {
    var Config;
    (function (Config) {
        var AuthConfig = (function () {
            function AuthConfig($urlRouterProvider, $translateProvider, $httpProvider) {
                this.$urlRouterProvider = $urlRouterProvider;
                this.$translateProvider = $translateProvider;
                this.$httpProvider = $httpProvider;
                this.$urlRouterProvider.otherwise('/wp');
                this.$httpProvider.interceptors.push('AuthTokenInterceptor');
            }
            AuthConfig.$inject = ['$urlRouterProvider', '$translateProvider', '$httpProvider'];
            return AuthConfig;
        }());
        Config.AuthConfig = AuthConfig;
    })(Config = Origin.Config || (Origin.Config = {}));
})(Origin || (Origin = {}));
var Origin;
(function (Origin) {
    var Config;
    (function (Config) {
        ;
        Config.OriConstant = {
            surl: '/api/navigation/v1/serviceurl',
            default_500_error_msg: "The server encountered an internal error and was unable to complete your request.",
            permissions: {
                CAN_SEE_ACTIVE_WORKPAPER: 'ActiveWorkpapersView',
                CAN_CREATE_AND_UPLOAD_WORKPAPER: 'CreateAndUploadNewWorkpapers',
                CAN_EDIT_WORKPAPER_ATTRIBUTE: 'EditWorkpaperAttributes',
                CAN_DELETE_WORKPAPER: 'DeleteWorkpapers',
                CAN_CREATE_FOLDER: 'CreateNewFoldersActiveWorkpapers',
                CAN_EDIT_FOLDER: 'EditFoldersActiveWorkpapers',
                CAN_DELETE_FOLDER: 'DeleteFoldersActiveWorkpapers',
                CAN_ADD_EDIT_DELETE_NOTES: 'AddUpdateDeleteWorkpaperNotes',
                CAN_VIEW_NOTES: 'ViewWorkpaperNotes',
                CAN_OVERRIDE_CHECKOUT: 'OverrideCheckout',
                CAN_LOCK_UNLOCK: 'LockUnlock',
                CAN_SEE_BATCHES: 'BatchesView',
                CAN_CREATE_EDIT_RUN_CANCELQUEUE_BATCH: 'CreateEditRunBatchesCancelQueuedBatches',
                CAN_DELETE_BATCH: 'DeleteSavedBatches',
                CAN_VIEW_ATTRIBUTES: 'AttributeManagementView',
                CAN_CREATE_EDIT_DELETE_ATTRIBUTES: 'CreateEditDeleteAttributes',
                CAN_PROVISION: 'Provisioning',
                IS_SUPER_ADMINISTRATOR: 'SuperAdministrator',
                IS_SUPPORT: 'Support',
                IS_IMPLEMENTER: 'Implementer'
            }
        };
    })(Config = Origin.Config || (Origin.Config = {}));
})(Origin || (Origin = {}));
var Origin;
(function (Origin) {
    var Model;
    (function (Model) {
        var IdName = (function () {
            function IdName() {
                this.id = 0;
            }
            IdName.prototype.createFromJson = function (data) {
                if (data) {
                    this.id = data.id;
                    this.name = data.name || data.displayvalue;
                    this.created = new Date(data.created);
                    this.createdby = data.createdby;
                    var lastmodified = data.lastmodified || data.lastprocessed;
                    this.lastmodified = lastmodified ? new Date(lastmodified) : undefined;
                    this.lastmodifiedby = data.lastmodifiedby || data.lastprocessedby;
                }
            };
            return IdName;
        }());
        Model.IdName = IdName;
    })(Model = Origin.Model || (Origin.Model = {}));
})(Origin || (Origin = {}));
/// <reference path="./idname.model.ts" />
var Origin;
(function (Origin) {
    var Model;
    (function (Model) {
        var Attribute = (function (_super) {
            __extends(Attribute, _super);
            function Attribute() {
                _super.call(this);
                this.type = 0;
                this.action = 'add';
                this.isincluded = false;
                this.sourcename = '';
                this.sourceid = 0;
                this.isrequired = false;
                this.isdefault = false;
                this.canremove = true;
                this.type = 0;
                this.uri = '';
                this.value = '';
            }
            Attribute.FromJson = function (data) {
                var newattribute = new Attribute();
                if (data) {
                    newattribute.createFromJson(data);
                    newattribute.action = 'none';
                    newattribute.isincluded = data.isincluded;
                    newattribute.sourcename = data.sourcename;
                    newattribute.sourceid = data.sourceid;
                    newattribute.isrequired = data.isrequired;
                    newattribute.isdefault = data.isdefault;
                    newattribute.canremove = data.canremove;
                    newattribute.type = data.type;
                    newattribute.uri = data.uri;
                    newattribute.value = data.value;
                }
                return newattribute;
            };
            return Attribute;
        }(Model.IdName));
        Model.Attribute = Attribute;
        var AttributeDataService = (function () {
            function AttributeDataService($q, env, htpMicroService) {
                this.$q = $q;
                this.env = env;
                this.htpMicroService = htpMicroService;
            }
            AttributeDataService.prototype.get = function () {
                var defer = this.$q.defer();
                var url = this.env.attrEndPoint + '/attributes';
                this.htpMicroService.get(url).then(function (res) {
                    defer.resolve(res.map(Attribute.FromJson));
                }, function (res) {
                    defer.reject(res);
                });
                return defer.promise;
            };
            AttributeDataService.$inject = ['$q', 'ENV', 'HttpMicroService'];
            return AttributeDataService;
        }());
        Model.AttributeDataService = AttributeDataService;
    })(Model = Origin.Model || (Origin.Model = {}));
})(Origin || (Origin = {}));
/// <reference path="../app/app.component.tpl.ts" />
/// <reference path="../models/attribute.model.ts" />
/// <reference path="./constants.ts" />
var Origin;
(function (Origin) {
    var Config;
    (function (Config) {
        var RouteConfig = (function () {
            function RouteConfig($stateProvider, $urlRouterProvider) {
                var _this = this;
                this.$stateProvider = $stateProvider;
                this.$urlRouterProvider = $urlRouterProvider;
                this.workpaperState = function () {
                    var _self = _this;
                    return {
                        url: '/workpapers',
                        views: {
                            'mainView@wp': {
                                template: '<workpaper authorize="$resolve.authorize" customattributes="$resolve.customattributes"></workpaper>',
                                resolve: {
                                    authorize: ['AuthorizationService', function (authorizationService) {
                                            var x = authorizationService.hasPermission(Config.OriConstant.permissions.CAN_SEE_ACTIVE_WORKPAPER);
                                            return x;
                                        }],
                                    customattributes: ['AttributeDataService', '$q', function (AttributeDataService, $q) {
                                            var x = _self.getColumnDefinitionsForWorkpaper(AttributeDataService, $q);
                                            return x;
                                        }]
                                }
                            }
                        }
                    };
                };
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
            RouteConfig.prototype.getColumnDefinitionsForWorkpaper = function (attributeDataService, $q) {
                var columns = [{
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
                var addtocolumns = function (attr) {
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
                attributeDataService.get().then(function (res) {
                    res.map(addtocolumns);
                    defer.resolve(columns);
                }, function (reason) { });
                return defer.promise;
            };
            ;
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
    var Core;
    (function (Core) {
        (function (AlertType) {
            AlertType[AlertType["danger"] = 0] = "danger";
            AlertType[AlertType["info"] = 1] = "info";
            AlertType[AlertType["warning"] = 2] = "warning";
            AlertType[AlertType["success"] = 3] = "success";
        })(Core.AlertType || (Core.AlertType = {}));
        var AlertType = Core.AlertType;
        var AlertService = (function () {
            function AlertService(env, $injector) {
                this.env = env;
                this.$injector = $injector;
            }
            AlertService.prototype.addAlert = function (type, message, timeout) {
                var defaultTimeout = timeout || 5000;
                if (this.env.isLoneStarRunning) {
                    var $loneStarAlertService = this.$injector.get('$lonestarAlerts');
                    if ($loneStarAlertService) {
                        $loneStarAlertService.post(type, message, defaultTimeout);
                    }
                }
                else {
                    if (this.originAlerts) {
                        this.clearAlerts();
                        this.originAlerts.alerts.push({
                            type: type,
                            msg: message,
                            closeable: true,
                            timeout: defaultTimeout
                        });
                    }
                }
            };
            ;
            AlertService.prototype.closeAlert = function (index) {
                if (!this.env.isLoneStarRunning) {
                    this.originAlerts.alerts.splice(index, 1);
                }
            };
            ;
            AlertService.prototype.clearAlerts = function () {
                if (!this.env.isLoneStarRunning) {
                    if (this.originAlerts) {
                        this.originAlerts.alerts = [];
                    }
                }
            };
            AlertService.$inject = ['ENV', '$injector'];
            return AlertService;
        }());
        Core.AlertService = AlertService;
    })(Core = Origin.Core || (Origin.Core = {}));
})(Origin || (Origin = {}));
var Origin;
(function (Origin) {
    var Core;
    (function (Core) {
        var OriginAnalytics = (function () {
            function OriginAnalytics(env, $analytics) {
                this.env = env;
                this.$analytics = $analytics;
            }
            OriginAnalytics.prototype.trackEvent = function (action, category, label) {
                if (this.env.isLoneStarRunning) {
                    this.$analytics.eventTrack(action, {
                        'product': 'WorkpaperManager',
                        'category': category,
                        'label': label
                    });
                }
            };
            OriginAnalytics.$inject = ['ENV', '$analytics'];
            return OriginAnalytics;
        }());
        Core.OriginAnalytics = OriginAnalytics;
    })(Core = Origin.Core || (Origin.Core = {}));
})(Origin || (Origin = {}));
var Origin;
(function (Origin) {
    var Core;
    (function (Core) {
        ;
        var AppService = (function () {
            function AppService() {
            }
            AppService.prototype.getOtpInstanceid = function () {
                return this._otpInstanceId;
            };
            AppService.prototype.setOtpInstanceid = function (instance) {
                this._otpInstanceId = instance;
            };
            AppService.prototype.convertFileSize = function (size) {
                if (size === 0) {
                    return '0 Byte';
                }
                var k = 1024; // or 1024 for binary
                var dm = 2;
                var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                var i = Math.floor(Math.log(size) / Math.log(k));
                return parseFloat((size / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            };
            ;
            return AppService;
        }());
        Core.AppService = AppService;
    })(Core = Origin.Core || (Origin.Core = {}));
})(Origin || (Origin = {}));
var Origin;
(function (Origin) {
    var Model;
    (function (Model) {
        var UserPermission = (function () {
            function UserPermission() {
            }
            UserPermission.FromJson = function (data) {
                var newPermission = new UserPermission();
                if (data) {
                    newPermission.pid = data.pid;
                    newPermission.pt = data.pt;
                    newPermission.hv = data.hv;
                    newPermission.v = data.v;
                }
                return newPermission;
            };
            return UserPermission;
        }());
        Model.UserPermission = UserPermission;
    })(Model = Origin.Model || (Origin.Model = {}));
})(Origin || (Origin = {}));
/// <reference path="./idname.model.ts" />
var Origin;
(function (Origin) {
    var Model;
    (function (Model) {
        var Client = (function (_super) {
            __extends(Client, _super);
            function Client() {
                _super.call(this);
                this.isdefaultinstance = false;
                this.ismasterfirm = false;
                this.issupportfirm = false;
                this.products = [];
                this.accountid = '';
                this.instance = '';
                this.isdefaultinstance = false;
                this.schema = '';
                this.ismasterfirm = false;
                this.issupportfirm = false;
                this.products = [];
            }
            Client.FromJson = function (data) {
                var newClient = new Client();
                if (data) {
                    newClient.createFromJson(data);
                    newClient.accountid = data.accountid;
                    newClient.instance = data.instance;
                    newClient.isdefaultinstance = data.isdefaultinstance;
                    newClient.schema = data.schema;
                    newClient.ismasterfirm = data.ismasterfirm;
                    newClient.issupportfirm = data.issupportfirm;
                }
                return newClient;
            };
            return Client;
        }(Model.IdName));
        Model.Client = Client;
    })(Model = Origin.Model || (Origin.Model = {}));
})(Origin || (Origin = {}));
/// <reference path="./idname.model.ts" />
/// <reference path="./user_permission.model.ts" />
/// <reference path="./client.model.ts" />
var Origin;
(function (Origin) {
    var Model;
    (function (Model) {
        var User = (function (_super) {
            __extends(User, _super);
            function User() {
                _super.call(this);
                this.firm = {};
                this.permissions = [];
                this.firmid = 0;
            }
            User.FromJson = function (data) {
                var user = new User();
                if (data) {
                    user.createFromJson(data);
                    user.displayvalue = data.displayvalue;
                    user.loginname = data.loginname;
                    user.permission = data.permission;
                    user.permissionstring = data.permissionstring;
                    user.firmid = data.firmid;
                    user.firm = data.firm ? Model.Client.FromJson(data) : {};
                    user.permissions = data.permissions ? data.permissions.map(Model.UserPermission.FromJson) : [];
                }
                return user;
            };
            return User;
        }(Model.IdName));
        Model.User = User;
        var UserDataService = (function () {
            function UserDataService($q, httpService) {
                var _this = this;
                this.$q = $q;
                this.httpService = httpService;
                this.subscribe = function (callback) {
                    _this.callbacks.push(callback);
                };
                this.publish = function () {
                    angular.forEach(_this.callbacks, function (callback) {
                        callback();
                    });
                };
                this.save = function (user) {
                    var _self = _this;
                    var defer = _this.$q.defer();
                    _this.httpService.post('firms/saveuserpermission', user).then(function (res) {
                        _self.publish();
                        defer.resolve(res);
                    }, function (res) {
                        defer.reject(res);
                    });
                    return defer.promise;
                };
            }
            UserDataService.prototype.getUserRoles = function (user) {
                var defer = this.$q.defer();
                this.httpService.get('firms/getallpermissions?firmId=' + user.firmid).then(function (res) {
                    var freshuserroles = res;
                    defer.resolve(angular.copy(freshuserroles));
                }, function () {
                });
                return defer.promise;
            };
            UserDataService.prototype.GetCurrentUser = function () {
                // var defer = $q.defer();
                var _self = this;
                if (!this.loggedinUser && !this.userPromise) {
                    this.userPromise = this.$q.defer();
                    this.httpService.get('security/userpermissions').then(function (res) {
                        _self.loggedinUser = res;
                        _self.userPromise.resolve(res);
                    }, function (res) {
                        _self.userPromise.reject(res);
                    });
                }
                else if (this.loggedinUser) {
                    this.userPromise.resolve(this.loggedinUser);
                }
                return this.userPromise.promise;
            };
            ;
            UserDataService.prototype.LogOffCurrentUser = function () {
                this.loggedinUser = null;
                this.userPromise = null;
            };
            ;
            UserDataService.prototype.getAll = function (firmid, force) {
                var defer = this.$q.defer();
                var data = {};
                if (firmid) {
                    data = {
                        id: firmid
                    };
                }
                this.httpService.post('firms/users', data).then(function (res) {
                    var freshusers = res.map(this.fromJson);
                    defer.resolve(angular.copy(freshusers));
                }, function (res) {
                    defer.reject(res);
                });
                return defer.promise;
            };
            UserDataService.$inject = ['$q', 'HttpService'];
            return UserDataService;
        }());
        Model.UserDataService = UserDataService;
    })(Model = Origin.Model || (Origin.Model = {}));
})(Origin || (Origin = {}));
/// <reference path="../models/user.model.ts" />
var Origin;
(function (Origin) {
    var Core;
    (function (Core) {
        ;
        var AuthorizationService = (function () {
            function AuthorizationService($q, UserService) {
                this.$q = $q;
                this.UserService = UserService;
            }
            AuthorizationService.prototype.hasPermission = function (permissionid) {
                var defer = this.$q.defer();
                var isPermissionExist = function (permissionToCheck, permissionList) {
                    var permissionIndex = permissionList.isExist('pid', permissionToCheck);
                    if (permissionIndex < 0) {
                        return false;
                    }
                    else {
                        if (permissionList[permissionIndex] || permissionList[permissionIndex].hv) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                };
                if (!permissionid) {
                    defer.reject('Unauthorize');
                }
                else {
                    this.UserService.GetCurrentUser().then(function (res) {
                        if (!res) {
                            defer.reject('Unauthorize');
                        }
                        else {
                            var permissions_1 = res.permissions;
                            if (!permissions_1) {
                                defer.reject('Unauthorize');
                            }
                            else {
                                var permissionstocheck = permissionid.split(',');
                                if (angular.isArray(permissionstocheck)) {
                                    var keepgoing_1 = true;
                                    angular.forEach(permissionstocheck, function (value, key) {
                                        if (keepgoing_1) {
                                            var x = isPermissionExist(value.trim(), permissions_1);
                                            if (x) {
                                                keepgoing_1 = false;
                                            }
                                        }
                                    });
                                    if (keepgoing_1) {
                                        defer.reject('Unauthorize');
                                    }
                                    else {
                                        defer.resolve(true);
                                    }
                                }
                                else {
                                    isPermissionExist(permissionstocheck, permissions_1) ?
                                        defer.resolve(true) : defer.reject('Unauthorize');
                                }
                            }
                        }
                    }, function (res) {
                        defer.reject('Unauthorize');
                    });
                }
                return defer.promise;
            };
            AuthorizationService.$inject = ['$q', 'UserDataService'];
            return AuthorizationService;
        }());
        Core.AuthorizationService = AuthorizationService;
    })(Core = Origin.Core || (Origin.Core = {}));
})(Origin || (Origin = {}));
/// <reference path="./app.service.ts" />
var Origin;
(function (Origin) {
    var Core;
    (function (Core) {
        var CustomInterceptor = (function () {
            function CustomInterceptor($q, $cookies, appService) {
                var _this = this;
                this.$q = $q;
                this.$cookies = $cookies;
                this.appService = appService;
                this.request = function (config) {
                    var language = _this.$cookies.get('LSLanguage');
                    language = language || 'en-US';
                    config.headers['LSLanguage'] = language;
                    var instance = _this.appService.getOtpInstanceid();
                    if (instance) {
                        config.headers['TRTA-OTP-INSTANCE'] = instance;
                    }
                    return config;
                };
                this.responseError = function (response) {
                    return _this.$q.reject(response);
                };
            }
            CustomInterceptor.$inject = ['$q', '$cookies', 'AppService'];
            return CustomInterceptor;
        }());
        Core.CustomInterceptor = CustomInterceptor;
    })(Core = Origin.Core || (Origin.Core = {}));
})(Origin || (Origin = {}));
/// <reference path="../config/env.config.ts" />
var Origin;
(function (Origin) {
    var Core;
    (function (Core) {
        var OriginDem = (function () {
            function OriginDem(env, $injector, $q) {
                this.env = env;
                this.$injector = $injector;
                this.$q = $q;
            }
            OriginDem.prototype.getSessionId = function () { };
            ;
            OriginDem.prototype.getGUID = function () { };
            OriginDem.prototype.subscribe = function (servicename, callback) {
            };
            OriginDem.prototype.unsubscribe = function (subscriberid, servicename) { };
            OriginDem.$inject = ['ENV', '$injector', '$q'];
            return OriginDem;
        }());
        Core.OriginDem = OriginDem;
    })(Core = Origin.Core || (Origin.Core = {}));
})(Origin || (Origin = {}));
var Origin;
(function (Origin) {
    var Core;
    (function (Core) {
        ;
        var FormDataService = (function () {
            function FormDataService($http, $q, constant, env, originAppService, $cookies, $injector) {
                this.$http = $http;
                this.$q = $q;
                this.constant = constant;
                this.env = env;
                this.originAppService = originAppService;
                this.$cookies = $cookies;
                this.$injector = $injector;
            }
            FormDataService.prototype.getTokenAndAccountId = function () {
                var defer = this.$q.defer();
                var response = {};
                if (this.env.isLoneStarRunning) {
                    var $lonestarUser = this.$injector.get('$lonestarUser');
                    var $lonestarConfig = this.$injector.get('$lonestarConfig');
                    var user = $lonestarUser.user;
                    response.udsLongToken = user.udsLongToken;
                    response.accountid = $lonestarUser.subAccountId || user.clientId;
                    response.firmid = $lonestarConfig.firmId;
                    var subClient = $lonestarConfig.selectedSubClient;
                    if (subClient) {
                        response.cmid = subClient.id;
                    }
                    defer.resolve(response);
                }
                else {
                    response.udsLongToken = this.$cookies.get('UDSLongToken');
                    response.accountid = '';
                    response.firmid = '';
                    defer.resolve(response);
                }
                return defer.promise;
            };
            FormDataService.prototype.uploadFile = function (url, formData) {
                var deferred = this.$q.defer();
                var instance = this.originAppService.getOtpInstanceid();
                function uploadComplete(e) {
                    deferred.resolve(JSON.parse(e.target.responseText));
                }
                function uploadFailed(e) {
                    deferred.reject('Failed to post');
                }
                this.getTokenAndAccountId().then(function (response) {
                    var xhr = new XMLHttpRequest();
                    xhr.addEventListener('load', uploadComplete);
                    xhr.addEventListener('error', uploadFailed, false);
                    xhr.open('POST', url);
                    xhr.setRequestHeader('Authorization', 'UDSLongToken ' + response.udsLongToken);
                    xhr.setRequestHeader('X-LoneStar-AccountId', response.accountid);
                    xhr.setRequestHeader('X-LoneStar-Product-FirmId', response.firmid);
                    if (response.cmid) {
                        xhr.setRequestHeader('X-LoneStar-CMId', response.cmid);
                    }
                    xhr.setRequestHeader('Accept', 'application/json');
                    var language = this.$cookies.get('LSLanguage');
                    language = language || 'en-US';
                    xhr.setRequestHeader('LSLanguage', language);
                    if (instance) {
                        xhr.setRequestHeader('TRTA-OTP-INSTANCE', instance);
                    }
                    xhr.send(formData);
                }, function (response) {
                    deferred.reject('Failed to get token');
                });
                return deferred.promise;
            };
            FormDataService.$inject = ['$http', '$q', 'Constant', 'ENV', 'AppService', '$cookies', '$injector'];
            return FormDataService;
        }());
        Core.FormDataService = FormDataService;
    })(Core = Origin.Core || (Origin.Core = {}));
})(Origin || (Origin = {}));
String.prototype.endsWith = function (searchString, position) {
    var subjectString = this.toString();
    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
    }
    position -= searchString.length;
    var lastIndex = subjectString.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
};
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] !== 'undefined' ? args[number] : match;
    });
};
Array.prototype.moveup = function (index, by) {
    var newIndex = index - (by || 1);
    if (newIndex <= -1) {
        newIndex = 0;
    }
    var selectedItem = this[index];
    this.splice(index, 1);
    this.splice(newIndex, 0, selectedItem);
};
Array.prototype.moveDown = function (index, by) {
    var newIndex = index + (by || 1);
    if (newIndex > this.length - 1) {
        newIndex = this.length - 1;
    }
    var selectedItem = this[index];
    this.splice(index, 1);
    this.splice(newIndex, 0, selectedItem);
};
Array.prototype.applyToAll = function (propertyName, value) {
    if (propertyName) {
        for (var i = 0; i < this.length; i++) {
            this[i][propertyName] = value;
        }
    }
};
Array.prototype.isExist = function (propertyName, value) {
    if (propertyName) {
        var i = this.length;
        while (i--) {
            if (this[i][propertyName] === value) {
                return i;
            }
        }
    }
    return -1;
};
Array.prototype.addIfNotExist = function (item, propertyName) {
    if (item && propertyName) {
        if (this.isExist(propertyName, item[propertyName]) < 0) {
            this.push(item);
        }
    }
};
Array.prototype.removeItem = function (item, propertyName) {
    if (item && propertyName) {
        var index = this.isExist(propertyName, item[propertyName]);
        if (index > -1) {
            this.splice(index, 1);
        }
    }
};
var Origin;
(function (Origin) {
    var Core;
    (function (Core) {
        var HttpMicroService = (function () {
            function HttpMicroService($q, $http, env) {
                var _this = this;
                this.$q = $q;
                this.$http = $http;
                this.env = env;
                this.incmntClockCount = function () {
                    var showBusyLoader = function () {
                        if (_this.clockCount <= 0) {
                            _this.busyLoader.show(150);
                        }
                    };
                    showBusyLoader();
                    _this.clockCount = _this.clockCount + 1;
                };
                this.decmntClockCount = function () {
                    var hideBusyLoader = function () {
                        _this.busyLoader.hide();
                    };
                    _this.clockCount = _this.clockCount - 1;
                    if (_this.clockCount <= 0) {
                        hideBusyLoader();
                    }
                };
                this.handleErrors = function (response) {
                };
                this.get = function (url, parameters, hideBusyLoader) {
                    var _self = _this;
                    _self.incmntClockCount();
                    var deferred = _self.$q.defer();
                    //getServiceUrl().then(function (res) {
                    url = _self.addTimeStampParam(url);
                    _self.$http({
                        method: 'GET',
                        url: url,
                        params: parameters
                    }).then(function (response) {
                        _self.decmntClockCount();
                        deferred.resolve(response.data);
                    }, function (response) {
                        _self.decmntClockCount();
                        _self.handleErrors(response);
                        deferred.reject(response);
                    });
                    return deferred.promise;
                };
            }
            HttpMicroService.prototype.addTimeStampParam = function (url) {
                var getnewparm = function () {
                    return 'qcnp =' + new Date().getTime();
                };
                if (url.indexOf('?') > 0) {
                    url += '&' + getnewparm();
                }
                else {
                    url += '?' + getnewparm();
                }
                return url;
            };
            HttpMicroService.$inject = ['$q', '$http', 'ENV'];
            return HttpMicroService;
        }());
        Core.HttpMicroService = HttpMicroService;
    })(Core = Origin.Core || (Origin.Core = {}));
})(Origin || (Origin = {}));
/// <reference path="../config/env.config.ts" />
/// <reference path="../core/app.service.ts" />
/// <reference path="../core/alert.service.ts" />
/// <reference path="../core/formData.service.ts" />
/// <reference path="../config/constants.ts" />
var Origin;
(function (Origin) {
    var Core;
    (function (Core) {
        var HttpService = (function () {
            function HttpService($http, $q, env, $window, $bentoBusyLoader, $injector, $cookies, alertService, constants, $translate, formDataService, originAppService) {
                var _this = this;
                this.$http = $http;
                this.$q = $q;
                this.env = env;
                this.$window = $window;
                this.$bentoBusyLoader = $bentoBusyLoader;
                this.$injector = $injector;
                this.$cookies = $cookies;
                this.alertService = alertService;
                this.constants = constants;
                this.$translate = $translate;
                this.formDataService = formDataService;
                this.originAppService = originAppService;
                this.handleErrors = function (response) {
                };
                this.getServiceUrl = function () {
                    var def = _this.$q.defer();
                    if (!_this.surl) {
                        _this.$http({
                            method: 'GET',
                            url: _this.surl
                        }).then(function (response) {
                            this.serviceurl = response.data.replace('"', '').replace('"', '');
                            def.resolve(this.serviceurl);
                        }, function (response) {
                            this.handleErrors(response);
                            def.reject('failed to getserviceurl');
                        });
                    }
                    else {
                        def.resolve(_this.surl);
                    }
                    return def.promise;
                };
                this.get = function (url, parameters, hideBusyLoader) {
                    var _self = _this;
                    var deferred = _this.$q.defer();
                    if (!url) {
                        deferred.reject('Unspecified url');
                        return deferred.promise;
                    }
                    if (!hideBusyLoader) {
                        _this.incmntClockCount();
                    }
                    _this.getServiceUrl().then(function (res) {
                        url = _self.addTimeStampParam(res + url);
                        _self.$http({
                            method: 'GET',
                            url: url,
                            params: parameters
                        }).then(function (response) {
                            if (!hideBusyLoader) {
                                _self.decmntClockCount();
                            }
                            deferred.resolve(response.data);
                        }, function (response) {
                            if (!hideBusyLoader) {
                                _self.decmntClockCount();
                            }
                            _self.handleErrors(response);
                        });
                    });
                    return deferred.promise;
                };
                this.surl = this.env.apiEndPoint;
                this.zuulurl = this.env.zuulEndPoint;
                this.serviceurl = '';
                this.clockCount = 0;
                this.busyLoader = this.$bentoBusyLoader.getNewLoader('body');
            }
            HttpService.prototype.showAlert = function (msg) {
                if (msg && msg.data && msg.data.message) {
                    this.$translate('UnauthorizedAccess').then(function (message) {
                        if (message === msg.data.message) {
                            this.alertService.addAlert('error', message, 15000);
                        }
                        else {
                            this.alertService.addAlert('error', msg && msg.data && msg.data.message);
                        }
                    });
                }
                else {
                    this.alertService.addAlert(Origin.Core.AlertType.danger, this.constants.default_500_error_msg);
                }
            };
            HttpService.prototype.incmntClockCount = function () {
                var _this = this;
                var showBusyLoader = function () {
                    if (_this.clockCount <= 0) {
                        _this.busyLoader.show(150);
                    }
                };
                showBusyLoader();
                this.clockCount = this.clockCount + 1;
            };
            ;
            HttpService.prototype.decmntClockCount = function () {
                var _this = this;
                var hideBusyLoader = function () {
                    _this.busyLoader.hide();
                };
                this.clockCount = this.clockCount - 1;
                if (this.clockCount <= 0) {
                    hideBusyLoader();
                }
            };
            ;
            HttpService.prototype.addTimeStampParam = function (url) {
                var getnewparm = function () {
                    return 'qcnp =' + new Date().getTime();
                };
                if (url.indexOf('?') > 0) {
                    url += '&' + getnewparm();
                }
                else {
                    url += '?' + getnewparm();
                }
                return url;
            };
            ;
            HttpService.prototype.post = function (url, data, hideBusyLoader, rejectError, useZuul) {
                if (!hideBusyLoader) {
                    this.incmntClockCount();
                }
                var deferred = this.$q.defer();
                this.getServiceUrl().then(function (res) {
                    if (useZuul) {
                        url = this.directurl + url;
                    }
                    else {
                        url = res + url;
                    }
                    this.$http({
                        method: 'POST',
                        url: url,
                        data: data
                    }).then(function (response) {
                        if (!hideBusyLoader) {
                            this.decmntClockCount();
                        }
                        deferred.resolve(response.data);
                    }, function (response) {
                        if (!hideBusyLoader) {
                            this.decmntClockCount();
                        }
                        if (!rejectError) {
                            this.handleErrors(response);
                        }
                        else {
                            deferred.reject(response);
                        }
                    });
                });
                return deferred.promise;
            };
            ;
            HttpService.prototype.put = function () { };
            ;
            HttpService.prototype.delete = function () { };
            ;
            HttpService.prototype.UploadForm = function (url, formData) {
                this.incmntClockCount();
                var deferred = this.$q.defer();
                //getServiceUrl().then(function(res) {
                url = this.directurl + url;
                this.formDataService.uploadFile(url, formData).then(function (response) {
                    this.decmntClockCount();
                    deferred.resolve(response);
                }, function (reason) {
                    this.decmntClockCount();
                    deferred.reject('Failed to post file to the server');
                });
                return deferred.promise;
            };
            ;
            HttpService.prototype.DownloadFile = function (url) {
                this.getServiceUrl().then(function (res) {
                    var instance = this.originAppService.getInstanceId();
                    this.formDataService.getToken().then(function (response) {
                        url = res + url + '?UDSLongToken=' + response.udsLongToken;
                        if (instance) {
                            url = url + '&instance=' + instance;
                        }
                        if (this.env.isLoneStarRunning) {
                            url = url + '&LoneStarAccountId=' + response.accountid + '&LoneStarProductFirmId=' + response.firmid;
                            if (response.cmid) {
                                url = url + '&LonestarCmId=' + response.cmid;
                            }
                        }
                        this.$window.location = url;
                    }, function (response) {
                    });
                });
            };
            HttpService.$inject = ['$http', '$q', 'ENV', '$window', '$bentoBusyLoader', '$injector', '$cookies', 'AlertService', 'Constant', '$translate', 'FormDataService', 'AppService'];
            return HttpService;
        }());
        Core.HttpService = HttpService;
    })(Core = Origin.Core || (Origin.Core = {}));
})(Origin || (Origin = {}));
var Origin;
(function (Origin) {
    var Core;
    (function (Core) {
        var PermissionDirective = (function () {
            function PermissionDirective(authorizationService) {
                this.authorizationService = authorizationService;
                this.restrict = 'A';
                this.scope = false;
            }
            PermissionDirective.prototype.link = function ($scope, element, attributes) {
                var permission = attributes.hasPermission;
                element.removeAttr('has-permission');
                this.authorizationService.hasPermission(permission).then(function () {
                    element.removeClass('ng-hide');
                }, function () {
                    element.remove();
                });
            };
            PermissionDirective.$inject = ['AuthorizationService'];
            return PermissionDirective;
        }());
        Core.PermissionDirective = PermissionDirective;
    })(Core = Origin.Core || (Origin.Core = {}));
})(Origin || (Origin = {}));
var Origin;
(function (Origin) {
    var Home;
    (function (Home) {
        Home.hometemplate = "\n        <style type=\"text/css\">\n            .btn.btn-lg.wp-home-main-link-button {\n                width: 150px;\n                max-width: 100%;\n                padding: 0;\n                background-color: #ff8000;\n                border-color: transparent;\n                font-weight: 500;\n            }\n            \n            .wp-home-addin-download-icon {\n                font-size: 30px;\n                color: green;\n                margin-top: 14px;\n                margin-right: 10px;\n            }\n            \n            .wp-home-addin-download-div-outer {\n                padding: 5px;\n                float: left;\n            }\n            \n            .wp-home-addin-download-div-text {\n                width: 300px;\n                margin: 0 auto;\n            }\n            \n            .homepagetext {\n                font-size: 18px;\n                margin-top: 50px;\n                float: left;\n                line-height: 22px;\n            }\n        </style>\n        <div class=\"view-workpapers\">\n            <div class=\"col-md-12\">\n                <div class=\"col-md-6 homepagetext\">\n                    <span translate=\"onesource\" class=\"strong\"> </span>\n                    <span translate=\"homepagetext\"></span>\n                    <span translate=\"onesource\" class=\"strong\"> </span>\n                    <span translate=\"homepagetext2\"></span>\n                </div>\n            </div>\n            <div class=\"\" style=\"margin-top: 30px; padding-left: 15px;\">\n                <div class=\"wp-home-addin-download-div-outer col-md-12\">\n                    <div class=\"bento-icon-file-excel pull-left wp-home-addin-download-icon\"></div>\n                    <div class=\"\" style=\"margin-top: 20px\">\n                        <div style=\"font-size: 16px;\">\n                            <span data-translate=\"DownloadPluginInfo\"></span>\n                            <sapn translate=\"onesource\" class=\"strong\"></sapn>\n                            <span translate=\"DownloadPluginInfo1\"></span>\n                        </div>\n                        <div style=\"margin-top: 20px;\">\n                            <button ng-click=\"downloadExcelAddin()\" class=\"btn btn-lg btn-primary wp-home-main-link-button\" style=\"\" translate=\"DownloadExcelAddin\"></button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ";
    })(Home = Origin.Home || (Origin.Home = {}));
})(Origin || (Origin = {}));
/// <reference path="./home.component.tpl.ts" />
var Origin;
(function (Origin) {
    var Home;
    (function (Home_1) {
        var HomeController = (function () {
            function HomeController(httpService, userDataService) {
                this.httpService = httpService;
                this.userDataService = userDataService;
            }
            HomeController.prototype.downloadExcelAddin = function () {
                this.httpService.DownloadFile('support/downloadaddin');
            };
            HomeController.prototype.$onDestroy = function () {
                this.userDataService.LogOffCurrentUser();
            };
            HomeController.$inject = ['HttpService', 'UserDataService'];
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
/// <reference path="../config/env.config.ts" />
var Origin;
(function (Origin) {
    var Nav;
    (function (Nav) {
        var NavigationComponent = (function () {
            function NavigationComponent(env, $injector) {
                this.env = env;
                this.$injector = $injector;
                if (this.env.isLoneStarRunning) {
                    this.$lonestarConfig = $injector.get('$lonestarConfig');
                    if (this.$lonestarConfig) {
                        this.isCMButtonVisible = this.$lonestarConfig.shouldShowClientSelector;
                        this.selectedSubClient = this.$lonestarConfig.selectedSubClient;
                    }
                }
            }
            NavigationComponent.prototype.showCMdialog = function () {
                if (this.env.isLoneStarRunning && this.$lonestarConfig) {
                    this.$lonestarConfig.showClientSelector();
                }
            };
            NavigationComponent.$inject = ['ENV', '$injector'];
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
/// <reference path="./core/global.functions.ts" />
/// <reference path="./app/app.component.ts" />
/// <reference path="./home/home.component.ts" />
/// <reference path="./topnavigation/nav.component.ts" />
/// <reference path="./models/user.model.ts" />
/// <reference path="./config/constants.ts" />
/// <reference path="./config/env.config.ts" />
/// <reference path="./core/custom_interceptor.ts" />
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
                    'bento.modern',
                    'ngCookies'
                ]);
                this.module
                    .constant('Constant', Origin.Config.OriConstant)
                    .constant('ENV', Origin.Config.ENV)
                    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
                        return new Origin.Config.RouteConfig($stateProvider, $urlRouterProvider);
                    }])
                    .config(['$httpProvider', function ($httpProvider) {
                        $httpProvider.interceptors.push('CustomInterceptor');
                    }])
                    .config(['$httpProvider', 'ENV', '$urlRouterProvider', '$translateProvider', function ($httpProvider, env, $urlRouterProvider, $translateProvider) {
                        if (!env.isLoneStarRunning) {
                            return new Origin.Config.AuthConfig($urlRouterProvider, $translateProvider, $httpProvider);
                        }
                    }]);
                this._module.component('originapp', new Origin.App())
                    .component('home', new Origin.Home.Home())
                    .component('nav', new Origin.Nav.Navigation())
                    .component('workpaper', new Origin.Component.Workpaper())
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
                    .directive('hasPermission', ['AuthorizationService', function (authorizationService) { return new Origin.Core.PermissionDirective(authorizationService); }]);
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
        Nav.navtemplate = "\n        <div class=\"\">\n            <div bento-nav-toolbar class=\"navbar-navbar navbar-default bento-toolbar global-subnav\">\n                <ul class=\"nav navbar-nav\">\n                    <li ng-if=\"isCMButtonVisible && selectedSubClient\" style=\"padding-right: 17px; border-right: 1px solid #777\">\n                        <button type=\"button\" class=\"btn btn-icon btn-primary btn-md\" ng-click=\"showCMdialog()\" style=\"\n                                                                            padding: 16px 0px;\n                                                                            padding-left: 16px!Important;\n                                                                            padding-right: 16px!Important;\n                                                                            color: #3c3e45;\n                                                                            margin-left: 15px;\n                                                                            border: 1px solid #ccc;\n                                                                            border-radius: 7px;\n                                                                            background-color: #fff;\n                                                                            height: 30px;\n                                                                            line-height: 30px;\n                                                                            margin-top: 5px;\n                                                                        \">{{selectedSubClient.name | limitTo: 35 }}{{selectedSubClient.length > 35 ? '...' : ''}}</button>\n                    </li>\n                    <li ui-sref-active=\"active\">\n                        <a ui-sref=\"wp.home\" style=\"outline: 0\" data-translate=\"Home\" analytics-on=\"click\" analytics-product=\"Workpapers\" analytics-category=\"Navigation Menu\"\n                            analytics-label=\"Home\"></a>\n                    </li>\n                    <li has-permission=\"ActiveWorkpapersView\" ui-sref-active=\"active\" class=\"ng-hide\">\n                        <a ui-sref=\"wp.workpapers\" style=\"outline: 0\" data-translate=\"Workpapers\" analytics-on=\"click\" analytics-product=\"Workpapers\"\n                            analytics-category=\"Navigation Menu\" analytics-label=\"Active Workpapers\"></a>\n                    </li>\n                    <li ui-sref-active=\"active\" class=\"\">\n                        <a ui-sref=\"wp.attachments\" style=\"outline: 0\" data-translate=\"Attachments\" analytics-on=\"click\" analytics-product=\"Workpapers\"\n                            analytics-category=\"Navigation Menu\" analytics-label=\"Attachments\"></a>\n                    </li>\n                    <li has-permission=\"BatchesView\" ui-sref-active=\"active\" class=\"ng-hide\">\n                        <a ui-sref='wp.batches' style=\"outline: 0\" data-translate=\"Batches\" analytics-on=\"click\" analytics-product=\"Workpapers\" analytics-category=\"Navigation Menu\"\n                            analytics-label=\"Batches\"></a>\n                    </li>\n                    <li ui-sref-active=\"active\">\n                        <a ui-sref=\"wp.plugin\" style=\"outline: 0\" data-translate=\"Support\" analytics-on=\"click\" analytics-product=\"Workpapers\" analytics-category=\"Navigation Menu\"\n                            analytics-label=\"Support\"></a>\n                    </li>\n                    <li>\n                        <a ui-sref=\"wp.help\" style=\"outline: 0\" data-translate=\"Help\" analytics-on=\"click\" analytics-product=\"Workpapers\" analytics-category=\"Navigation Menu\"\n                            analytics-label=\"Help\"></a>\n                    </li>\n                </ul>\n                <ul class=\"nav navbar-nav navbar-right ng-hide\" has-permission='SuperAdministrator, Provisioning, AttributeManagementView'>\n                    <li class=\"dropdown\" uib-dropdown style=\"min-height: 40px;\" is-open=\"isNavCogOpen\">\n                        <a href=\"\" class=\"dropdown-toggle\" uib-dropdown-toggle><i class=\"bento-icon-cog\"></i></a>\n                        <ul class=\"dropdown-menu\">\n                            <li has-permission=\"AttributeManagementView\" ui-sref-active=\"active\" class=\"ng-hide\">\n                                <a ui-sref=\"wp.attributemanagement\" style=\"outline: 0\" data-translate=\"AttributeManagement\"></a>\n                            </li>\n                            <li has-permission='SuperAdministrator, Provisioning' ui-sref-active=\"active\" class=\"ng-hide\">\n                                <a ui-sref=\"wp.clients\" style=\"outline: 0\" data-translate=\"Clients\"></a>\n                            </li>\n                        </ul>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    ";
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
    var Component;
    (function (Component) {
        var WorkpaperController = (function () {
            function WorkpaperController() {
                this.$onChanges = function (changes) {
                    console.log(changes);
                };
                console.log(this.authorize);
            }
            return WorkpaperController;
        }());
        Component.WorkpaperController = WorkpaperController;
        var Workpaper = (function () {
            function Workpaper() {
                this.bindings = {
                    authorize: '<',
                    customattributes: '<'
                };
                this.controller = WorkpaperController;
                this.template = Origin.Workpaper.wptemplate;
            }
            return Workpaper;
        }());
        Component.Workpaper = Workpaper;
    })(Component = Origin.Component || (Origin.Component = {}));
})(Origin || (Origin = {}));
//# sourceMappingURL=wp.js.map