import { MaxLength } from "class-validator"

export class ProductData {
  @MaxLength(99, { message: 'Too long' })
  private name: string

  @MaxLength(10000, { message: 'Too long' })
  private description: string

  @MaxLength(99, { message: 'Too long' })
  private category: string

  @MaxLength(8, { message: 'Too long' })
  private weight: string

  @MaxLength(5, { message: 'Too long' })
  private stock: string

  @MaxLength(9, { message: 'Too long' })
  private basePrice: string

  @MaxLength(9, { message: 'Too long' })
  private discountPrice: string

  private inStock: string
  
  private isDiscount: string
}