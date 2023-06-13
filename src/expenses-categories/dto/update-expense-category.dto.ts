import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import { ExpenseCategoryCreateSchema } from "./create-expense-category.dto"

const ExpenseCategoryUpdateSchema = ExpenseCategoryCreateSchema.optional()

const UpdateExpenseCategoryZ = extendApi(ExpenseCategoryUpdateSchema, {
  title: "Update ExpenseCategory Category",
  description: "Update an existing expense category",
})

export class UpdateExpenseCategoryDto extends createZodDto(
  UpdateExpenseCategoryZ,
) {}
