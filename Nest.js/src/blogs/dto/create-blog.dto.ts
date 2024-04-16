import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateBlogDto {

    @IsString()
    title: string;
    
    @IsString()
    content: string;
    
    @IsString()
    image:string

    @IsString()
    user:string
    
    @IsString()
    createdAt:Array<any>

    

}
