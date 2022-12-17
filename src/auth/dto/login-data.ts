import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export interface LoginProps {
  email: string
  password: string
}

export class LoginData {
  @MaxLength(99)
  @IsEmail()
  @IsNotEmpty()
  private email: string

  @MaxLength(99)
  @IsNotEmpty()
  private password: string

  constructor(data: LoginProps) {
    this.email = data.email
    this.password = data.password
  }
}