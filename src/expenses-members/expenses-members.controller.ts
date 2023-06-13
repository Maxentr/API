import {
  Controller,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
} from "@nestjs/common"
import { ZodValidationPipe } from "@anatine/zod-nestjs"
import { ExpensesMembersService } from "src/expenses-members/expenses-members.service"
import { UpdateExpensememberDto } from "src/expenses-members/dto/update-expense-members.dto"

@Controller({
  version: "1",
  path: "expenses-members",
})
@UsePipes(ZodValidationPipe)
export class ExpensesMembersController {
  constructor(
    private readonly expensesMembersService: ExpensesMembersService,
  ) {}

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateExpenseMemberDto: UpdateExpensememberDto,
  ) {
    return await this.expensesMembersService.update(id, updateExpenseMemberDto)
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    return await this.expensesMembersService.remove(id)
  }
}
