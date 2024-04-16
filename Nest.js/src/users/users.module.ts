import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { usersSchema } from './users.schema';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports:[
    MongooseModule.forFeature([{name:"users",schema:usersSchema}])
  ,   JwtModule.register({secret:'secret' ,signOptions:{expiresIn:'1d'}})

  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
