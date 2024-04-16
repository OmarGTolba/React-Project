import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentsService {
  constructor(@InjectModel('comments') private comment) { }
  // .............................................................................................................................................
  create(commentData: CreateCommentDto) {
    const newComment = new this.comment(commentData);
    return newComment.save();
  }
  // .............................................................................................................................................
  getBlogComments(blog: string) {
    return this.comment.find({ blog }).populate('blog');
  }
  // .............................................................................................................................................
  findAll() {
    return this.comment.find().populate('blog');
  }
  // .............................................................................................................................................
  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }
  // .............................................................................................................................................
  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }
  // .............................................................................................................................................
  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
