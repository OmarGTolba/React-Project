import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'; 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
app.useGlobalPipes(new ValidationPipe())
 
const corsOptions: CorsOptions = {
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
  preflightContinue: false,
  optionsSuccessStatus: 200,
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization', // Allow these headers
  credentials: true, // Allow sending credentials (e.g., cookies)
};

// Enable CORS with the specified options
app.enableCors(corsOptions);
await app.listen(3000);
}
bootstrap();
