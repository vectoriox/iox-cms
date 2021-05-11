import { Module } from '@nestjs/common';
import { DataAccessModule } from '..//data-access/data-access.module';
import { SchemasController } from './schemas.controller';
import { SchemasService } from './schemas.service';
import { SchemaModel } from './schemas.model';

@Module({
  imports:[DataAccessModule.register({dbType:"mongo"})],
  controllers: [SchemasController],
  providers: [SchemaModel, SchemasService],
  exports:[SchemasService]
})
export class SchemasModule {
  constructor(){
    console.log("Schemas Module Initialzed")
  }
}