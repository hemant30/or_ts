namespace Origin.Model { 
    export class IdName { 
        id: number;
        name: string;
        created: Date;
        createdby: string;
        lastmodified: Date;
        lastmodifiedby: string;

        constructor() { 
            this.id = 0;
        }

        createFromJson(data: any): void {
            if (data) {
                this.id = data.id;
                this.name = data.name || data.displayvalue;
                this.created = new Date(data.created);
                this.createdby = data.createdby;
                var lastmodified = data.lastmodified || data.lastprocessed;
                this.lastmodified = lastmodified ? new Date(lastmodified) : undefined;
                this.lastmodifiedby = data.lastmodifiedby || data.lastprocessedby;
            }
         }
    }
}