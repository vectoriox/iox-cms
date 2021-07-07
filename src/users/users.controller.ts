
import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';


@Controller("api/users")
export class UsersController {

    private _model;

    constructor(private _usersService: UsersService) {
    }
    @Get()
    async readAll(@Query() queryParams?): Promise<any> {
        let users = await this._usersService.getUser();
        return this._mapUser(users);
    }

    @Get(':id')
    async read(@Param('id') id?): Promise<any> {
        let user = await this._usersService.getUser(id);
        return this._mapUser([user])[0];
    }


    @Post()
    async create(@Body() data) {
        try{
            let user = await this._usersService.createUser(data);
            return this._mapUser([user]);
        }catch(error){
            throw new HttpException({
                message: {
                    message: error.message,
                    status: HttpStatus.BAD_REQUEST
                },
              }, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async update(@Param('id') id, @Body() data): Promise<any> {
        let user = await this._usersService.updateUser(id, data)
        return this._mapUser([user]);
    }

    @Delete(':id')
    async delete(@Param('id') id): Promise<any>  {
        return this._usersService.deleteUser(id);
    }


    private _mapUser(users, includePass?:boolean){
        let mappedUsers = users.map(user => {
            return{
                _id: user._id,
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                role:user.role,
                lastAccess:user.lastAccess,
                color: user.color,
                profilePic:user.profilePic
            }
        });
        return mappedUsers;
    }
}