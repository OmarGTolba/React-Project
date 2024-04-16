import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { messageSchema } from './message.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"messages",schema:messageSchema}])
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
