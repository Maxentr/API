import { Module } from "@nestjs/common"
import { ExpensesMembersService } from "./expenses-members.service"
import { PrismaModule } from "src/database/prisma.module"
import { ExpensesMembersController } from "src/expenses-members/expenses-members.controller"

@Module({
  controllers: [ExpensesMembersController],
  providers: [ExpensesMembersService],
  imports: [PrismaModule],
  exports: [ExpensesMembersService],
})
export class ExpensesMembersModule {}
