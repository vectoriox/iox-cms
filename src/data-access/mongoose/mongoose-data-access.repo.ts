import { Injectable } from "@nestjs/common";
import * as mongoose from "mongoose";
import { DataAccessRepo } from "../data-access.repo";

   export interface IBaseRepo<T>{
    create (modelName:string, item: T):Promise<any>;
    read (modelName:string,_id: string, filters:object):Promise<any>;
    update (modelName:string, _id: mongoose.Types.ObjectId, item: T):Promise<any>;
    delete (modelName:string, _id: string):Promise<any>;
   }

   @Injectable()
   export  class MongooseDataAccessRepo<T extends mongoose.Document> extends DataAccessRepo<T> {
       
       
       constructor () {
        super();
       }
       
       create (modelName:string, item: T) {
           return this.getModel(modelName).create(item);    
       }
       
       read (modelName:string, _id: string, filters:object={}) {
            console.log(this.getModel(modelName))     
            if (!_id) {
                return this.getModel(modelName).find(filters).exec();
            }else{
                if(_id.match(/^[0-9a-fA-F]{24}$/)){
                    return this.getModel(modelName).findById( _id).exec(); 
                }
                return [];
            }
       }
       
       update (modelName:string, _id: string, item: T) {
           return  this.getModel(modelName).update({_id: _id}, item).exec();
               
       }
           
       delete (modelName:string, _id: string) {
           return this.getModel(modelName).remove({_id: this.toObjectId(_id)}).exec();
          
       } 
        
       private toObjectId (_id: string) : mongoose.Types.ObjectId {
           return mongoose.Types.ObjectId.createFromHexString(_id)
       }
       
   }
   
