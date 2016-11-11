/// <reference path="../main.ts" />


namespace Origin.Core {
    export class AuthTokenInterceptor {
        static $inject = ['$q', '$window', '$cookies', '$location'];

        store;
        key: string = 'auth-token';

        constructor(private $q: ng.IQService, private $window: ng.IWindowService, private $cookies: ng.cookies.ICookiesService, private $location: ng.ILocationService) {
            this.store = this.$window.sessionStorage
            this.initToken();
        }

        private initToken() {
            let token = this.$cookies.get('UDSLongToken');
            if (!token) {
                token = this.$location.search().UDSLongToken;
            }
            this.setToken(token);
        }

        private getToken() {
            return this.store.getItem(this.key);
        }

        private setToken(token: string) {
            if (token) {
                this.store.setItem(this.key, token);
            } else {
                this.store.removeItem(this.key);
            }
        }

        request = (config) => {
            config.headers.Authorization = 'UDSLongToken ' + this.getToken();
            return config;
        }

        responseError = (response) => {
            return this.$q.reject(response);
         }
    }

    Origin.Main.module.service('AuthTokenInterceptor', Origin.Core.AuthTokenInterceptor);
}