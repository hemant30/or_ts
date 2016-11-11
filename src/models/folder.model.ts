/// <reference path="./idname.model.ts" />
/// <reference path="../core/http.service.ts" />
/// <reference path="./workpaper.model.ts" />


namespace Origin.Model {
    export class Folder extends IdName {
        static Count: number;
        static List: Folder[];
        static SelectedFolder: Folder;

        workpapers: Workpaper[];
        workpapercount: number;
        selected: boolean;
        canShowEditDelete: boolean;

        static FromJson(data: any): Folder {
            let newFolder = new Folder();
            if (data) {
                newFolder.createFromJson(data);
                newFolder.workpapercount = data.workpapercount;
                //newFolder.canShowEditDelete = true;
            }
            return newFolder;
        }

        static MarkSelectedFolderById(folderid: number) { 
            let folderindex = Folder.List.isExist('id', folderid);
            if (folderindex > -1) {
                let folder = Folder.List[folderindex];
                Folder.MarkSelectedFolder(folder);
            }
        }

        static MarkSelectedFolder(folder: Folder) { 
            if (folder && folder.id && angular.isNumber(folder.id)) {
                Folder.List.applyToAll('selected', false);
                let index = Folder.List.isExist('id', folder.id);
                if (index > -1) {
                    Folder.SelectedFolder = Folder.List[index];
                    Folder.List[index].selected = true;
                } else {
                    Folder.SelectedFolder = null;
                }
            }
        }
    }

    export interface IFolderDataService {
        getAllWithWorkpapers(): ng.IPromise<{}>;
        getAll(instanceid?: string): ng.IPromise<{}>;
        subscribe(callback: Function): void;
    }

    export class FolderDataService implements IFolderDataService {

        static $inject = ['$q', 'HttpService'];
        callbacks: Function[];
        constructor(private $q: ng.IQService, private httpService: Origin.Core.IHttpService) {
            this.callbacks = [];
        }

        private publish() {
            angular.forEach(this.callbacks, function (callback) { 
                callback();
            });
        }
        
        subscribe(callback: Function) { 
            this.callbacks.push(callback);
        }

        getAll = (instanceid?: string): ng.IPromise<{}> => {
            let _self = this;
            let def = this.$q.defer();
            let url = 'folders?showall=true';
            if (instanceid) {
                url = 'folders?showall=true&instaceId=' + instanceid;
            }
            this.httpService.get(url).then(function (res) {
                Folder.List = res.map(Folder.FromJson);
                Folder.Count = Folder.List.length;
                _self.publish();
                def.resolve();
            },
                function () {
                    def.reject();
                });
            return def.promise;
        }

        getAllWithWorkpapers(): ng.IPromise<{}> {
            let def = this.$q.defer();
            this.httpService.get('folder/folderswithworkpapers?showall=true').then(function (res) {
                def.resolve(res);
            }, function (reason) {
                def.reject(reason);
            });
            return def.promise;
        }
    }
}