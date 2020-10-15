// import * as fs from 'fs';
// import * as util from 'util';
// import createMongooseSchema from 'json-schema-to-mongoose';
// import DataAccess from "../data-access/data-access";
// import { Document, Schema, Model, model} from "mongoose";

// export const SCHEMAS = new Map<string, object>();
// export const MODELS =  new Map<string, any>();

// export class ResourcesIntializer {



//   static async getsSchemas(){
//     let readFile = util.promisify(fs.readFile);
//     let readdir = util.promisify(fs.readdir);
//     let promises = [];

//     try{
//           let filesList= await readdir(`${__dirname}cms-metadata/schemas`,{withFileTypes:true})
//           filesList.forEach((fileMetaData)=>{
//             promises.push(readFile(`${__dirname}cms-metadata/schemas/${fileMetaData.name}`).then((file)=>{ 
//               SCHEMAS.set(fileMetaData.name.split('.')[0], JSON.parse(file.toString()).model);
//             })); 
//           })
//           return Promise.all(promises).then((res)=>{
//             this.generateModels();
//           })
//     }catch(e){
//       console.log(e);
//     }
   
//   }    

//   private static  generateModels(){
//     SCHEMAS.forEach((value:any, key:any)=>{
//       MODELS.set(key,DataAccess.mongooseConnection.model(key, new Schema(value)));
//     })
//   }
// }
