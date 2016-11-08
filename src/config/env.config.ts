namespace Origin.Config {
    export interface IEnv {
        isLoneStarRunning: boolean;
        apiEndPoint: string;
        zuulEndPoint: string;
        directurl: string;
        attrEndPoint: string;
    }
    export var ENV: IEnv = {
        isLoneStarRunning: false,
        apiEndPoint: 'https://dev-origin-uiservices.int.thomsonreuters.com/api/v1/',
        zuulEndPoint: '/zuul/dev2/workpaper-uiservices/api/v1/',
        directurl: '',
        attrEndPoint: 'https://dev-origin-attributes.int.thomsonreuters.com/api/v1/'
    }
}