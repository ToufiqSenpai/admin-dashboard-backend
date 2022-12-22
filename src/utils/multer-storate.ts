import { BadRequestException } from "@nestjs/common"
import { diskStorage } from "multer"
import randomString from "./random-string"

export function multerStorage(path: string) {
  return {
    storage: diskStorage({
      destination: path,
      filename: (req, file, callback) => {
        const ext = file.originalname.split('.').slice(-1)
        const newFileName = `${randomString(32)}.${ext}`

        callback(null, newFileName)
      }
    }),
    // limits: { fileSize: 10 * 1024 * 1024 }
  }
}