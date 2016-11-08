/// <reference path="../config/env.config.ts" />

namespace Origin.Nav {
    export class NavigationComponent {
        static $inject = ['ENV', '$injector'];

        isCMButtonVisible: boolean;
        selectedSubClient;
        $lonestarConfig;

        constructor(private env: Origin.Config.IEnv, private $injector) {
            if (this.env.isLoneStarRunning) {
                this.$lonestarConfig = $injector.get('$lonestarConfig');
                if (this.$lonestarConfig) {
                    this.isCMButtonVisible = this.$lonestarConfig.shouldShowClientSelector;
                    this.selectedSubClient = this.$lonestarConfig.selectedSubClient;
                }
            }
        }

        showCMdialog() {
            if (this.env.isLoneStarRunning && this.$lonestarConfig) {
                this.$lonestarConfig.showClientSelector();
            }
        }
    }

    export class Navigation {
        bindings: any;
        controller: any;
        template: string;

        constructor() {
            this.bindings = {

            };
            this.controller = NavigationComponent;
            this.template = Origin.Nav.navtemplate
        }
    }
}