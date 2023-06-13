import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { z } from "zod"

const ExpenseMemberUpdateSchema = z.object({
  hasPaid: z.boolean().optional(),
})

const UpdateExpenseMemberZ = extendApi(ExpenseMemberUpdateSchema, {
  title: "Update Expense Member",
  description: "Update an existing expense member",
})

export class UpdateExpensememberDto extends createZodDto(
  UpdateExpenseMemberZ,
) {}
