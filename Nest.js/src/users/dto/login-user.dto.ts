import { IsNotEmpty, MinLength } from "class-validator";

export class LogInDto {
    @IsNotEmpty()
    email:String;
        
    @IsNotEmpty()
    @MinLength(3)
    password:String;
}
