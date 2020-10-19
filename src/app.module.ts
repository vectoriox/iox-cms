import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResourcesModule } from './resources/resources.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './config/app.config';
import { CoreModule, LoggerService } from './core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load:[DatabaseConfig]
    }),
    ResourcesModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(logger: LoggerService) {
    logger.setContext('AppModule');
    logger.log("app started!!!!");
  }
}
