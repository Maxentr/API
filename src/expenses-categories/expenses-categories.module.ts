import { Module } from "@nestjs/common"
import { ExpensesCategoriesController } from "./expenses-categories.controller"
import { ExpensesCategoriesService } from "./expenses-categories.service"
import { PrismaModule } from "src/database/prisma.module"

@Module({
  controllers: [ExpensesCategoriesController],
  providers: [ExpensesCategoriesService],
  imports: [PrismaModule],
  exports: [ExpensesCategoriesService],
})
export class ExpensesCategoriesModule {}
