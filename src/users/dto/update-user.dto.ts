import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { UserCreateSchema } from "./create-user.dto"

const UserUpdateSchema = UserCreateSchema.omit({
  email: true,
}).optional()

const UpdateUserZ = extendApi(UserUpdateSchema, {
  title: "Update User",
  description: "Update an existing user",
})

export class UpdateUserDto extends createZodDto(UpdateUserZ) {}
