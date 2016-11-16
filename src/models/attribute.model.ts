/// <reference path="./idname.model.ts" />
/// <reference path="../main.ts" />

namespace Origin.Model {
    export enum LinkedDataAttributeType {
        undefined = 0,
        entity = 1,
        client = 2,
        location = 3,
        taxtype = 4,
        year = 5,
        period = 6,
        jurisdiction = 7,
        dataset = 8,
        custom = 9
    };

    export class Attribute extends IdName {
        action: string;
        isincluded: boolean;
        sourcename: string;
        sourceid: number;
        isrequired: boolean;
        isdefault: boolean;
        canremove: boolean;
        type: LinkedDataAttributeType;
        uri: string;
        value: string;
        values;
        updatedname: string;

        constructor() {
            super();
            this.action = 'add';
            this.isincluded = false;
            this.sourcename = '';
            this.sourceid = 0;
            this.isrequired = false;
            this.isdefault = false;
            this.canremove = true;
            this.type =  LinkedDataAttributeType.undefined;
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
        getSourceValues(attrUrl: string): ng.IPromise<{}>;
    }

    export class AttributeDataService implements IAttributeDataService {
        static $inject = ['$q', 'ENV', 'HttpMicroService'];

        constructor(private $q: ng.IQService, private env: Origin.Config.IEnv, private htpMicroService: Core.IHttpMicroService) {

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

        getSourceValues = (attrUrl: string): ng.IPromise<{}> => {
            let defer = this.$q.defer();
            let url: string = this.env.attrEndPoint + 'attributes/getSourceValues?attrUri=' + attrUrl;
            this.htpMicroService.get(url).then(function (res) {
                defer.resolve(res.map(Attribute.FromJson));
            }, function (res) {
                defer.reject(res);
            });
            return defer.promise;
        }
    }

    Origin.Main.module.service('AttributeDataService', Origin.Model.AttributeDataService);
}