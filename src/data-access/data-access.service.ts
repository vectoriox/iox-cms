export abstract class  DataAccessService {

    abstract read(resource:string,id? ,filters?:object);
    abstract create(resource:string, data:object);
    abstract update(resource:string, id:string, data:object);
    abstract delete(resource:string, id:string);
    abstract boostrapDAL(schemas:Map<string,object>,mongoConfig:object);
    abstract getAvialableModelsList():Array<string>;
    
}
