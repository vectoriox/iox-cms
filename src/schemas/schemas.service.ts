import { Injectable } from "@nestjs/common";
import { DataAccessRepoService } from "../data-access/data-access-repo.service"
import { DataAccessModelService } from "../data-access/data-access-model.service"

@Injectable()
export class SchemasService {

    private schemasModel;
    constructor(private _dataAccessModelService: DataAccessModelService, private _dataAccessRepoService: DataAccessRepoService<any>) {
        this.schemasModel = this._dataAccessModelService.getModel("schemas");
    }

    createSchema(item: any) {
        return this._dataAccessRepoService.create(this.schemasModel, item);
    }

    async getSchema(id?: string, filters: object = {}) {
        return this._dataAccessRepoService.read(this.schemasModel, id, filters);
    }

    updateSchema(id: string, item: any) {
        return this._dataAccessRepoService.update(this.schemasModel, id, item);
    }

    deleteSchema(id: string) {
        return this._dataAccessRepoService.delete(this.schemasModel, id)
    }

}

