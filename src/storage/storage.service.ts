import { Injectable } from "@nestjs/common";
import * as AWS from 'aws-sdk';
import { AppConfig, IStorageConfig } from "../config/app.config"
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {

    private _s3:any;
    constructor(private _configService:ConfigService) {


        let storageConfig = this._configService.get<IStorageConfig>(AppConfig.StorageConfig);

        const spacesEndpoint = new AWS.Endpoint(storageConfig.endpoint);
        this._s3 = new AWS.S3({
            endpoint: spacesEndpoint,
            accessKeyId: storageConfig.accessKeyId,
            secretAccessKey: storageConfig.secretAccessKey 
        });
    }

    getListBuckets(){
        var promise = new Promise((resolve, reject)=>{
            this._s3.listBuckets({}, function(err, data) {
                if (err) console.log(err, err.stack);
                else {
                    console.log(data);
                    data['Buckets'].forEach(function(space) {
                        console.log(space['Name']);
                    })
                    resolve(data);
                };
            });
        })
        return promise;
    }

    uploadFIle(file){

        var promise = new Promise((resolve, reject)=>{
            this._s3.upload({
                Bucket:'ioxdev',
                Key: `${file.originalname}-${new Date().getTime()}` ,
                Body: file.buffer,
                ACL:'public-read'
            }, (err,data)=>{
                if(err){
                    console.log(err);
                    reject(data);
                }else{
                    console.log(data);
                    resolve(data)
                }
            })
        })

        return promise;
    }

    deleteFile(key){
        let promise = new Promise((resolve,reject)=>{
            this._s3.deleteObjects({Bucket:'ioxdev',
            Delete:{
                Objects:[{Key: key}]}}, (err, data)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(data)
                    }
                })
        })         
        return promise;
    }
}









