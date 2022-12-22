import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaClient } from '@prisma/client';

@ValidatorConstraint({ async: true })
class IsProductNameAlreadyExistConstraint implements ValidatorConstraintInterface {
  private prisma: PrismaClient = new PrismaClient()

  public async validate(name: any): Promise<boolean> {
    if(typeof name != 'string') return true  

    return this.prisma.products.findFirst({ where: { name }}).then((res): boolean => res ? false : true)
  }
}

export function IsProductNameAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsProductNameAlreadyExistConstraint,
    });
  }
}