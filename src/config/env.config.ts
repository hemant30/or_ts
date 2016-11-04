namespace Origin.Config { 
    export interface IEnv { 
        isLoneStarRunning: boolean;

    }
    export var ENV: IEnv = {
        isLoneStarRunning : false

    }
}