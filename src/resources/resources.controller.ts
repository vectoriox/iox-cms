
import { Controller, Get, Post, Put, Delete, Inject, Body, Param, Query} from '@nestjs/common';
import { ResourcesService } from "./resoueces.service";
import { DataAccessModelService } from "../data-access/data-access-model.service" 
import { Public } from '../auth/public.decorator';


@Controller("api/:resource")
export class ResourcesController {
  constructor(private _resourcesService: ResourcesService, private _dataAccessModelService: DataAccessModelService) {}

  @Get()
  @Public()
  readAll(@Param('resource')resource, @Query()queryParams?): void {
    console.log(`Resouces Controller::Read All  ${resource}`); 
    return this._resourcesService.read(resource, null, queryParams);
  }

  @Get(':id')
  @Public()
  read(@Param('resource')resource, @Param('id')id?): void {
    console.log(`Resouces Controller::Read All  ${resource}`); 
    return this._resourcesService.read(resource ,id);
  }


  @Post()
  create(@Param('resource')resource, @Body()data): void {
   console.log(`Resouces Controller::Create new  ${resource}`);
   return this._resourcesService.create(resource ,data);

  }

  @Put(':id')
  update(@Param('resource')resource,@Param('id')id, @Body()data): void{
    return this._resourcesService.update(resource,id,data)
  }

  @Delete(':id')
  delete(@Param('resource')resource,@Param('id')id):void{
    return this._resourcesService.delete(resource,id)
  }
}
