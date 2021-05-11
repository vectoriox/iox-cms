import { Module } from '@nestjs/common';
import { DataAccessModule } from '../data-access/data-access.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersModel } from './users.model';

@Module({
  imports:[DataAccessModule.register({dbType:"mongo"})],
  controllers: [UsersController],
  providers: [UsersModel ,UsersService],
  exports:[UsersService]
})
export class UsersModule {
  constructor(){
    console.log("Users Module Initialzed")
  }
}