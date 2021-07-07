import { Injectable } from "@nestjs/common";
import { DataAccessModelService } from "../data-access/data-access-model.service";
import { DataAccessRepoService } from "../data-access/data-access-repo.service";

@Injectable()
export class ResourcesService {
    
    constructor(private _dataAccessRepo: DataAccessRepoService<any>, private _dataAccessModelService: DataAccessModelService){}

    create(resource, data){
        console.log(`Resouces Service::Create new  ${resource}`);
        let model = this._dataAccessModelService.getModel(resource);
        return this._dataAccessRepo.create(model, data)
    }
    
    read(resource, id=null, filters?){
        console.log(`Resouces Service::Read from ${resource} id ${id}`);
        let model = this._dataAccessModelService.getModel(resource);
        return this._dataAccessRepo.read(model, id ,filters);
    }
    
    update(resource, id, data){
        console.log(`Resouces Service::Update from ${resource} id ${id}`);
        let model = this._dataAccessModelService.getModel(resource);
        return this._dataAccessRepo.update(model, id, data);
    }
    
    delete(resource, id){
        let model = this._dataAccessModelService.getModel(resource);
        return this._dataAccessRepo.delete(model, id);
    }
}
