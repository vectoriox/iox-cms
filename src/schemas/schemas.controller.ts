
import { Controller, Get, Post, Put, Delete, Inject, Body, Param, Query} from '@nestjs/common';
import { SchemasService } from './schemas.service';

@Controller("api/schemas")
export class SchemasController {
  constructor(private _schemasService: SchemasService) {}

  @Get()
  readAll( @Query()queryParams?): void {
    return this._schemasService.read(queryParams);
  }

  @Get(':id')
  read( @Param('id')id?): void {
    return this._schemasService.read(id);
  }


  @Post()
  create(@Body()data): void {
   return this._schemasService.create(data);

  }

  @Put(':id')
  update(@@Param('id')id, @Body()data): void{
    return this._schemasService.update(id,data)
  }

  @Delete(':id')
  delete(@Param('id')id):void{
    return this._schemasService.delete(id)
  }
}
