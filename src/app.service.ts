import { Injectable } from '@nestjs/common';
import { SchemasService } from './schemas/schemas.service';
import { DataAccessModelService } from './data-access/data-access-model.service';
import { UsersService } from './users/users.service';
import { IUserModel } from './users/users.model';
import {InitialUserConfig, AppConfig} from "./config/app.config"
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(private _schemasService: SchemasService, 
              private _dataAccessModelService: DataAccessModelService,
              private _userService: UsersService,
              private _configService:ConfigService){
  }
  async initializer() {
    let schemas = await this._schemasService.getSchema();
    console.log(schemas);
    schemas.forEach(schema => {
      console.log(schema.toObject());
      let model = this._dataAccessModelService.buildModel(schema.toObject().schemaObject);
      this._dataAccessModelService.addModel(schema.name,model);
      console.log(`app.service::Model ${schema.name} has been loaded`);
    });
    this._createFirstUser();
  }


  private  async _createFirstUser(){
    var users = await this._userService.getUser();
    console.log(`users: ${JSON.stringify(users)}`);
    if(users.length){
      return;
    }

    let intialUserConfig = this._configService.get<InitialUserConfig>(AppConfig.InitialUserConfig);
    let user:IUserModel = {
       email: intialUserConfig.email,
       pass: intialUserConfig.pass,
       role: "owner"
    } 
    let res = await this._userService.createUser(user);
    console.log(res);
  }

}
