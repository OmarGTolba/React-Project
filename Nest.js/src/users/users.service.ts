import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';


@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private user, private jwt: JwtService) { }
  // .............................................................................................................................................
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
  // .............................................................................................................................................
  async Log(user, res: Response) {
    let foundedUser = await this.user.findOne({ email: user.email })
    if (!foundedUser) { return { message: "Email Not Found ..." } }
    let checkPass = await bcrypt.compare(user.password, foundedUser.password)
    if (!checkPass) { return { message: "Wrong ..." } }
    let token = await this.jwt.sign({ isAdmin: foundedUser.isAdmin })
    res.header({ jwt: token }).send({ token, foundedUser })
  }
  // .............................................................................................................................................
  async Reg(user) {
    let foundedUser = await this.user.findOne({ email: user.email })
    if (foundedUser) { return { message: "Email already exists ..." } }
    let Salt = await bcrypt.genSalt(10)
    let passwordHash = await bcrypt.hash(user.password, Salt)
    user.password = passwordHash
    let newUser = new this.user(user)
    await newUser.save()
    return { message: "Register success" }
  }
  // .............................................................................................................................................
  findAll() {
    return this.user.find().populate('favorite').exec();
  }
  // .............................................................................................................................................
  findOne(id: string) {
    return this.user.findById(id).populate('favorite').exec();
  }
  // .............................................................................................................................................
  update(id: string, updateUserDto: any) {
    return this.user.findByIdAndUpdate(id, updateUserDto, { new: true });
  }
  // .............................................................................................................................................
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  // .............................................................................................................................................
  async addFavorite(id: string, body: string) {
    const user = await this.user.findById(id);
    console.log(body);
    let arr = user.favorite
    arr.push(body);
    console.log(arr);
    const userData = {
      title: user.title,
      content: user.content,
      image: user.image,
      user: user.user,
      comments: user.comments,
      favorite: arr
    };
    return this.update(id, userData);
  }
  // .............................................................................................................................................
  async removeFavorite(userId: string, favoriteId: string) {
    const user = await this.user.findById(userId);
    if (!user) {
    }
    const index = user.favorite.indexOf(favoriteId);
    if (index === -1) {
    }
    user.favorite.splice(index, 1);
    return this.update(userId, user);
  }
  // .............................................................................................................................................

}
