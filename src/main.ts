import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    {
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
        methods: ["GET","PUT","PATCH","POST","DELETE"],
      },
  });

  //global filter
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true}));
  
  app.use(cookieParser());

  await app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on  http://localhost:${process.env.PORT || 5000}`); 
  });

}
bootstrap();
