import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async logIn(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user.rows[0]);
  }

  async signUp(userDto: CreateUserDto) {
    const userExists = await this.userService.getUserByEmail(userDto.email);
    if (userExists.count !== 0) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5); //хэшируем пароль
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user); //возвращаем токен
  }

  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload), //создание токена
    };
  }

  private async validateUser(
    userDto: CreateUserDto,
  ) /*проверяем что пароль в Бд и пароль с формы совпадает */ {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.rows[0].password,
    );

    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Wrong password or email' });
  }
}
