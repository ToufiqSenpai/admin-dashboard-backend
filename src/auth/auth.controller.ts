import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { LoginData, LoginProps, SignupData, SignupProps } from './dto';
import { PrismaClient } from '@prisma/client';
import * as validate from 'class-validator-ext'
import { ResponseBody } from 'src/utils/response-body';
import { AuthService } from './auth.service';
import { NotAcceptableException } from '@nestjs/common/exceptions';

@Controller('auth')
export class AuthController {
  private readonly prisma: PrismaClient = new PrismaClient()

  constructor(private authService: AuthService) {}

  @Post('signup')
  public async signup(@Body() body: SignupProps): Promise<ResponseBody> {
    // Available email belum diverifikasi
    const signupData: SignupData = new SignupData(body)
    const validateData = await validate.validateAndExtract(signupData)
    const availableUser = await this.prisma.user.findFirst({
      where: { email: body.email }
    })

    if(!validateData.isValid || availableUser) {
      throw new NotAcceptableException(new ResponseBody(null, validateData.errors, HttpStatus.NOT_ACCEPTABLE))
    }
 
    await this.authService.signup(body)

    return new ResponseBody(null, null, HttpStatus.CREATED)
  }

  @Post('login')
  @HttpCode(202)
  public async login(@Body() body: LoginProps): Promise<ResponseBody> {
    const loginData: LoginData = new LoginData(body)
    await validate.validateAndExtract(loginData)
    
    return new ResponseBody(null, null, HttpStatus.ACCEPTED)  
  }
}