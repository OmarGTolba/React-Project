import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { commentSchema } from './comments.schema';
import { BlogsController } from 'src/blogs/blogs.controller';
import { BlogsService } from 'src/blogs/blogs.service';
@Module({
  imports:[
    MongooseModule.forFeature([{name:"comments",schema:commentSchema}])
  ,   JwtModule.register({secret:'secret' ,signOptions:{expiresIn:'1d'}})

  ], controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
