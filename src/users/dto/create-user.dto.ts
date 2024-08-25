import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTO {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['Engineer', 'Admin', 'Intern'], { message: "Valid role requried" })
  role: 'Engineer' | 'Admin' | 'Intern'
}

