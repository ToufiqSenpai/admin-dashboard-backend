import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { SignupData, SignupProps } from './dto';
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
  public async signup(@Body() data: SignupProps): Promise<ResponseBody> {
    const signupData: SignupData = new SignupData(data)
    const validateData = await validate.validateAndExtract(signupData)
    const availableUser = await this.prisma.user.findFirst({
      where: { email: data.email }
    })

    if(!validateData.isValid || availableUser) {
      throw new NotAcceptableException(new ResponseBody(null, validateData.errors, HttpStatus.NOT_ACCEPTABLE))
    }
 
    await this.authService.signup(data)

    return new ResponseBody(null, null, HttpStatus.CREATED)
  }
}
