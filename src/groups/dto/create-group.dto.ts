import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { z } from "zod"

export const GroupCreateSchema = z.object({
  name: z.string().min(3).max(50),
  members: z.array(z.string().email()),
})

const CreateGroupZ = extendApi(GroupCreateSchema, {
  title: "Create Group",
  description: "Create a new group",
})

export class CreateGroupDto extends createZodDto(CreateGroupZ) {}
