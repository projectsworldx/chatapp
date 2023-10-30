import { IsString, IsInt, IsOptional, IsNotEmpty, IsPhoneNumber, IsStrongPassword } from 'class-validator';




export class CreateUserDto {
    @IsString()
     name: string;

    @IsString()
    readonly email: string;

    @IsPhoneNumber()
    readonly phone: string;

    @IsString()
    password: string;

    @IsInt()
    role: number;
}


export class UserLogin {
    @IsString()
     email: string;

    @IsString()
    readonly password: string;
}
