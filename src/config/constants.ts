/// <reference path="../main.ts" />

namespace Origin.Config {
    export interface IConstant {
        surl: string;
        default_500_error_msg: string;

        permissions: {
            CAN_SEE_ACTIVE_WORKPAPER: string,
            CAN_CREATE_AND_UPLOAD_WORKPAPER: string,
            CAN_EDIT_WORKPAPER_ATTRIBUTE: string,
            CAN_DELETE_WORKPAPER: string,
            CAN_CREATE_FOLDER: string,
            CAN_EDIT_FOLDER: string,
            CAN_DELETE_FOLDER: string,
            CAN_ADD_EDIT_DELETE_NOTES: string,
            CAN_VIEW_NOTES: string,
            CAN_OVERRIDE_CHECKOUT: string,
            CAN_LOCK_UNLOCK: string,
            CAN_SEE_BATCHES: string,
            CAN_CREATE_EDIT_RUN_CANCELQUEUE_BATCH: string,
            CAN_DELETE_BATCH: string,
            CAN_VIEW_ATTRIBUTES: string,
            CAN_CREATE_EDIT_DELETE_ATTRIBUTES: string,
            CAN_PROVISION: string,
            IS_SUPER_ADMINISTRATOR: string,
            IS_SUPPORT: string,
            IS_IMPLEMENTER: string
        }
    };

    export var OriConstant: IConstant = {
        surl: '/api/navigation/v1/serviceurl',
        default_500_error_msg: "The server encountered an internal error and was unable to complete your request.",

        permissions: {
            CAN_SEE_ACTIVE_WORKPAPER: 'ActiveWorkpapersView',
            CAN_CREATE_AND_UPLOAD_WORKPAPER: 'CreateAndUploadNewWorkpapers',
            CAN_EDIT_WORKPAPER_ATTRIBUTE: 'EditWorkpaperAttributes',
            CAN_DELETE_WORKPAPER: 'DeleteWorkpapers',
            CAN_CREATE_FOLDER: 'CreateNewFoldersActiveWorkpapers',
            CAN_EDIT_FOLDER: 'EditFoldersActiveWorkpapers',
            CAN_DELETE_FOLDER: 'DeleteFoldersActiveWorkpapers',
            CAN_ADD_EDIT_DELETE_NOTES: 'AddUpdateDeleteWorkpaperNotes',
            CAN_VIEW_NOTES: 'ViewWorkpaperNotes',
            CAN_OVERRIDE_CHECKOUT: 'OverrideCheckout',
            CAN_LOCK_UNLOCK: 'LockUnlock',
            CAN_SEE_BATCHES: 'BatchesView',
            CAN_CREATE_EDIT_RUN_CANCELQUEUE_BATCH: 'CreateEditRunBatchesCancelQueuedBatches',
            CAN_DELETE_BATCH: 'DeleteSavedBatches',
            CAN_VIEW_ATTRIBUTES: 'AttributeManagementView',
            CAN_CREATE_EDIT_DELETE_ATTRIBUTES: 'CreateEditDeleteAttributes',
            CAN_PROVISION: 'Provisioning',
            IS_SUPER_ADMINISTRATOR: 'SuperAdministrator',
            IS_SUPPORT: 'Support',
            IS_IMPLEMENTER: 'Implementer'
        }
    }

    Origin.Main.module.constant('Constant', Origin.Config.OriConstant);
}