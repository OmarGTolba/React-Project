import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LogInDto } from './dto/login-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  // .............................................................................................................................................
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  // .............................................................................................................................................
  @UsePipes(ValidationPipe)
  @Post('reg')
  Registeration(@Body() user: CreateUserDto) {
    return this.usersService.Reg(user);
  }
  // .............................................................................................................................................
  @UsePipes(ValidationPipe)
  @Post('log')
  Login(@Body() user: LogInDto, @Res({ passthrough: true }) res) {
    return this.usersService.Log(user, res);
  }
  // .............................................................................................................................................
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  // .............................................................................................................................................
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  // .............................................................................................................................................
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.usersService.update(id, updateUserDto);
  }
  // .............................................................................................................................................
  @Patch(':id/image')
  @UseInterceptors(FileInterceptor('image'))
  updateUserPhoto(@UploadedFile() file, @Param('id') id: string, @Body() body: any) {
    const uploadDirectory = '../Project/public';
    let blogPostData = { title: '', content: '', user: '', image: '', comments: [] }
    if (file) {
      if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory, { recursive: true });
      }
      const uniqueFilename = new Date().getTime() + '-' + file.originalname;
      const blogUser = {
        image: uniqueFilename,
        name: body.name,
        age: body.age,
      };
      fs.writeFileSync(path.join(uploadDirectory, uniqueFilename), file.buffer);
      return this.usersService.update(id, blogUser);
    }
  }
  // .............................................................................................................................................
  @Patch(':id/favorite')
  updateFavorite(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.usersService.addFavorite(id, updateUserDto.favorite);
  }
  // .............................................................................................................................................
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  // .............................................................................................................................................
  @Delete(':id/favorite')
  removeFromFavorite(@Param('id') id: string, @Body() body: any) {
    return this.usersService.removeFavorite(id, body.favorite);
  }
  // .............................................................................................................................................

}
