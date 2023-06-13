import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common"
import { Response } from "express"

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()
    const request = context.getRequest<Request>()
    const statusCode = exception.getStatus()
    const ex = exception.getResponse()
    let parseException: any

    if (typeof ex === "string") {
      parseException = { message: ex }
    } else {
      parseException = ex
    }

    const finalResponse = {
      timestamp: new Date().toISOString(),
      statusCode: statusCode,
      error: parseException?.error,
      message: parseException?.message,
      path: request.url,
    }
    response.status(statusCode).json(finalResponse)
  }
}
