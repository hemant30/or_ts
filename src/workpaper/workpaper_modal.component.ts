/// <reference path="../main.ts" />
/// <reference path="./workpaper_modal.component.tpl.ts" />
/// <reference path="../models/attribute.model.ts" />
/// <reference path="../models/workpaper.model.ts" />
/// <reference path="../core/analytics.service.ts" />


namespace Origin.Component {
    export class WorkpaperModalController {
        static $inject = ['AttributeDataService', '$q', 'WorkpaperDataService', 'OriginAnalytics'];

        showAttributes: boolean;
        folders: Function;
        workpaper: Model.Workpaper;
        resolve;
        form;
        foldername;
        modalInstance: ng.ui.bootstrap.IModalServiceInstance;


        private attributeList: Model.Attribute[];

        constructor(
            private attributeDataService: Model.IAttributeDataService,
            private $q: ng.IQService,
            private workpaperDataService: Model.IWorkpaperDataService,
            private analyticsService: Core.IOriginAnalytics
        ) {

            this.workpaper = this.resolve.workpaper;
            this.folders = () => {

                return Origin.Model.Folder.List;
            }
            this.foldername = { focus: false };
            this.getWorkpaper();
        }

        private isValidFileExt = (filename: string): boolean => {
            //return true; // Temporarily not validating in JavaScript to allow the server code to validate it and return a message
            let validExts = new Array(".xlsx");
            let fileExt = filename;
            fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
            if (validExts.indexOf(fileExt.toLowerCase()) < 0) {
                return false;
            } else return true;
        };

        private getFileName = (fullPath: string): string => {
            let startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            let filename = fullPath.substring(startIndex);
            filename = filename.substring(filename.lastIndexOf('/') + 1, filename.lastIndexOf('.'));
            if (filename.length > 255) {
                filename = filename.slice(0, 255);
            }
            return filename;
        };

        private getAttributeId = (attrname: string): Model.LinkedDataAttributeType => {
            return Model.LinkedDataAttributeType[attrname];
        };

        private getAttributeValueIndex = (index: number, uri: string) => {
            let attrIndex = -1;
            if (this.attributeList[index].values) {
                attrIndex = this.attributeList[index].values.isExist('uri', uri);
            }
            return attrIndex;
        };

        private getAttributes = () => {
            let _self = this;
            let attrPromises = [];

            let suppress = (x) => {
                return x.catch(function () { });
            };

            this.attributeDataService.get().then(function (res: Model.Attribute[]) {
                _self.attributeList = res;
            })

            angular.forEach(this.attributeList, function (v, i: number) {
                v.updatedname = v.name.toLowerCase();
                attrPromises[i] = _self.attributeDataService.getSourceValues(v.uri);
            });

            this.$q.all(attrPromises.map(suppress)).then(function (res) {
                angular.forEach(res, function (v, i) {
                    _self.attributeList[i].values = v;
                });

                angular.forEach(_self.workpaper.attributes, function (vv, k) {
                    let attrid = _self.getAttributeId(vv.name.toLowerCase());
                    for (let m = 0; m < _self.attributeList.length; m++) {
                        let attr = _self.attributeList[m];
                        if (attr.type === attrid) {
                            let foundIndex = _self.getAttributeValueIndex(m, vv.uri);
                            if (foundIndex > -1) {
                                _self.workpaper.attributes[attr.updatedname] = attr.values[foundIndex].name;
                                break;
                            }
                        }
                    }
                });
            })
        };

        private getWorkpaper = () => {
            let _self = this;

            if (this.workpaper.id > 0) {
                this.workpaperDataService.get(this.workpaper.id).then(function (res: Model.Workpaper) {
                    _self.workpaper = res;
                })
            }
            this.workpaper.createNewFolder = false;
            this.workpaper.selectedFolder = this.workpaper.folderid;

            if (Model.Folder.SelectedFolder && Model.Folder.SelectedFolder.id !== -1 && this.workpaper.selectedFolder === -1) {
                this.workpaper.selectedFolder = Model.Folder.SelectedFolder.id;
                this.workpaper.folderid = this.workpaper.selectedFolder;
            }
            this.getAttributes();
        }

        setSelectedFolder = () => {
            this.workpaper.folderid = this.workpaper.selectedFolder;
            this.workpaper.createNewFolder = false;
            this.removeExists();
        }

        fileselectionchanged = (obj) => {
            this.form.createWorkpaper.workpaperfile.$setValidity('invalid', true);
            if (this.isValidFileExt(obj.value)) {
                this.workpaper.workpaperfileobj = obj.files.length > 0 ? obj.files[0] : undefined;
                this.workpaper.file = obj.value.split('/').pop().split('\\').pop();
                if (this.workpaper.id <= 0) {
                    this.workpaper.name = this.getFileName(this.workpaper.file.name);
                }
                this.form.createWorkpaper.workpaperfile.$setViewValue(this.form.createWorkpaper.workpaperfile.$viewValue);
                this.workpaper.validfile = true;

            } else {
                if (this.workpaper.id <= 0) {
                    obj.innerHTML = obj.innerHTML;
                    this.workpaper.file = '';
                }
                this.form.createWorkpaper.workpaperfile.$setViewValue(this.form.createWorkpaper.workpaperfile.$viewValue);
                this.form.createWorkpaper.workpaperfile.$setValidity('invalid', false);
                this.workpaper.validfile = false;
            }
        }

        showNewFolderInput = () => {
            this.workpaper.folderid = 0;
            this.workpaper.foldername = '';
            this.workpaper.createNewFolder = true;
            // this.workpaper.selectedFolder = {
            //     id: -2
            // };
            this.foldername.focus = true;
        };

        removeExists = () => {
            this.form.createWorkpaper['foldername'].$setValidity('exists', true);
            this.form.createWorkpaper['workpapername'].$setValidity('wpexists', true);
        };

        cancel = () => {
            this.analyticsService.trackEvent('select', 'Workpapers', 'Add Workpaper - Cancel');
            this.modalInstance.close();
        };
    }

    export class WorkpaperModal implements ng.IComponentOptions {
        bindings: any;
        controller: any;
        template: string;

        constructor() {
            this.bindings = {
                resolve: '<',
                modalInstance: '<'
            };
            this.controller = WorkpaperModalController;
            this.template = Origin.Template.wpdialogTemplate;
        }
    }

    Origin.Main.module.component('workpaperModal', new Origin.Component.WorkpaperModal())
}