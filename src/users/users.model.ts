import { Injectable } from "@nestjs/common";
import { DataAccessModelService } from "../data-access/data-access-model.service";

export interface IUserModel{
   firstName?: string;
   lastName?: string;
   email: string;
   profilePic?:string;
   pass: string;
   role: string;
}

var userSchema: object = {
   type: "object",
   properties: {
      firstName: {
         type: "string"
      },
      lastName: {
         type: "string"
      },
      nickName: {
         type: "string",
      },
      email: {
         type: "string",
         unique: true,
         index: true
      },
      profilePic: {
         type: "string"
      },
      color:{
         type:"string"
      },
      pass:{
         type:"string"
      },
      role: {
         type: "string",
         enum: ["owner", "admin", "user"]
      },
      lastAccess: {
         type:"number",
      }
   }
}

@Injectable()
export class UsersModel {
   constructor(private _dataAccessModelService: DataAccessModelService) {
      let model = this._dataAccessModelService.buildModel(userSchema ,true);
      this._dataAccessModelService.addModel("users", model);
   }
}

