namespace Origin.Model {
    export class UserPermission {
        pid: string;
        pt: string;
        hv: boolean;
        v: boolean;

        constructor() {

        }

        static FromJson(data: any): UserPermission {
            let newPermission = new UserPermission();
            if (data) {
                newPermission.pid = data.pid;
                newPermission.pt = data.pt;
                newPermission.hv = data.hv;
                newPermission.v = data.v;
            }
            return newPermission;
        }
    }
}