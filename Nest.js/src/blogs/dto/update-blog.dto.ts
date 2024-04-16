import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';
import { IsString } from 'class-validator';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
    @IsString()
    title: string;
    
    @IsString()
    content: string;
    
    @IsString()
    image:string
    
    @IsString()
    comments:Array<any>
}
