/// <reference path="./idname.model.ts" />
/// <reference path="attribute.model.ts" />
/// <reference path="./folder.model.ts" />
/// <reference path="./fileversion.model.ts" />
/// <reference path="./attachment.model.ts" />
/// <reference path="../main.ts" />


namespace Origin.Model {

    export enum WorkpaperType {
        StandaloneWorkpaper = 0,
        TemplateWorkpaper = 1
    }

    export class BaseWorkpaper extends IdName {
        uri: string;
        file: File;
        filelocation: string;
        islocked: boolean = false;
        ischeckedout: boolean = false;
        lockedby: string;
        checkedoutby: string;
        attributes: Attribute[];
        isdeleted: boolean = false;
        hascapturedversions: boolean = false;
        fileversions: FileVersion[];
        attachments: Attachment[];
        isplatform: boolean;

        constructor(private type: WorkpaperType) {
            super();
            this.uri = '';
            this.isplatform = true;
            this.attachments = [];
            this.fileversions = [];
            this.attributes = [];
        }

        BuildObject(data) {
            if (data) {
                this.createFromJson(data);
                this.uri = data.uri;
                this.file = data.filename;
                this.filelocation = data.filelocation;
                this.islocked = data.islocked;
                this.ischeckedout = data.ischeckedout;
                this.lockedby = data.lockedby;
                this.checkedoutby = data.checkedoutby;
                this.isdeleted = data.isdeleted;
                this.attributes = data.attributes ? data.attributes.map(Attribute.FromJson) : [];
                this.hascapturedversions = !data.fileversions ? false : (data.fileversions.length > 0 ? true : false);
                this.isplatform = data.isplatform || data.isPlatform;
                this.fileversions = data.fileversions ? data.fileversions.map(function (x) {
                    return FileVersion.FromJson(x, data);
                }) : [];
                this.attachments = data.attachments && data.attachments.length > 0 ? data.attachments.map(Attachment.FromJson) : [];
            }
        }
    }

    export class Workpaper extends BaseWorkpaper {
        static $inject = [];
        static List: Workpaper[];
        static workpapercount: number;

        foldername: string;
        folderid: number;
        status: string;
        starttime: Date;
        endtime: Date;

        constructor(type: WorkpaperType) {
            super(type);
            this.folderid = -1;
            this.starttime = new Date();
            this.endtime = new Date();
        }

        static FromJson(data): Workpaper {
            let workpaper = new Workpaper(WorkpaperType.StandaloneWorkpaper);
            if (data) {
                workpaper.BuildObject(data);
                workpaper.foldername = data.foldername || data.groupname;
                workpaper.folderid = data.folderid || data.groupid;
                workpaper.status = data.status;
                workpaper.starttime = data.starttime;
                workpaper.endtime = data.endtime;
            }
            return workpaper;
        }
    }

    export interface IWorkpaperDataService {
        get(workpaperid: number): ng.IPromise<Workpaper>;
        getAll(folderid: number, instanceid: string, usestaledata: boolean): ng.IPromise<Workpaper[]>;
        checkout(workpaper: Workpaper);
        downloadWorkpaperReadonly(workpaper: Workpaper);
        lock(workpaper: Workpaper);
        unlocl(workpaper: Workpaper);
        uncheckout(workpaper: Model.Workpaper);
    }

    export class WorkpaperDataService implements IWorkpaperDataService {
        static $inject = ['$q', 'HttpService', 'AlertService', 'HttpMicroService', 'ENV'];

        constructor(private $q: ng.IQService, private httpService: Origin.Core.IHttpService, private alertService: Origin.Core.IAlertService, private httpMicroService: Origin.Core.IHttpMicroService, private env: Origin.Config.IEnv) { };

        private checkoutWorkpaper = (id: number): ng.IPromise<{}> => {
            let def = this.$q.defer();
            let _self = this;
            this.httpService.get('workpapers/' + id).then(function (res) {
                if (!res.success) {
                    _self.alertService.addAlert(Core.AlertType.danger, res.message);
                    def.reject(res);
                } else {
                    var wp = Workpaper.FromJson(res.data);
                    if (wp.ischeckedout || wp.islocked) {
                        _self.downloadWorkpaperReadonly(wp).then(function () {
                            def.resolve(res);
                        });

                    } else {
                        _self.httpMicroService.post(_self.env.cicoEndPoint + 'cico/' + id + '/checkoutWorkpaper', null, null, true)
                            .then(function (res) {
                                _self.httpService.DownloadFile('workpapers/' + id + '/download');
                                def.resolve(res);
                            }, function (res) {
                                def.reject(res);
                            });
                    }
                }
            });
            return def.promise;
        };

        get(workpaperid: number): ng.IPromise<Workpaper> {
            let def = this.$q.defer();
            if (workpaperid > 0) {
                this.httpService.get('workpapers/' + workpaperid).then(function (res) {
                    if (res.success) {
                        def.resolve(Workpaper.FromJson(res.data));
                    } else {
                        def.reject(res);
                    }
                });
            } else {
                def.resolve(this);
            }
            return def.promise;
        }

        getAll(folderid: number, instanceid: string, usestaledata: boolean): ng.IPromise<Workpaper[]> {
            let def = this.$q.defer();
            let workpapersByFolder = (folderid: number): Workpaper[] => {
                if (folderid > -1) {
                    return Workpaper.List.filter(function (v) {
                        return v.folderid === folderid;
                    })
                } else {
                    return Workpaper.List;
                }
            }

            if (!usestaledata) {
                var data = {
                    id: -1,
                    instance: instanceid
                };
                this.httpService.post('workpapers', data).then(function (res: any) {
                    Workpaper.List = res.workpapers.map(Workpaper.FromJson);
                    Folder.List = res.folders.map(Folder.FromJson);
                    let folderindex = Folder.List.isExist('id', folderid);
                    if (folderindex <= -1) {
                        folderid = -1;
                    }
                    Folder.MarkSelectedFolderById(folderid);
                    Workpaper.workpapercount = res.workpaperscount;
                    def.resolve(workpapersByFolder(folderid));
                }, function (res) {
                    def.reject(res);
                });
            } else {
                def.resolve(workpapersByFolder(folderid));
            }

            return def.promise;
        }

        checkout = (workpaper: Workpaper) => {
            let def = this.$q.defer();
            this.checkoutWorkpaper(workpaper.id).then(function (res) {
                def.resolve(res);
            }, function (res) {
                def.reject(res);
            });
            return def.promise;
        }

        downloadWorkpaperReadonly = (workpaper: Workpaper) => {
            let _self = this;
            let url = 'workpapers/' + workpaper.id + '/downloadReadOnly';
            let def = this.$q.defer();
            this.httpService.get('workpapers/' + workpaper.id).then(function (res) {
                if (!res.success) {
                    _self.alertService.addAlert(Core.AlertType.danger, res.message);
                    def.resolve();
                } else {
                    _self.httpService.DownloadFile(url);
                    def.resolve();
                }
            });
            return def.promise;
        }

        lock = (workpaper: Model.Workpaper) => {
            let _self = this;
            let def = this.$q.defer();
            this.httpMicroService.post(this.env.cicoEndPoint + 'cico/' + workpaper.id + '/lockWorkpaper', null)
                .then(function (res) {
                    if (res.succeeded === true) {
                        def.resolve(Workpaper.FromJson(res));
                    } else {
                        _self.alertService.addAlert(Core.AlertType.danger, res.exceptionmessage);
                    }
                });
            return def.promise;
        }

        uncheckout = (workpaper: Model.Workpaper) => {
            let def = this.$q.defer();
            this.httpMicroService.post(this.env.cicoEndPoint + 'cico/' + workpaper.id + '/uncheckoutWorkpaper', null)
                .then(function (res) {
                    def.resolve(Workpaper.FromJson(res));
                });
            return def.promise;
        }

        unlock = (workpaper: Model.Workpaper) => {
            let def = this.$q.defer();
            this.httpMicroService.post(this.env.cicoEndPoint + 'cico/' + workpaper.id + '/unlockWorkpaper', null)
                .then(function (res) {
                    if (res.succeeded) {
                        def.resolve(Workpaper.FromJson(res));
                    } else {
                        def.reject(res.exceptionmessage);
                    }
                });
            return def.promise;
        }
    }

    Origin.Main.module.service('WorkpaperDataService', Origin.Model.WorkpaperDataService);
}