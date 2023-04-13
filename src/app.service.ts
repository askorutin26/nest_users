import { Injectable } from '@nestjs/common';

@Injectable() //декоратор для внедрения в контроллер (инъенкция)
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
