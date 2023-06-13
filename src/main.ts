import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { Logger, VersioningType } from "@nestjs/common"
import cookieParser from "cookie-parser"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { patchNestjsSwagger } from "@anatine/zod-nestjs"

const GLOBAL_PREFIX = "api"
const PORT = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {})

  // somewhere in your initialization file
  app.use(cookieParser())

  // security
  app.enableCors({ origin: process.env.APP_URL, credentials: true })

  app.setGlobalPrefix(GLOBAL_PREFIX)
  app.enableVersioning({
    type: VersioningType.URI,
  })

  const config = new DocumentBuilder()
    .setTitle("Ethib API")
    .setVersion("1.0")
    .build()
  patchNestjsSwagger()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(GLOBAL_PREFIX + "/docs", app, document)

  await app.listen(PORT, () => {
    Logger.log("Listening at http://localhost:" + PORT + "/" + GLOBAL_PREFIX)
  })
}
bootstrap()
