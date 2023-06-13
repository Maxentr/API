import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { z } from "zod"

export const UserCreateSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email(),
})

const CreateUserZ = extendApi(UserCreateSchema, {
  title: "Create User",
  description: "Create a new user",
})

export class CreateUserDto extends createZodDto(CreateUserZ) {}
