/// <reference path="./idname.model.ts" />

namespace Origin.Model { 
    export class Attachment extends IdName{
        filename: string;
        size: number;

        static FromJson(data): Attachment { 
            let attachment = new Attachment()
            if (data) { 
                attachment.filename = data.filename;
                attachment.size = data.size;
            }
            return attachment;
        }
     }
}