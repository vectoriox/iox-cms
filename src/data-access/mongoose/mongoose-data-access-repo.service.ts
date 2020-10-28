import { Injectable } from "@nestjs/common";
import * as mongoose from "mongoose";
import { DataAccessRepoService } from "../data-access-repo.service";

   export interface IBaseRepo<T>{
    create (model:any, item: T):Promise<any>;
    read (model:any,_id: string, filters:object):Promise<any>;
    update (model:any, _id: mongoose.Types.ObjectId, item: T):Promise<any>;
    delete (model:any, _id: string):Promise<any>;
   }

   @Injectable()
   export  class MongooseDataAccessRepoService<T extends mongoose.Document> extends DataAccessRepoService<T> {
       
       
       constructor () {
        super();
       }
       
       create (model:any, item: T) {
           return model.create(item);    
       }
       
       read (model:any, _id: string, filters:object={}) {
            if (!_id) {
                return model.find(filters).exec();
            }else{
                if(_id.match(/^[0-9a-fA-F]{24}$/)){
                    return model.findById( _id).exec(); 
                }
                return [];
            }
       }
       
       update (model:any, _id: string, item: T) {
           return  model.update({_id: _id}, item).exec();
               
       }
           
       delete (model:any, _id: string) {
           return model.remove({_id: this.toObjectId(_id)}).exec();
          
       } 
        
       private toObjectId (_id: string) : mongoose.Types.ObjectId {
           return mongoose.Types.ObjectId.createFromHexString(_id)
       }
       
   }
   
