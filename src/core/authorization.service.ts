/// <reference path="../models/user.model.ts" />
/// <reference path="../main.ts" />

namespace Origin.Core {
    export interface IAuthorizationService {
        hasPermission(permissionid: string): ng.IPromise<{}>;
    };

    export class AuthorizationService implements IAuthorizationService {

        static $inject = ['$q', 'UserDataService'];
        constructor(private $q: ng.IQService, private UserService: Origin.Model.IUserDatService) { }

        hasPermission(permissionid: string): ng.IPromise<{}> {
            let defer = this.$q.defer();

            let isPermissionExist = (permissionToCheck, permissionList) => {
                let permissionIndex = permissionList.isExist('pid', permissionToCheck);
                if (permissionIndex < 0) {
                    return false;
                } else {
                    if (permissionList[permissionIndex] || permissionList[permissionIndex].hv) {
                        return true;
                    } else {
                        return false;
                    }
                }
            };

            if (!permissionid) {
                defer.reject('Unauthorize');
            } else {
                this.UserService.GetCurrentUser().then(function (res: any) {
                    if (!res) {
                        defer.reject('Unauthorize');
                    } else {
                        let permissions = res.permissions;
                        if (!permissions) {
                            defer.reject('Unauthorize');
                        } else {
                            let permissionstocheck = permissionid.split(',');

                            if (angular.isArray(permissionstocheck)) {
                                let keepgoing = true;
                                angular.forEach(permissionstocheck, function (value, key) {
                                    if (keepgoing) {
                                        let x = isPermissionExist(value.trim(), permissions);
                                        if (x) {
                                            keepgoing = false;
                                        }
                                    }
                                });
                                if (keepgoing) {
                                    defer.reject('Unauthorize');
                                } else {
                                    defer.resolve(true);
                                }
                            } else {
                                isPermissionExist(permissionstocheck, permissions) ?
                                    defer.resolve(true) : defer.reject('Unauthorize');
                            }
                        }
                    }
                }, function (res) {
                    defer.reject('Unauthorize');
                });
            }
            return defer.promise;
        }
    }

    Origin.Main.module.service('AuthorizationService', Origin.Core.AuthorizationService);
}