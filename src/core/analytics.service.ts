/// <reference path="../main.ts" />
/// <reference path="../config/env.config.ts" />


namespace Origin.Core { 
    export class OriginAnalytics { 
        static $inject = ['ENV', '$analytics'];

        constructor(private env: Origin.Config.IEnv, private $analytics) { }

        trackEvent(action: string, category: string, label: string) { 
            if (this.env.isLoneStarRunning) { 
                this.$analytics.eventTrack(action, {
                    'product': 'WorkpaperManager',
                    'category': category,
                    'label': label
                });
            }
        }
    }

    Origin.Main.module.service('OriginAnalytics', Origin.Core.OriginAnalytics);
}