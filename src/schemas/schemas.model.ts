import { Document, Schema, Model, model} from "mongoose";
import { DataAccessModelService } from "../data-access/data-access-model.service";

// {
//     "metadata":{
//         "label": "Users"
//     },
//     "ui":{
//         "type":"cards"
//     },
//     "model":{
//         "type": "object",
//         "properties": {
//           "email": {
//             "type": "string"
//           },
//           "name": {
//             "type": "string"
//           },
//           "password":{
//             "type":"string"
//           },
//           "role":{
//             "type": "string"
//           },
//           "profilePic":{
//             "type":"string"
//           }
//         }
//     }
// }
// {

//     "metadata":{
//         "label": "Product"
//     },
//     "ui":{
//         "type":"cards"
//     },
//     "model":{
//         "type": "object",
//         "properties": [
//           {
//               "label": "Product Name",
//               "type" : "string",
//               "uiType":"input"
//           },
//           {
//             "label": "Product Description",
//             "type" : "string",
//             "uiType":"input"
//           },
//           {
//             "label": "Avilabilty",
//             "type" : "boolean",
//             "uiType":"switch"
//           },
//           {
//             "label": "Gallery",
//             "type": "list",
//             "uiType":"gallery",
//             "items": [
//                 {
//                     "label":"string",
//                     "type":"media",
//                     "uiType": "image"
//                 }
//             ]
//           }
//         ]
//     }
// }
var schemasModel: Schema = new Schema();

class SchemaModel {
     constructor(private _dataAccessModelService:DataAccessModelService){
        let mode = this._dataAccessModelService.buildModel(schemasModel);
        this._dataAccessModelService.addModel("schemas",model);
     }

}
