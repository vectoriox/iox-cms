
import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller("api/users")
export class UsersController {

    private _model;

    constructor(private _usersService: UsersService) {
    }
    @Get()
    async readAll(@Query() queryParams?): Promise<any> {
        let users = this._usersService.getUser();
        return this._mapUser(users);
    }

    @Get(':id')
    async read(@Param('id') id?): Promise<any> {
        let user = await this._usersService.getUser(id);
        return this._mapUser(user);
    }


    @Post()
    async create(@Body() data) {
        let user = await this._usersService.createUser(data);
        return this._mapUser(user);
    }

    @Put(':id')
    async update(@Param('id') id, @Body() data): Promise<any> {
        let user = await this._usersService.updateUser(id, data)
        return this._mapUser(user);
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
                roles:user.roles,
            }
        });
        return mappedUsers;
    }
}