import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { hasISODate } from "src/common/zod"
import { z } from "zod"

export const ExpenseCreateSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  date: hasISODate,
  amount: z.number().int(),
  groupId: z.number().int(),
  categoryId: z.number().int(),
  paidBy: z.number().int(),
  members: z.array(z.object({ id: z.number().int(), hasPaid: z.boolean() })),
})

const CreateExpenseZ = extendApi(ExpenseCreateSchema, {
  title: "Create Expense",
  description: "Create a new expense",
})

export class CreateExpenseDto extends createZodDto(CreateExpenseZ) {}
