import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
@Module({
  //
  controllers: [AppController], //регистрируем контроллеры(руты) в приложении
  providers: [AppService], //регистрируем функции с логикой
  imports: [
    //импорт других модулей в главный модуль
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      //модуль для работы с БД, конфиг БД
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'nest_users',
      models: [User], //описание структуры таблиц
      autoLoadModels: true,
    }),

    UsersModule, //модуль users
    AuthModule,
  ],
})
export class AppModule {}
