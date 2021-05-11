import { Module, DynamicModule } from '@nestjs/common';
import { DataAccessRepoService } from './data-access-repo.service';
import { DataAccessModelService } from '../data-access/data-access-model.service'
import { MongooseDataAccessRepoService } from './mongoose/mongoose-data-access-repo.service';
import { MongooseDataAccessModelService } from './mongoose/mongoose-data-access-model.service'
@Module({})
export class DataAccessModule{

    static register(options):DynamicModule{
        let mongoConfig = this.dbProvidersFactory(options.dbType);
        return{
            module: DataAccessModule,
            ...mongoConfig,
            exports:[DataAccessModelService, DataAccessRepoService]
        }  
    }

    private static dbProvidersFactory(dbType){
        switch(dbType){
            case "mongo":
                return this.getMongoProviders();
                break;
            
        }
    }
    private static getMongoProviders(){

        return {
            imports:[],
            providers:[
                {provide:DataAccessModelService,useClass:MongooseDataAccessModelService},
                {provide:DataAccessRepoService,useClass:MongooseDataAccessRepoService}
            ]
        }
    }
}
