import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { PrismaClient } from '@prisma/client';
import { SignupProps } from './dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  private readonly prisma: PrismaClient = new PrismaClient()

  public async signup(data: SignupProps): Promise<void> {
    const hashedPassword = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))

    await this.prisma.user.create({
      data: { name: data.name, email: data.email, password: hashedPassword}
    })
  }
}
