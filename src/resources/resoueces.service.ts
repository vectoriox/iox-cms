import { Injectable } from "@nestjs/common";
import { DataAccessRepo } from "src/data-access/data-access.repo";

@Injectable()
export class ResourcesService {
    
    constructor(private _dataAccessRepo: DataAccessRepo<any>){}

    create(resource, id){
        console.log(`Resouces Service::Create new  ${resource}`);
        return this._dataAccessRepo.create(resource, id)
    }
    
    read(resource, id=null, filters?){
        console.log(`Resouces Service::Read from ${resource} id ${id}`);
        return this._dataAccessRepo.read(resource, id ,filters);
    }
    
    update(resource, id, data){
        console.log(`Resouces Service::Update from ${resource} id ${id}`);
        return this._dataAccessRepo.update(resource, id, data);
    }
    
    delete(resource, id){
        return this._dataAccessRepo.delete(resource, id);
    }
}
