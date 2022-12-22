import { BadRequestException, Body, Controller, HttpStatus, Post, UseInterceptors, } from '@nestjs/common';
import { UploadedFiles } from '@nestjs/common/decorators';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as validate from 'class-validator-ext'
import { multerStorage } from 'src/utils/multer-storate';
import { ResponseBody } from 'src/utils/response-body';
import { ProductData } from './dto/product-data';
import * as fs from 'fs'

@Controller('products')
export class ProductsController {
  @Post('add-product')
  @UseInterceptors(FilesInterceptor('images', 999, multerStorage('./assets/products/img')))
  public async addProduct(@Body() body, @UploadedFiles() files: Array<Express.Multer.File>): Promise<ResponseBody> {
    const productData = new ProductData(body)
    await validate.validateAndExtract(productData).then(result => {
      if(!result.isValid) {
        for(const file of files) {
          fs.unlinkSync(`./assets/products/img/${file.filename}`)
        }

        throw new BadRequestException(new ResponseBody({
          status: HttpStatus.BAD_REQUEST,
          errors: result.errors
        }))
      }
    })

    console.log()

    return { msg: "Ok"}
  }
}
