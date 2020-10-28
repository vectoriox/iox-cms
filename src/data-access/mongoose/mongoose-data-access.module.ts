import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseDataAccessRepoService } from './mongoose-data-access-repo.service';
import { MongooseDataAccessModelService } from './mongoose-data-access-model.service';


@Module({
  providers: [MongooseDataAccessRepoService, MongooseDataAccessModelService], 
  exports:[MongooseDataAccessRepoService, MongooseDataAccessModelService]
})
export class MongooseDataAccessModule {
}
