namespace Origin.Template {
    export var wpdialogTemplate: string = `
    
    <style type="text/css">
        .error-msg {
             color: red;
        }
    </style>

    <div class="bento-container" data-disablebackspace>
        <button type="button" class="close" aria-hidden="true" ng-click="$ctrl.cancel()">
            ×
        </button>
        <div class="modal-header" style="padding-bottom: 5px;">
            <span data-ng-show="$ctrl.workpaper.id <= 0" data-translate="WorkpaperAdd"></span>
            <span data-ng-show="$ctrl.workpaper.id > 0" data-translate="WorkpaperEdit"></span>
        </div>

        <div class="modal-body" style="display: inline-block;" class="">
            <div style="" class="row col-md-12">
                <form method="POST" enctype="multipart/form-data" id="createWorkpaper" name="form.createWorkpaper" target="create-UploadfileTarget" novalidate>
                <div class="form-group row col-xs-12" style="height: 75px;">
                    <div>
                        <label style="" class="row col-xs-12" data-translate="WorkpaperUpload"></label>
                    </div>
                    <div data-ng-if="$ctrl.workpaper.id >0" class="col-xs-12" style="background-color: #eee; height: 40px; line-height: 40px;">
                        <div style="" class="row col-xs-9">
                            <span class="bento-icon-file-excel pull-left" style="color: green; font-size: 13pt; display: inline-block; margin-top: 10px;"></span>
                            <span style="font-weight: bold; margin-left: 15px; overflow: hidden;  text-overflow: ellipsis; float: left; width: 255px; white-space: nowrap; " data-ng-show="$ctrl.workpaper.file.length > 0">{{$ctrl.workpaper.file}}</span>
                            <span style="font-weight: bold; margin-left: 5px;" data-ng-show="$ctrl.workpaper.file.length <= 0" data-length="NoFilesAddedToWorkpaper"></span>
                            <p style="" ng-show="$ctrl.form.createWorkpaper.workpaperfile.$dirty && $ctrl.form.createWorkpaper.workpaperfile.$error.invalid" class="error row col-xs-12" data-translate="InfoValidFileType"></p>
                        </div>
                        <div style="" class="col-xs-3 pull-right">
                            <a href="javascript: void(0)" style="" data-ng-show="$ctrl.workpaper.file.length > 0" data-translate="ChangeFile"></a>
                            <input type="file" ng-model="$ctrl.workpaper.selectedfile" name="workpaperfile" onchange="angular.element(this).scope().fileselectionchanged(this)" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" style="cursor: pointer;  width: 80px; height: 30px; opacity: 0; position: absolute; top: 0px; left: 15px; z-index: 1020;  " />
                        </div>
                    </div>
                    <div style="" class="" data-ng-if="$ctrl.workpaper.id <= 0" ng-class="{ 'has-error' : $ctrl.form.createWorkpaper.workpaperfile.$invalid && $ctrl.form.createWorkpaper.workpaperfile.$dirty }">
                        <div class="col-xs-9 row">
                            <input type="text" data-ng-model="$ctrl.workpaper.file" placeholder="{{'SelectFile' | translate}}" name="faked-csvFile" id="faked-import-file" style="text-overflow:ellipsis" class="form-control" required="" readonly="" />
                        </div>
                        <div class="col-xs-3 pull-right">
                            <input type="file" ng-model="$ctrl.workpaper.selectedfile" id="workpaperfile" name="workpaperfile" onchange="angular.element(this).scope().fileselectionchanged(this)" data-storage="false" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" style="cursor: pointer;
                                                    opacity: 0;
                                                    position: absolute;
                                                    top: 0;
                                                    height: 38px;
                                                    left: 17px;
                                                    width: 90%;
                                                    z-index: 1020;  " />
                            <button class="btn btn-primary" style="" data-translate="Browse"></button>
                        </div>
                    </div>
                    <p style="" ng-show="$ctrl.form.createWorkpaper.workpaperfile.$error.invalid" class="error-msg row col-xs-12 ng-hide" data-translate="InfoValidFileType"></p>
                    <!-- <div style="margin-top: -45px;float: left; clear: both; height: 55px; width: 400px;" data-ng-if="workpaper.id <= 0"> -->
                </div>
                <div style="margin-top: 10px; height: 75px;" class="form-group row col-xs-12" ng-class="{ 'has-error' : (($ctrl.form.createWorkpaper.workpapername.$invalid && $ctrl.form.createWorkpaper.workpapername.$dirty) || $ctrl.form.createWorkpaper.workpapername.$error.wpexists)  }">
                    <label style="" class="col-xs-12 row" data-translate="WorkpaperName"></label>
                    <input data-focusme="workpapername.focus" type="text" id="workpapername" ng-change="$ctrl.removeExists()" data-ng-model="$ctrl.workpaper.name" class="form-control col-xs-12" placeholder="{{'WorkpaperName' | translate}}" name="workpapername" data-no-specialchar data-org-maxlength="255" style="" required />
                    <p style="" class="col-xs-12 row error-msg ng-hide" ng-show="$ctrl.form.createWorkpaper.workpapername.$invalid && $ctrl.form.createWorkpaper.workpapername.$dirty && !$ctrl.form.createWorkpaper.workpapername.$error.wpexists" data-translate="ErrorWorkpaperNameisRequired"></p>
                    <p style="" class="col-xs-12 row error-msg ng-hide" ng-show="$ctrl.form.createWorkpaper.workpapername.$error.wpexists" data-translate="WorkpaperSaver_DuplicateWorkpaperName"></p>
                </div>
                <div style="margin-top: 10px;" class="row col-xs-12">
                    <label class="row col-xs-12" data-translate="InfoUploadWorkpaper"></label>
                    <div class="row col-xs-12">
                        <div class="col-xs-6" style="margin-left: -15px;">
                            <input type="hidden" data-ng-model="$ctrl.workpaper.folderid" id="folderid" name="folderid" value="{{$ctrl.workpaper.folderid}}" />
                            <input type="hidden" data-ng-model="$ctrl.workpaper.id" name="workpaperid" value="{{$ctrl.workpaper.id}}" class="form-control" />
                            <div class="form-group" ng-class="{ 'has-error' : $ctrl.form.createWorkpaper.foldername.$error.required && $ctrl.form.createWorkpaper.foldername.$dirty }" style="">
                                <select id="selectedfolder" class="form-control" name="selectedfolder" style="" data-ng-model="$ctrl.workpaper.selectedfolder" data-ng-required="!$ctrl.workpaper.foldername" data-focusdropdownonmousedown  data-ng-options="opt.id as opt.name for opt in $ctrl.folders()" data-ng-change="$ctrl.setselectedfolder()"></select>
                            </div>
                        </div>
                        <div class="col-xs-6" has-permission="CreateNewFoldersActiveWorkpapers">
                            <div style="border-radius: 50%; width: 30px; height: 30px; line-height: 30px; background-color: #ccc; float: left; margin-left: 20px; text-align: center">
                                <span data-translate="Or"></span>
                            </div>
                            <div class="form-group" ng-class="{ 'has-error' : $ctrl.form.createWorkpaper.foldername.$invalid && $ctrl.form.createWorkpaper.foldername.$dirty }">
                                <a id="lnkshowfolderinput" href="javascript:void(0)" style="margin-left: 22px; position: absolute; margin-top: 5px;" ng-click="$ctrl.showNewFolderInput()" data-ng-show="$ctrl.workpaper.createnewfolder === false" data-translate="GroupCreateNew">
                                </a>
                                <input id="foldername" type="text" data-focusme="foldername.focus" data-ng-model="$ctrl.workpaper.foldername" placeholder="{{'FolderNameColumn' | translate}}" data-ng-required="$ctrl.workpaper.selectedfolder.id == -2" name="foldername" required data-org-maxlength="48" class="form-control" style="height: 36px; padding-left: 7px; width: 200px; position: absolute; margin-left: 22px; display: inline; font-size: 11pt;" data-ng-show="$ctrl.workpaper.createnewfolder === true" ng-change="$ctrl.removeExists()" />
                            </div>
                        </div>
                        <p style="margin-bottom: 5px; margin-top: -13px;" ng-show="$ctrl.form.createWorkpaper.foldername.$dirty && $ctrl.form.createWorkpaper.foldername.$error.exists" class="error-msg row col-xs-12 ng-hide" data-translate="ErrorGroupExists"></p>
                        <p style="margin-top: -13px;" class="col-xs-12 row error-msg ng-hide" ng-show="$ctrl.form.createWorkpaper.foldername.$error.required && $ctrl.form.createWorkpaper.foldername.$dirty" data-translate="Workpaper_save_validation_foldername"></p>
                    </div>
                </div>
                <div class="form-group row col-md-12" style="margin-top: 10px">
                    <label class="col-xs-12 row" data-translate="SelectAttributes" ng-show="$ctrl.attributeslist.length > 0"></label>
                    <div class="form-group col-xs-12" data-ng-repeat="attribute in $ctrl.attributeslist" style="padding: 0; margin-top: 10px;">
                        <div class="col-xs-3" style="padding: 0">
                            <label style="">{{$ctrl.attributeslist[$index].name + ($ctrl.attributeslist[$index].isrequired === true ? '*' : '') }}</label>
                        </div>
                        <div class="col-xs-9" style="padding: 0">
                            <select class="form-control" name="selected_{{$index}}" style="" data-ng-model="$ctrl.workpaper.attributes[$ctrl.attributeslist[$index].updatedname]" data-focusdropdownonmousedown data-ng-options="opt.name as opt.name for opt in  $ctrl.attributeslist[$index].values" data-ng-required="$ctrl.attributeslist[$index].isrequired"></select>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div>

    </div>


    <div class="modal-footer" style="padding-top: 15px !important; margin-top: -35px;">
        <button class="btn btn-primary btn-md" style="" ng-disabled="$ctrl.form.createWorkpaper.$invalid" ng-click="$ctrl.save()" data-translate="Save"></button>
        <button class="btn btn-default btn-md" style="" ng-click="$ctrl.cancel($ctrl.form.createWorkpaper.$dirty)" data-translate="Cancel"></button>
    </div>
    
    `
}