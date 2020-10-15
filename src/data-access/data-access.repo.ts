export abstract class DataAccessRepo<T> {

    private _models: Map<string, T>;

    constructor() { 
        this._models = new Map<string,T>();
    }

    abstract create(schemaName: string, item: T);

    abstract read(schemaName: string, _id: string, filters:object);

    abstract update(schemaName: string, _id: string, item: T);

    abstract delete(schemaName: string, _id: string);

    public addModel(modelKey: string, model:any){
        this._models[modelKey] = model;
    }
    
    public getModel(modelKey:string){
        return this._models[modelKey];
    }
}

