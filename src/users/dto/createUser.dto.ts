//структура данных для обмена клиент-сервер (сервер-сервер), какие данные приходят и возвращаются
import { IsString, Length, IsEmail } from 'class-validator';
export class CreateUserDto {
  @IsString({ message: 'Email Should be string' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;

  @IsString({ message: 'Password Should be string' })
  @Length(4, 16, { message: 'Length should be from 4 to 16' })
  readonly password: string;

  @IsString({ message: 'Name Should be string' })
  readonly name: string;

  @IsString({ message: 'Surname Should be string' })
  readonly surname: string;

  @IsString({ message: 'Phone Should be string' })
  readonly phone: string;
}
