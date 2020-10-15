import { Module, DynamicModule } from '@nestjs/common';
import { DataAccessRepo } from './data-access.repo';
import { DataAccessService } from './data-access.service';
import { MongooseDataAccessModule} from "./mongoose/mongoose-data-access.module"
import { MongooseDataAccessRepo } from './mongoose/mongoose-data-access.repo';
import { MongooseDataAccessService } from './mongoose/mongoose-data-access.service';

@Module({})
export class DataAccessModule{

    static register(options):DynamicModule{
        let mongoConfig = this.dbProvidersFactory("mongo");
        return{
            module: DataAccessModule,
            ...mongoConfig,
            exports:[DataAccessRepo, DataAccessService]
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
            imports:[MongooseDataAccessModule],
            providers:[
                {provide:DataAccessService,useClass:MongooseDataAccessService},
                {provide:DataAccessRepo,useClass:MongooseDataAccessRepo}
            ]
        }
    }
}
