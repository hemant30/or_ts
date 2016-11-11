/// <reference path="../main.ts" />

namespace Origin.Core { 

    export class PermissionDirective implements ng.IDirective { 
        static $inject = ['AuthorizationService'];
         restrict = 'A';
         scope = false
        
         constructor(private authorizationService: IAuthorizationService) { }


         link($scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: any)
        {
             let permission = attributes.hasPermission;
             element.removeAttr('has-permission');
             this.authorizationService.hasPermission(permission).then(function () { 
                 element.removeClass('ng-hide');
             }, function () { 
                 element.remove();
             });
        }
    } 

    Origin.Main.module.directive('hasPermission', ['AuthorizationService', (authorizationService) => new Origin.Core.PermissionDirective(authorizationService)]);
}