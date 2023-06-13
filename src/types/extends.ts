import { ExpenseMember, User } from "@prisma/client"

export interface CustomExpenseMember
  extends User,
    Omit<ExpenseMember, "id" | "userId" | "expenseId"> {
  expenseMemberId: number
}
