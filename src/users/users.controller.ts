import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UsePipes,
  ValidationPipe,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    @Inject('USERS_SERVICE') private client: ClientProxy,
  ) {}

  @UsePipes(ValidationPipe)
  @Post() /*{email,password}*/
  async createUser(@Body() /*декоратор тела запроса*/ userDto: CreateUserDto) {
    const newUser = await this.usersService.createUser(userDto);
    const { name, surname, phone } = userDto;
    const profileDto = { name, surname, phone, userID: newUser.id };
    this.client.emit('create profile', profileDto);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
  @Get(':email') //найти пользователя по почте
  async getUserByEmail(@Param('email') email: string) {
    const result = await this.usersService.getUserByEmail(email);
    return result.rows;
  }
}
