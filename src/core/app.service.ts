
/// <reference path="../main.ts" />

namespace Origin.Core {

    export interface IAppService {
        getOtpInstanceid(): string;
        setOtpInstanceid(instance: string): void;
        convertFileSize(size: number): string | number;
    };

    export class AppService  {
        private _otpInstanceId: string;

        getOtpInstanceid(): string {
            return this._otpInstanceId;
        }

        setOtpInstanceid(instance: string): void {
            this._otpInstanceId = instance;
        }

        convertFileSize(size: number): string | number {
            if (size === 0) {
                return '0 Byte';
            }
            var k = 1024; // or 1024 for binary
            var dm = 2;
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            var i = Math.floor(Math.log(size) / Math.log(k));
            return parseFloat((size / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        };
    }
    Origin.Main.module.service('AppService', Origin.Core.AppService);
}