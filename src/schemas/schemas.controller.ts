
import { Controller, Get, Post, Put, Delete, Inject, Body, Param, Query } from '@nestjs/common';
import { SchemasService } from './schemas.service';


@Controller("api/schemas")
export class SchemasController {

    private _model;

    constructor(private _schemasServiceService: SchemasService) {
    }

    @Get()
    readAll( @Query()queryParams?): void {
    }

      @Get(':id')
      read( @Param('id')id?){
        return this._schemasServiceService.getSchema(id, {});
      }


    @Post()
    create(@Body() data): void {   
        return this._schemasServiceService.deleteSchema(data);
    }

      @Put(':id')
      update(@Param('id')id, @Body()data): void{
        return this._schemasServiceService.updateSchema(id, data)
      }

      @Delete(':id')
      delete(@Param('id')id):void{
        return this._schemasServiceService.deleteSchema(id);
      }
}
