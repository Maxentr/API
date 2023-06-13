import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { hasISODate } from "src/common/zod"
import { z } from "zod"

const ExpenseUpdateSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  date: hasISODate.optional(),
  categoryId: z.number().int().optional(),
  members: z.array(z.number().int()).optional(),
})

const UpdateExpenseZ = extendApi(ExpenseUpdateSchema, {
  title: "Update Expense",
  description: "Update an existing expense",
})

export class UpdateExpenseDto extends createZodDto(UpdateExpenseZ) {}
