import { Injectable } from '@nestjs/common';
import { DataAccessService } from "../data-access.service";
import createMongooseSchema from 'json-schema-to-mongoose';
import { MongooseDataAccessRepo } from "./mongoose-data-access.repo";
import * as mongoose from "mongoose";
import { ConfigService } from '@nestjs/config';
import {DatabaseConfig, AppConfig} from "../../config/app.config"

@Injectable()
export class MongooseDataAccessService extends DataAccessService{
    
    private _isDALbootsraped:boolean;
    private _mongooseInstance: any;
    private _mongooseConnection: mongoose.Connection;
    private _resources:Array<string>;
    private dbCOnfig:any;

    constructor(private _mongooseDataAccessRepo:MongooseDataAccessRepo<mongoose.Document>, private configService: ConfigService){
        super();
        this._mongooseConnection  = mongoose.connection;
        this._isDALbootsraped = false;
        this._resources = new Array<string>();
        this.dbCOnfig = this.configService.get<DatabaseConfig>(AppConfig.DatabaseConfig);
        console.log(this.dbCOnfig);
    }

    create(resource, id){
        console.log(`Resouces Service::Create new  ${resource}`);
        return this._mongooseDataAccessRepo.create(resource, id)
    }

    read(resource, id=null, filters){
        console.log(`Resouces Service::Read from ${resource} id ${id}`);
        return this._mongooseDataAccessRepo.read(resource, id ,filters);
    }

    update(resource, id, data){
        console.log(`Resouces Service::Update from ${resource} id ${id}`);
        return this._mongooseDataAccessRepo.update(resource, id, data);
    }

    delete(resource, id){
        return this._mongooseDataAccessRepo.delete(resource, id);
    }

    boostrapDAL(schemas:Map<string,Object>, mongoConfig){
        schemas.forEach((value:any, key:any)=>{
            console.log(key);
            console.log(value);
            this._resources.push(key);
            let jsonSchema = createMongooseSchema({},value);
            let mongoSchema = this._mongooseConnection.model(key, new mongoose.Schema(jsonSchema));
            this._mongooseDataAccessRepo.addModel(key, mongoSchema);
        })
        this.dbConnect(mongoConfig)
    }

    public getAvialableModelsList(){
        return this._resources;
    }

    private generateConnectionString(mongoConfig){
        let MONGODB_CONNECTION: string = `mongodb+srv://${this.dbCOnfig.user}:${this.dbCOnfig.password}@${this.dbCOnfig.host}/${this.dbCOnfig.name}?retryWrites=true&w=majority`
        return MONGODB_CONNECTION
    };

    private dbConnect(mongoConfig){
        if(this._mongooseInstance) return this._mongooseInstance;
        this._mongooseConnection.once("open", () => {
            console.log("MONGO DB CONNECTED !");
            this._isDALbootsraped = true;
        });
       let connString = this.generateConnectionString(mongoConfig);
       this._mongooseInstance = mongoose.connect(connString);
    }
}  
