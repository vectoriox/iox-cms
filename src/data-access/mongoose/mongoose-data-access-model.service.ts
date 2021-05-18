import { Injectable } from '@nestjs/common';
import createMongooseSchema from 'json-schema-to-mongoose';
import * as mongoose from "mongoose";
import { ConfigService } from '@nestjs/config';
import {DatabaseConfig, AppConfig} from "../../config/app.config"
import { DataAccessModelService } from '../data-access-model.service';
const { exec } = require("child_process");

@Injectable()
export class MongooseDataAccessModelService extends DataAccessModelService{
    
    private _mongooseInstance: any;
    private _mongooseConnection: mongoose.Connection;
    private _connectionInProgress:boolean = false;
    constructor(private configService: ConfigService){
        super();
        this._mongooseConnection  = mongoose.connection;
        let dbCOnfig = this.configService.get<DatabaseConfig>(AppConfig.DatabaseConfig);
        this._dbConnect(dbCOnfig);
        //this._initialzieDb(dbCOnfig);
    }


    buildModel(jsonSchema:any ,isSystemSchema?:boolean){   
        
        if(!isSystemSchema){
         jsonSchema = this._IOXschemaToValidJsonSchema(jsonSchema);   
        }

        let mongooseSchema = createMongooseSchema({},jsonSchema);
        Object.keys(jsonSchema.properties).map((key)=>{
            if(jsonSchema.properties[key].unique){
                mongooseSchema[key].unique = true;
            }
        })

        mongooseSchema = new mongoose.Schema(createMongooseSchema({},jsonSchema));
        return mongooseSchema;
    }

    addModel(modelName:string, model:any){
        this._mongooseConnection.model(modelName, model);

    }

    getModel(modelName:string){
        return this._mongooseConnection.model(modelName);
    }

    private generateConnectionString(dbCOnfig){
        let MONGODB_CONNECTION;

        if(dbCOnfig.isSrv){
            MONGODB_CONNECTION = `mongodb+srv://${dbCOnfig.user}:${dbCOnfig.password}@${dbCOnfig.host}/${dbCOnfig.name}?retryWrites=true&w=majority`
        }else{
            MONGODB_CONNECTION = `mongodb://${dbCOnfig.user}:${dbCOnfig.password}@${dbCOnfig.host}:${dbCOnfig.port}/${dbCOnfig.name}`
        }

        return MONGODB_CONNECTION
    };

    private _dbConnect(mongoConfig){
        if(this._connectionInProgress) return;
        if(this._mongooseInstance) return this._mongooseInstance;

        this._connectionInProgress = true;
        this._mongooseConnection.once("open", () => {
            console.log("MONGO DB CONNECTED !");
            this._connectionInProgress = false;
        });
        
       let connString = this.generateConnectionString(mongoConfig);

       const options:mongoose.ConnectionOptions = {
        useNewUrlParser: true,
        useCreateIndex: true,
        autoIndex: true, //this is the code I added that solved it all
        keepAlive: true,
        poolSize: 10,
        bufferMaxEntries: 0,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        family: 4, // Use IPv4, skip trying IPv6
        useFindAndModify: false,
        useUnifiedTopology: true
      }
       this._mongooseInstance = mongoose.connect(connString, options);
    }
    
    private _IOXschemaToValidJsonSchema (schema){
        if(schema.type == "object"){
            for(var key in schema.properties){
                this._IOXschemaToValidJsonSchema(schema.properties[key]);
            }
        }else if(schema.type == "array" && schema.items.type == "object"){
            this._IOXschemaToValidJsonSchema(schema.items);
        }else{
            if(schema.type == "select"){
                schema.type = "string"
                schema.enum = [];
                for(var i=0;i < schema.options.length;i++){
                    schema.enum.push(schema.options[i].value);
                }
                delete schema.options;
            }
            delete schema.label;
        }
        return schema;
    }

    // private _initialzieDb(dbCOnfig){
    //     exec(`mongo iox-db --eval "db.createUser({user:'admin',pwd:'admin',roles:['readWrite','dbAdmin']})"`, (error, stdout, stderr) => {
    //         if (error) {
    //             console.log(`error: ${error}`);
    //             return;
    //         }
    //         if (stderr) {
    //             this._dbConnect(dbCOnfig);
    //         }
    //         console.log(`stdout: ${stdout}`);
    //     });
    // }
}  
