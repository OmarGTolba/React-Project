import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MessagesService {
  constructor(@InjectModel('messages') private message) { }
  // .............................................................................................................................................
  create(createMessageDto: CreateMessageDto) {
    const newMessage = this.message(createMessageDto)
    return newMessage.save()
  }
  // .............................................................................................................................................
  findAll() {
    return this.message.find()
  }
  // .............................................................................................................................................
  findOne(id: number) {
    return `This action returns a #${id} message`;
  }
  // .............................................................................................................................................
  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }
  // .............................................................................................................................................
  remove(id: number) {
    return `This action removes a #${id} message`;
  }
  // .............................................................................................................................................
}
