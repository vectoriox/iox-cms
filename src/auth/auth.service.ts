import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { urlencoded } from 'express';
@Injectable()
export class AuthService {
  constructor(private _usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    let res = await this._usersService.getUser(null,{email:email},true);
    let user = res[0]; 
    if (user && bcrypt.compareSync(pass, user.pass)) {
      //const { pass, ... result } = user;
      return {
        _id: user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        role:user.role,
        color:user.color,
        lastAccess: user.lastAccess
        }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id.toString() };
    user.lastAccess = new Date().getTime();
    this._usersService.updateUser(user._id, {lastAccess:new Date().getTime()});
    return {
      token: this.jwtService.sign(payload),
      user: user
    };
  }
}