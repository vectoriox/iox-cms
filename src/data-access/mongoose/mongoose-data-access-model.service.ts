import { Injectable } from '@nestjs/common';
import createMongooseSchema from 'json-schema-to-mongoose';
import { MongooseDataAccessRepoService } from "./mongoose-data-access-repo.service";
import * as mongoose from "mongoose";
import { ConfigService } from '@nestjs/config';
import {DatabaseConfig, AppConfig} from "../../config/app.config"
import { DataAccessModelService } from '../data-access-model.service';

@Injectable()
export class MongooseDataAccessModelService extends DataAccessModelService{
    
    private _mongooseInstance: any;
    private _mongooseConnection: mongoose.Connection;

    constructor(private _mongooseDataAccessRepo:MongooseDataAccessRepoService<mongoose.Document>, private configService: ConfigService){
        super();
        this._mongooseConnection  = mongoose.connection;
        let dbCOnfig = this.configService.get<DatabaseConfig>(AppConfig.DatabaseConfig);
        this._dbConnect(dbCOnfig);
    }


    buildModel(schema:any){
        let jsonSchema = createMongooseSchema({},schema);
        let mongoSchema = this._mongooseConnection.model(schema.label, new mongoose.Schema(jsonSchema));
        return mongoSchema;
    }


    private generateConnectionString(dbCOnfig){
        let MONGODB_CONNECTION: string = `mongodb+srv://${dbCOnfig.user}:${dbCOnfig.password}@${dbCOnfig.host}/${dbCOnfig.name}?retryWrites=true&w=majority`
        return MONGODB_CONNECTION
    };

    private _dbConnect(mongoConfig){
        if(this._mongooseInstance) return this._mongooseInstance;

        this._mongooseConnection.once("open", () => {
            console.log("MONGO DB CONNECTED !");
        });
        
       let connString = this.generateConnectionString(mongoConfig);
       this._mongooseInstance = mongoose.connect(connString);
    }
}  
