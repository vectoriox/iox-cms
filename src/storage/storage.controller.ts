
import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from './storage.service';


@Controller("api/storage")
export class StorageController {


    constructor(private _storageService: StorageService) {
    }



    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(@UploadedFile() file: Express.Multer.File) {
        var res = await this._storageService.uploadFIle(file);
        return res;
    }

    @Delete(':id')
    async delete(@Param('id')fileKey: string) {
        var res = await this._storageService.deleteFile(fileKey);
        return res;
    }
}