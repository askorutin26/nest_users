//структура таблицы users в базе данных, название и данные в столбцах

import { Column, DataType, Model, Table } from 'sequelize-typescript';

//поля для создание объекта из класса
interface UserCreationAttr {
  email: string;
  password: string;
}
@Table({ tableName: 'users' }) // декоратор чтобы класс стал таблицей в бд
export class User extends Model<User, UserCreationAttr> {
  //generics ( <> )
  //декоратор дял создания строки в таблице, внутри конфиг, указание типов
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number; //название и тип полей в таблице

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
}
