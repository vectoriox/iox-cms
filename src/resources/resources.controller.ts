
import { Controller, Get, Post, Put, Delete, Inject, Body, Param, Query} from '@nestjs/common';
import { DataAccessService } from "../data-access/data-access.service";

@Controller("api/:resource")
export class ResourcesController {
  constructor(private _dataAccessService: DataAccessService) {}

  @Get()
  readAll(@Param('resource')resource, @Query()queryParams?): void {
    console.log(`Resouces Controller::Read All  ${resource}`); 
    return this._dataAccessService.read(resource, null, queryParams);
  }

  @Get(':id')
  read(@Param('resource')resource, @Param('id')id?): void {
    return this._dataAccessService.read(resource ,id);
  }


  @Post()
  create(@Param('resource')resource, @Body()data): void {
   console.log(`Resouces Controller::Create new  ${resource}`);
   return this._dataAccessService.create(resource ,data);

  }

  @Put(':id')
  update(@Param('resource')resource,@Param('id')id, @Body()data): void{
    return this._dataAccessService.update(resource,id,data)
  }

  @Delete(':id')
  delete(@Param('resource')resource,@Param('id')id):void{
    return this._dataAccessService.delete(resource,id)
  }
}
