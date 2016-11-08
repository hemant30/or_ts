/// <reference path="../config/env.config.ts" />

namespace Origin.Core { 
    export class OriginDem { 
        static $inject = ['ENV', '$injector', '$q'];

        constructor(private env: Origin.Config.IEnv, private $injector: ng.auto.IInjectorService, private $q: ng.IQService) { }

        private getSessionId() { };
        private getGUID() { }

        subscribe(servicename: string, callback: Function) {
            
        }
        
        unsubscribe(subscriberid: string, servicename: string) { }
    }

}