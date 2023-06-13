import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
  HttpCode,
} from "@nestjs/common"
import { ExpensesService } from "./expenses.service"
import { CreateExpenseDto } from "./dto/create-expense.dto"
import { UpdateExpenseDto } from "./dto/update-expense.dto"
import { ZodValidationPipe } from "@anatine/zod-nestjs"

@Controller({
  version: "1",
  path: "expenses",
})
@UsePipes(ZodValidationPipe)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return await this.expensesService.create(createExpenseDto)
  }

  @Get()
  async findAll() {
    return await this.expensesService.findAll({})
  }

  @Get("group/:groupId")
  async findAllByGroupId(@Param("groupId", ParseIntPipe) groupId: number) {
    return await this.expensesService.findAllByGroupId(groupId)
  }

  @Get(":id/members")
  async findAllMembers(@Param("id", ParseIntPipe) id: number) {
    return await this.expensesService.findAllMembers(id)
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return await this.expensesService.findOne(id)
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return await this.expensesService.update(id, updateExpenseDto)
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    return await this.expensesService.remove(id)
  }
}
