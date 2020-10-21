import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class  DataAccessService {

    abstract boostrapDAL(schemas:Map<string,object>,mongoConfig:object);
    abstract getDAO():Array<string>;
    abstract createDAO(dataAccessObject:any):void;
    abstract updateDAO(dataAccessObject:any):void;
    abstract deleteDAO(dataAccessObject:any):void;
    
}
