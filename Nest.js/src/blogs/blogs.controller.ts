import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
const axios = require('axios');

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) { }
  // .............................................................................................................................................
  @Post()
  async createBlog(@Body() createBlogDto: CreateBlogDto) {
    const newBlog = {
      title: createBlogDto.title,
      content: createBlogDto.content,
      image: createBlogDto.image,
      user: createBlogDto.user, // Access the file's path
      createdAt: createBlogDto.createdAt
    };
    const savedBlog = await this.blogsService.create(newBlog);
    return savedBlog;
  }
  // .............................................................................................................................................
  @Post('/upload-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file, @Body() body) {
    const uploadDirectory = '../Project/public';
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }
    const uniqueFilename = new Date().getTime() + '-' + file.originalname;
    fs.writeFileSync(path.join(uploadDirectory, uniqueFilename), file.buffer);
    const blogPostData = {
      title: body.title,
      content: body.content,
      image: uniqueFilename,
      user: body.user,
      createdAt: body.createdAt
    };
    try {
      const response = await axios.post('http://localhost:3000/blogs', blogPostData);
      console.log('Blog post created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
  }
  // .............................................................................................................................................
  @Get()
  findAll() {
    return this.blogsService.findAll();
  }
  // .............................................................................................................................................
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(+id);
  }
  // .............................................................................................................................................
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(@UploadedFile() file, @Param('id') id: string, @Body() body) {
    const uploadDirectory = '../Project/public';
    let blogPostData = { title: '', content: '', user: '', image: '', comments: [] }
    if (file) {
      if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory, { recursive: true });
      }
      const uniqueFilename = new Date().getTime() + '-' + file.originalname;
      fs.writeFileSync(path.join(uploadDirectory, uniqueFilename), file.buffer);
      blogPostData = {
        title: body.title,
        content: body.content,
        image: uniqueFilename,
        user: body.user,
        comments: []
      };
    }
    else {
      blogPostData = {
        title: body.title,
        content: body.content,
        image: body.image,
        user: body.user,
        comments: []
      };
    }
    return this.blogsService.update(id, blogPostData);
  }
  // .............................................................................................................................................
  @Patch(':id/comment')
  AddComment(@UploadedFile() file, @Param('id') id: string, @Body() body) {
    const uploadDirectory = '../Project/public';
    console.log(body.comment);
    return this.blogsService.addComment(id, body);
  }
  // .............................................................................................................................................
  @Get('/search/:input')
  async searchBlogs(@Param('input') input: string) {
    const searchResults = await this.blogsService.search(input);
    return searchResults;
  }
  // .............................................................................................................................................
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
  // .............................................................................................................................................
}
