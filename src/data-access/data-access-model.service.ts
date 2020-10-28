import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class DataAccessModelService {

    private _models: Map<string, any>;

    constructor() { 
    }

    abstract buildModel(schema:any);
    
    public addModel(modelKey: string, model:any){
        this._models[modelKey] = model;
    }
    
    public getModel(modelKey:string){
        console.log(this._models);
        return this._models[modelKey];
    }
}

