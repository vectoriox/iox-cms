import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class DataAccessRepoService<T> {

    constructor() { 
    }

    abstract create(model, item: T);

    abstract read(model, _id: string, filters:object);

    abstract update(model, _id: string, item: T);

    abstract delete(model, _id: string);

}

