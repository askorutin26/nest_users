import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';

import { CreateUserDto } from './dto/createUser.dto';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class UsersService {
  //внедряем модель таблицы для работы с ней
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  //функция, внутри аргумент- дто, тип и структура входящих данных
  async createUser(dto: CreateUserDto) {
    const { email, password, name, surname, phone } = dto;
    const userExists = await this.getUserByEmail(email);

    if (userExists.count === 0) {
      const user = await this.userRepository.create({ email, password }); //создаем user (имя пароль)
      return user;
    } else {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
  }

  async getUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getUserByEmail(email: string) {
    const result = await this.userRepository.findAndCountAll({
      where: { email },
    }); //count and rows to check
    return result;
  }
}
