import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './users/users.guards';
import { BlogsModule } from './blogs/blogs.module';
import { CommentsModule } from './comments/comments.module';
import { SocketGateway } from './socket/socket.gateway';
import { MessagesModule } from './messages/messages.module';
import { MessagesService } from './messages/messages.service';
import { messageSchema } from './messages/message.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://admin:jjPoycnkmTbLzT7R@cluster0.eukhj9i.mongodb.net/blogs`),
    MongooseModule.forFeature([{ name: "messages", schema: messageSchema }]),
    UsersModule,
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1d' } }),
    BlogsModule,
    CommentsModule,
    MessagesModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    SocketGateway, MessagesService
  ],
})


export class AppModule { }
