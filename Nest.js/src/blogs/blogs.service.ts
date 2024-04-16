import { Body, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BlogsService {
  constructor(@InjectModel('Blog') private blogs) {}
  // .............................................................................................................................................
  create(blogData: any) {
    const createdBlog = new this.blogs(blogData);
    return createdBlog.save();
  }
  // .............................................................................................................................................
  findAll() {
    return this.blogs.find().populate('user');
  }
  // .............................................................................................................................................
  async search(query: string){
    const searchResults = await this.blogs.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, 
        { content: { $regex: query, $options: 'i' } },
      ],
    }).exec();

    return searchResults;
  }
  // .............................................................................................................................................
  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }
  // .............................................................................................................................................
  async update(id: string, updateBlogDto: UpdateBlogDto) {
    const updatedBlog = await this.blogs
      .findByIdAndUpdate(id, updateBlogDto, { new: true })
      .exec();
    return updatedBlog;
  }
  // .............................................................................................................................................
  async addComment(id: string, body: string) {
    const blog = await this.blogs.findById(id);
    blog.comments.push(body);
    const blogPostData = {
      title: blog.title,
      content: blog.content,
      image: blog.image,
      user: blog.user,
      comments: [],
    };
    return this.update(id, blogPostData);
  }
  // .............................................................................................................................................
  async remove(id: string) {
    const deletedBlog = await this.blogs.findByIdAndDelete(id).exec();
    return deletedBlog;
  }
}
