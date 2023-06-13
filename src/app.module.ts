import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { UsersModule } from "./users/users.module"
import { PrismaModule } from "src/database/prisma.module"
import { APP_FILTER } from "@nestjs/core"
import { HttpExceptionFilter } from "src/common/http-exception.filter"
import { ExpensesModule } from "src/expenses/expenses.module"
import { ExpensesCategoriesModule } from "src/expenses-categories/expenses-categories.module"
import { ExpensesMembersModule } from "src/expenses-members/expenses-members.module"
import { GroupsModule } from "./groups/groups.module"

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot(),
    UsersModule,
    ExpensesModule,
    ExpensesCategoriesModule,
    ExpensesMembersModule,
    GroupsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
