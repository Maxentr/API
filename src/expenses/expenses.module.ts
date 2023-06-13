import { Module } from "@nestjs/common"
import { ExpensesController } from "./expenses.controller"
import { ExpensesService } from "./expenses.service"
import { PrismaModule } from "src/database/prisma.module"
import { ExpensesMembersModule } from "src/expenses-members/expenses-members.module"

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService],
  imports: [PrismaModule, ExpensesMembersModule],
  exports: [ExpensesService],
})
export class ExpensesModule {}
