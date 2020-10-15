import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { DataAccessModule } from 'src/data-access/data-access.module';
import { ResourcesController } from './resources.controller';
import { ResourcesMiddleware } from "./resources.middleware";
import { DataAccessService } from "../data-access/data-access.service";
import * as fs from 'fs';
import * as util from 'util';

@Module({  
  imports: [DataAccessModule.register({ dbType: "mongo" })],
  controllers: [ResourcesController]
})
export class ResourcesModule implements NestModule {
    configure(consumer:MiddlewareConsumer){
        consumer.apply(ResourcesMiddleware).forRoutes("api/:resources")
    }

    constructor(private _dataAccessService:DataAccessService){
      this.getsSchemas();
    }


    private async getsSchemas(){
      let readFile = util.promisify(fs.readFile);
      let readdir = util.promisify(fs.readdir);
      let SCHEMAS = new Map <string,any>();
      let promises = [];
  
      try{
            let filesList= await readdir(`${__dirname}/cms-metadata/schemas`,{withFileTypes:true})
            filesList.forEach((fileMetaData)=>{
              promises.push(readFile(`${__dirname}/cms-metadata/schemas/${fileMetaData.name}`).then((file)=>{ 
                let scehma = new Object();
                return[ fileMetaData.name.split('.')[0],  JSON.parse(file.toString()).model];
              })); 
            })
            return Promise.all(promises).then((res)=>{
              let schemas = new Map<string,object>(res);
              this._dataAccessService.boostrapDAL(schemas,{});
            })
      }catch(e){
        console.log(e);
      }
     
    }
}
