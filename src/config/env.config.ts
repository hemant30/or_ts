/// <reference path="../main.ts" />


namespace Origin.Config {
    export interface IEnv {
        isLoneStarRunning: boolean;
        apiEndPoint: string;
        zuulEndPoint: string;
        directurl: string;
        attrEndPoint: string;
        cicoEndPoint: string;
    }
    export var ENV: IEnv = {
        isLoneStarRunning: false,
        apiEndPoint: 'https://dev-origin-uiservices.int.thomsonreuters.com/api/v1/',
        zuulEndPoint: 'https://dev-origin-uiservices.int.thomsonreuters.com/api/v1/',
        directurl: '',
        attrEndPoint: 'https://dev-origin-attributes.int.thomsonreuters.com/api/v1/',
        cicoEndPoint: "https://dev-origin-cico.int.thomsonreuters.com/api/v1/"
    }

    Origin.Main.module.constant('ENV', Origin.Config.ENV);
}