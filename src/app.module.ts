import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusModule } from './status/status.module';
import config from './config/orm.conf';
import configProd from './config/orm.conf.prod';
import { RequestService } from './request.service';
import { AuthentifiactionMiddleware } from './middleware/authentification.middleware';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { PlanningModule } from './planning/planning.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config, configProd],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV !== 'production' ? config : configProd,
    }),
    StatusModule,
    UserModule,
    TodoModule,
    PlanningModule,
  ],
  controllers: [AppController],
  providers: [AppService, RequestService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthentifiactionMiddleware).forRoutes('*');
  }
}
