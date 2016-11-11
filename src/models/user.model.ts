/// <reference path="./idname.model.ts" />
/// <reference path="./user_permission.model.ts" />
/// <reference path="./client.model.ts" />
/// <reference path="../main.ts" />


namespace Origin.Model {
    export class User extends IdName {
        displayvalue: string;
        loginname: string;
        permission: string;
        permissionstring: string;
        firmid: number;
        selected: boolean;
        firm = {};
        permissions = [];

        constructor() {
            super();
            this.firmid = 0;
        }

        static FromJson(data: any): User {

            let user = new User();
            if (data) {
                user.createFromJson(data);
                user.displayvalue = data.displayvalue;
                user.loginname = data.loginname;
                user.permission = data.permission;
                user.permissionstring = data.permissionstring;
                user.firmid = data.firmid;
                user.firm = data.firm ? Client.FromJson(data) : {};
                user.permissions = data.permissions ? data.permissions.map(UserPermission.FromJson) : [];
            }
            return user;
        }

    }

    export interface IUserDatService { 
        getUserRoles(user: User): ng.IPromise<{}>;
        save(user: User);
        GetCurrentUser(): ng.IPromise<{}>;
        LogOffCurrentUser();
        getAll(firmid: number, force: boolean): ng.IPromise<{}>;
    }

    export class UserDataService {

        loggedinUser: User;
        userPromise: ng.IDeferred<{}>;
        callbacks: Function[];

        static $inject = ['$q', 'HttpService'];
        constructor(private $q: ng.IQService, private httpService: Origin.Core.IHttpService) { }


        subscribe = (callback: Function) => {
            this.callbacks.push(callback);
        }        

        private publish = () => { 
            angular.forEach(this.callbacks, function (callback) {
                callback();
             })
        }

        getUserRoles(user: User): ng.IPromise<{}> {
            let defer = this.$q.defer();
            this.httpService.get('firms/getallpermissions?firmId=' + user.firmid).then(function (res: any) {
                var freshuserroles = res;
                defer.resolve(angular.copy(freshuserroles));
            }, function () {

            });
            return defer.promise;
        }

        save = (user: User) => {
            let _self = this;
            var defer = this.$q.defer();
            this.httpService.post('firms/saveuserpermission', user).then(function(res: any) {
                _self.publish();
                defer.resolve(res);
            }, function(res) {
                defer.reject(res);
            });
            return defer.promise;
        };

        GetCurrentUser(): ng.IPromise<{}> {
            // var defer = $q.defer();
            let _self = this;
            if (!this.loggedinUser && !this.userPromise) {
                this.userPromise = this.$q.defer();
                this.httpService.get('security/userpermissions').then(function(res: any) {
                    _self.loggedinUser = res;
                    _self.userPromise.resolve(res);
                }, function(res) {
                    _self.userPromise.reject(res);
                });
            } else if (this.loggedinUser) {
                this.userPromise.resolve(this.loggedinUser);
            }
            return this.userPromise.promise;
        };

        LogOffCurrentUser () {
            this.loggedinUser = null;
            this.userPromise = null;
        };

        getAll(firmid: number, force: boolean): ng.IPromise<{}> {
            var defer = this.$q.defer();
            var data = {};
            if (firmid) {
                data = {
                    id: firmid
                };
            }
            this.httpService.post('firms/users', data).then(function(res) {
                let freshusers = res.map(this.fromJson);
                defer.resolve(angular.copy(freshusers));
            }, function(res) {
                defer.reject(res);
            });
            return defer.promise;
        }
    }

    Origin.Main.module.service('UserDataService', Origin.Model.UserDataService);
}