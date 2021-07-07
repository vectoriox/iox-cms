import { Injectable } from "@nestjs/common";
import { DataAccessRepoService } from "../data-access/data-access-repo.service"
import { DataAccessModelService } from "../data-access/data-access-model.service"
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    private userModel;
    constructor(private _dataAccessModelService: DataAccessModelService, private _dataAccessRepoService: DataAccessRepoService<any>) {
        this.userModel = this._dataAccessModelService.getModel("users");
    }

    async createUser(item: any) {
        let user = await this._dataAccessRepoService.read(this.userModel,null, {email:item.email});
        if(user.length){
             return Promise.reject({message:"user already exist"});
        }
        item.pass = bcrypt.hashSync(item.pass, 10);
        return this._dataAccessRepoService.create(this.userModel, item);
    }

    async getUser(id?: string, filters: object = {} , includePass?:boolean) {
        return  this._dataAccessRepoService.read(this.userModel, id, filters);
    }

    async updateUser(id: string, item: any) {
        return  this._dataAccessRepoService.update(this.userModel, id, item);
        
    }

    async deleteUser(id: string) {
        let res = await this._dataAccessRepoService.delete(this.userModel, id);
        return { 
            operationTime: res.operationTime,
            deletedCount: res.deletedCount
        }
    }
}

