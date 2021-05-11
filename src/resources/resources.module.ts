import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { DataAccessModule } from '../data-access/data-access.module';
import { ResourcesController } from './resources.controller';
import { ResourcesMiddleware } from "./resources.middleware";
import { ResourcesService } from './resoueces.service';

@Module({  
  imports: [ DataAccessModule.register({ dbType: "mongo" })],
  controllers: [ResourcesController],
  providers:[ResourcesService]
})
export class ResourcesModule implements NestModule {
    configure(consumer:MiddlewareConsumer){
        consumer.apply(ResourcesMiddleware).forRoutes("api/:resources")
    }

    constructor(){
    }

}
