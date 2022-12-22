import { IsNotEmpty, MaxLength } from "class-validator"
import { IsBooleanFromString, IsNumberFromString } from "src/decorator/common-validator"
import { IsProductNameAlreadyExist } from "src/decorator/product-validator"

export class ProductData {
  // @IsProductNameAlreadyExist({ message: 'This product is already exist' })
  @MaxLength(99, { message: 'Too long' })
  @IsNotEmpty({ message: 'Required' })
  private name: string

  @MaxLength(10000, { message: 'Too long' })
  @IsNotEmpty({ message: 'Required' })
  private description: string

  @MaxLength(99, { message: 'Too long' })
  @IsNotEmpty({ message: 'Required' })
  private category: string

  @MaxLength(8, { message: 'Too long' })
  @IsNumberFromString({ message: 'Not a number' })
  @IsNotEmpty({ message: 'Required' })
  private weight: string

  @MaxLength(5, { message: 'Too long' })
  @IsNumberFromString({ message: 'Not a number' })
  @IsNotEmpty({ message: 'Required' })
  private stock: string

  @MaxLength(9, { message: 'Too long' })
  @IsNumberFromString({ message: 'Not a number' })
  @IsNotEmpty({ message: 'Required' })
  private basePrice: string

  @MaxLength(9, { message: 'Too long' })
  @IsNumberFromString({ message: 'Not a number' })
  private discountPrice: string

  @IsBooleanFromString({ message: 'Not a boolean' })
  @IsNotEmpty({ message: 'Required' })
  private inStock: string
  
  @IsBooleanFromString({ message: 'Not a boolean' })
  @IsNotEmpty({ message: 'Required' })
  private isDiscount: string

  constructor(data) {
    this.name = data.name
    this.description = data.description
    this.category = data.category
    this.weight = data.weight
    this.stock = data.stock
    this.basePrice = data.basePrice
    this.discountPrice = data.discountPrice
    this.inStock = data.inStock
    this.isDiscount = data.isDiscount
  }
}