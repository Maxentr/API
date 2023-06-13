import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { z } from "zod"

export const ExpenseCategoryCreateSchema = z.object({
  name: z.string().min(3).max(50),
})

const CreateExpenseCategoryZ = extendApi(ExpenseCategoryCreateSchema, {
  title: "Create ExpenseCategory",
  description: "Create a new expense category",
})

export class CreateExpenseCategoryDto extends createZodDto(
  CreateExpenseCategoryZ,
) {}
