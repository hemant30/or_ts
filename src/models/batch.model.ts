/// <reference path="./idname.model.ts" />
/// <reference path="./workpaper.model.ts" />
/// <reference path="../core/http.service.ts" />
/// <reference path="../main.ts" />

namespace Origin.Model {
    export class Batch extends IdName {
        batchtype: string;
        isbatchrow: boolean;
        isinprogress: boolean;
        islocked: boolean;
        workpapercount: number;
        haswpdeleted: boolean;
        starttime: Date;
        endtime: Date;
        status: string;
        workpapers: Workpaper[];

        constructor() {
            super();
            this.batchtype = '';
            this.isbatchrow = true;
            this.isinprogress = false;
            this.islocked = false;
            this.workpapercount = 0;
            this.haswpdeleted = false;
            this.starttime = new Date();
            this.endtime = new Date();
            this.status = '';
            this.workpapers = [];
        }

        static FromJson(data): Batch {
            let newbatch = new Batch();
            if (data) {
                newbatch.createFromJson(data);
                newbatch.batchtype = data.batchtype;
                newbatch.islocked = data.islocked;
                newbatch.isinprogress = data.isinprogress;
                newbatch.lastmodified = data.lastprocessed ? new Date(data.lastprocessed) : undefined;
                newbatch.lastmodifiedby = data.lastprocessedby;
                newbatch.haswpdeleted = data.haswpdeleted;
                newbatch.starttime = data.starttime ? new Date(data.starttime) : undefined;
                newbatch.endtime = data.endtime ? new Date(data.endtime) : undefined;
                newbatch.status = data.status;
                newbatch.workpapers = data.workpapers ? data.workpapers.map(Workpaper.FromJson) : [];
                newbatch.workpapercount = newbatch.workpapers.length;
            }
            return newbatch;
        }
    }

    export interface IBatchDataService {
        getAllList(hideloader: boolean): ng.IPromise<Batch[]>;
        getAllQueue(hideloader: boolean): ng.IPromise<Batch[]>;
        getAllHistory(): ng.IPromise<Batch[]>;
    }

    export class BatchDataService {
        static $inject = ['HttpService', '$q'];

        constructor(private httpService: Origin.Core.IHttpService, private $q: ng.IQService) {

        }

        getAllList = (hideloader: boolean): ng.IPromise<Batch[]> => {
            let defer = this.$q.defer();
            this.httpService.post('batches/getBatchList', undefined, hideloader).then(function (res) {
                var batches = res.map(Batch.FromJson);
                defer.resolve(batches);
            }, function (res) {
                defer.reject(res);
            });
            return defer.promise;
        };

        getAllQueue = (hideloader: boolean): ng.IPromise<Batch[]> => {
            let defer = this.$q.defer();
            this.httpService.post('batches/getBatchQueue', undefined, hideloader).then(function (res) {
                var batches = res.map(Batch.FromJson);
                defer.resolve(batches);
            }, function (res) {
                defer.reject(res);
            });
            return defer.promise;
        };

        getAllHistory = (): ng.IPromise<Batch[]> => {
            let defer = this.$q.defer();
            this.httpService.post('batches/history').then(function (res) {
                var batches = res.map(Batch.FromJson);
                defer.resolve(batches);
            }, function (res) {
                defer.reject(res);
            });
            return defer.promise;
        };


    }

    Origin.Main.module.service('BatchDataService', Origin.Model.BatchDataService);
}