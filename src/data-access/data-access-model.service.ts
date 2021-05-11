import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class DataAccessModelService {

    abstract buildModel(schema:any, isSystemSchema?:boolean);
    
    abstract addModel(modelKey: string, model:any);
    
    abstract getModel(modelKey:string);
}

