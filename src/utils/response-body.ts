import { HttpStatus } from "@nestjs/common"

export class ResponseBody<T = any, E = any> {
  constructor(data: T, error: E | null, status: HttpStatus) {
    let statusMessage = null

    switch(status) {
      case 200:
        statusMessage = { status: 200, message: 'OK' }
        break
      case 201: 
        statusMessage = { status: 201, message: 'Created' }
        break
      case 202:
        statusMessage = { status: 202, message: 'Accepted' }
        break
      case 204:
        statusMessage = { status: 204, message: 'No Content' }
        break
      case 400:
        statusMessage = { status: 400, message: 'Bad Request' }
        break
      case 401:
        statusMessage = { status: 401, message: 'Unauthorized' }
        break
      case 403:
        statusMessage = { status: 403, message: 'Forbidden' }
        break
      case 404:
        statusMessage = { status: 204, message: 'No Content' }
        break
      case 405:
        statusMessage = { status: 405, message: 'Method Not Allowed' }
        break
      case 406:
        statusMessage = { status: 406, message: 'Not Accepted' }
        break
      case 409:
        statusMessage = { status: 409, message: 'Conflict' }
        break
      case 415:
        statusMessage = { status: 415, message: 'Unsupported media type' }
        break
      case 422:
        statusMessage = { status: 422, message: 'Unprocessable entity' }
        break
      default:
        statusMessage = { status: 200, message: 'OK' }
        break
    }

    return { ...statusMessage,  data: data, error: error }
  }
}