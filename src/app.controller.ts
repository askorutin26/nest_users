import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() //руты и функции по рутам
export class AppController {
  constructor(private readonly appService: AppService) {} //добавляем в конструктор app service, чтобы внутри использовать функции оттуда

  @Get() //get запрос по руту /
  getHello(): string {
    return this.appService.getHello(); //одноименная функция из сервиса app( appService.ts)
  }
}
