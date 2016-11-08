/// <reference path="./idname.model.ts" />

namespace Origin.Model {
    export class Attribute extends IdName {
        action: string;
        isincluded: boolean;
        sourcename: string;
        sourceid: number;
        isrequired: boolean;
        isdefault: boolean;
        canremove: boolean;
        type: number = 0;
        uri: string;
        value: string;

        constructor() {
            super();
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

        static FromJson(data: any): Attribute {
            let newattribute = new Attribute();
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
        }
    }

    export interface IAttributeDataService { 
        get(): ng.IPromise<{}>;
    }

    export class AttributeDataService implements IAttributeDataService {
        static $inject = ['$q', 'ENV', 'HttpMicroService'];

        constructor(private $q: ng.IQService, private env: Origin.Config.IEnv, private htpMicroService) {

        }

        get() {
            var defer = this.$q.defer();
            var url = this.env.attrEndPoint + '/attributes';

            this.htpMicroService.get(url).then(function (res) {
                defer.resolve(res.map(Attribute.FromJson));
            },
                function (res) {
                    defer.reject(res);
                });

            return defer.promise;
        }
    }
}