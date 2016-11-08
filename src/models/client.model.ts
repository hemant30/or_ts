/// <reference path="./idname.model.ts" />

namespace Origin.Model {
    export class Client extends IdName {
        accountid: string;
        instance: string;
        isdefaultinstance: boolean = false;
        schema: string;
        ismasterfirm: boolean = false;
        issupportfirm: boolean = false;
        products = [];

        constructor() {
            super();
            this.accountid = '';
            this.instance = '';
            this.isdefaultinstance = false;
            this.schema = '';
            this.ismasterfirm = false;
            this.issupportfirm = false;
            this.products = [];
        }

        static FromJson(data: any): Client {
            let newClient = new Client();
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
        }
    }
}