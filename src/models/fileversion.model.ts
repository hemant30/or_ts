/// <reference path="./idname.model.ts" />

namespace Origin.Model {
    export class FileVersion extends IdName {

        parent: Workpaper;
        iscapturedversion: boolean;
        userversionid: number;

        static FromJson(data, parent: Workpaper): FileVersion {
            let newfileversion = new FileVersion();
            if (data) {
                newfileversion.createFromJson(data);
                newfileversion.parent = parent;
                newfileversion.iscapturedversion = true;
                newfileversion.userversionid = data.userversionid;
            }
            return newfileversion;
        }
    }

    export interface IFileVersionDataService {
        downloadWorkpaperReadonly(fileVersion: FileVersion);
        revert(fileVersion: FileVersion): ng.IPromise<{}>;
    }

    export class FileVersionDataService implements IFileVersionDataService {
        static $inject = ['HttpService', 'AlertService', '$q'];

        constructor(private httpService: Origin.Core.IHttpService, private alertService: Origin.Core.IAlertService, private $q: ng.IQService) {

        }

        revert(fileVersion: FileVersion): ng.IPromise<{}> {
            let def = this.$q.defer();
            var url = 'workpapers/' + fileVersion.parent.id + '/' + fileVersion.id + '/revert';
            this.httpService.get('workpapers/' + fileVersion.parent.id).then(function (res: any) {
                if (res.success === false) {
                    this.alertService.addAlert('error', res.message);
                } else {
                    this.httpService.post(url, null).then(function (res: any) {
                        def.resolve(res);
                    });
                }
            });

            return def.promise;
        }

        downloadWorkpaperReadonly(fileVersion: FileVersion) {
            let url = 'workpapers/' + fileVersion.parent.id + '/' + fileVersion.id + '/downloadReadOnly';
            this.httpService.get('workpapers/' + fileVersion.parent.id).then(function (res: any) {
                if (!res.success) {
                    this.alertService.addAlert('error', res.message);
                } else {
                    this.httpService.DownloadFile(url);
                }
            });
        }
    }
}