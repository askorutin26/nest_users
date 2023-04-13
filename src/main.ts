import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
//точка входа в приложение,
async function start() {
  const PORT = process.env.PORT || 3001;
  const app = await NestFactory.create(
    AppModule,
  ); /* app module - главный модуль, в нем другие модули */
  await app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
}
start();
