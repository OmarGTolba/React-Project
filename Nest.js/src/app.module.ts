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


@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost:27017/ui`),
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
