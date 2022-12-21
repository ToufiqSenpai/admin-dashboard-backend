import { Body, Controller, Post, UseInterceptors, } from '@nestjs/common';
import { UploadedFiles } from '@nestjs/common/decorators';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  @Post('add-product')
  @UseInterceptors(FilesInterceptor('images', 999))
  public async addProduct(@Body() body, @UploadedFiles() file) {
    console.log(body)
    console.log(file)

    return { msg: "Ok"}
  }
}
