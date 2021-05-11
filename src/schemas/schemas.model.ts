import { Injectable } from "@nestjs/common";
import { DataAccessModelService } from "../data-access/data-access-model.service";



// interface ISchemaMetaData{
//    lable:IschemaObjectModel;
// }

// interface IschemaModel{
//    type:InputTypes;
//    unique?:boolean;
//    properties?: {[key:string]:IschemaObjectModel};
//    items?: IschemaObjectModel;
// }

// interface IschemaModel{
//    name:string
//    metaData:ISchemaMetaData;
//    model:IschemaObjectModel;
// }




// enum InputTypes {
//    ARRAY= "array",
//    OBJECT = "object",
//    NUMBER = "number",
//    DATE = "data",
//    STRING = "string"
//    IMAGE = "image",
//    VIDEO = "video",
//    TEXT = "text",
//    SELECT = "select",
//  }


// var schemasModel: IschemaModel = {
//    metaData: {
//       name:{
//          type:InputTypes.STRING
//       },
//       lable:{
//          type:InputTypes.STRING
//       }
//    },
//    model:{
//       type:InputTypes.OBJECT,
//    }
// }


var schemasModel: object = {
   type:"object",
   properties:{
      name:{
         type:"string"
      },
      metaData:{
          "label": "schemas"
      }, 
      schemaObject: {
          type: "object",
          properties: {
          }
      }
   }
}

@Injectable()
export class SchemaModel {
     constructor(private _dataAccessModelService:DataAccessModelService){
        let model = this._dataAccessModelService.buildModel(schemasModel,true);
        this._dataAccessModelService.addModel("schemas",model);
     }
}

