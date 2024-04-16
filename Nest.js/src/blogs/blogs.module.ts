import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './blogs.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"Blog",schema:BlogSchema}])
  ,   JwtModule.register({secret:'secret' ,signOptions:{expiresIn:'1d'}})

  ], controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
