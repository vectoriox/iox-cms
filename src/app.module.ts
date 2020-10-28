import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResourcesModule } from './resources/resources.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './config/app.config';
import * as fs from 'fs';
import * as util from 'util';
import { DataAccessModule } from './data-access/data-access.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    load:[DatabaseConfig]
  }),
  DataAccessModule.register({ dbType: "mongo" }), 
  ResourcesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(){
    console.log("app started!!!!")
    //this.getsSchemas();
  }


  // private async getsSchemas(){
  //   let readFile = util.promisify(fs.readFile);
  //   let readdir = util.promisify(fs.readdir);
  //   let SCHEMAS = new Map <string,any>();
  //   let promises = [];

  //   try{
  //         let filesList= await readdir(`${__dirname}/schemas/defaults`,{withFileTypes:true})
  //         filesList.forEach((fileMetaData)=>{
  //           promises.push(readFile(`${__dirname}/schemas/defaults/${fileMetaData.name}`).then((file)=>{ 
  //             let scehma = new Object();
  //             return[ fileMetaData.name.split('.')[0],  JSON.parse(file.toString()).model];
  //           })); 
  //         })
  //         return Promise.all(promises).then((res)=>{
  //           let schemas = new Map<string,object>(res);
  //           //this._dataAccessService.boostrapDAL(schemas,{});
  //         })
  //   }catch(e){
  //    console.log(e);
  //   }
  // }
}
