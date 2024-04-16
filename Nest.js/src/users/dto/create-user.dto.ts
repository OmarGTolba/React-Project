import { IsBoolean, IsNotEmpty, MinLength,  } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(3)
    name:String;
    
    @IsNotEmpty()
    email:String;

    @IsNotEmpty()
    age:number;
    
    @IsNotEmpty()
    @MinLength(3)
    password:String;

    @IsBoolean()
    isAdmin?:boolean
}
