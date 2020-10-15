import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseDataAccessRepo } from './mongoose-data-access.repo';
import { MongooseDataAccessService } from './mongoose-data-access.service';


@Module({
  providers: [MongooseDataAccessService, MongooseDataAccessRepo], 
  exports:[MongooseDataAccessService, MongooseDataAccessRepo]
})
export class MongooseDataAccessModule {
}
