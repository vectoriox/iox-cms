import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResourcesModule } from './resources/resources.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig, InitialUserConfig, StorageConfig } from './config/app.config';
import { DataAccessModule } from './data-access/data-access.module';
import { SchemasModule } from './schemas/schemas.module';
import { UsersModule } from './users/users.module';
import { StorageModule } from './storage/sotrage.module';
import { AuthModule } from './auth/auth.module'; 
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    load:[DatabaseConfig, InitialUserConfig, StorageConfig]
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'iox-cms-client'),
    serveRoot: '/admin',
  }),
  DataAccessModule.register({ dbType: "mongo" }), 
  SchemasModule,
  UsersModule,
  StorageModule,
  ResourcesModule,
  AuthModule],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
})
export class AppModule {
  constructor(private _appService: AppService){
    console.log("app started!!!!")
    this._appService.initializer();
  }
}
