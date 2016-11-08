namespace Origin.Core {
    export interface IAlertService { 
        originAlerts: any;
        addAlert(type:  AlertType, message: string, timeout?: number);
        closeAlert(index: number): void;
        clearAlerts(): void;
    }

    export enum AlertType { 
        danger,
        info,
        warning,
        success
    }

    export class AlertService implements IAlertService{

        
        originAlerts: any;
        static $inject = ['ENV', '$injector'];
        constructor(private env: Origin.Config.IEnv, private $injector: ng.auto.IInjectorService) { }

        addAlert(type: AlertType, message: string, timeout?: number) { 
            let defaultTimeout = timeout || 5000;
            if (this.env.isLoneStarRunning) {
                let $loneStarAlertService: any = this.$injector.get('$lonestarAlerts');
                if ($loneStarAlertService) {
                    $loneStarAlertService.post(type, message, defaultTimeout);
                }
            } else {
                if (this.originAlerts) {
                    this.clearAlerts();
                    this.originAlerts.alerts.push({
                        type: type,
                        msg: message,
                        closeable: true,
                        timeout: defaultTimeout
                    });
                }
            }
        };

        closeAlert(index: number): void {
            if (!this.env.isLoneStarRunning) {
                this.originAlerts.alerts.splice(index, 1);
            }
        };

        clearAlerts(): void {
            if (!this.env.isLoneStarRunning) {
                if (this.originAlerts) { this.originAlerts.alerts = []; }
            }
        }
    }
}