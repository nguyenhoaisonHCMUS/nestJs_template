import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //global filter
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe);


  await app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on  http://localhost:${process.env.PORT || 3000}`); 
  });

}
bootstrap();
