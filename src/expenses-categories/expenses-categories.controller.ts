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
import { ExpensesCategoriesService } from "./expenses-categories.service"
import { CreateExpenseCategoryDto } from "./dto/create-expense-category.dto"
import { UpdateExpenseCategoryDto } from "./dto/update-expense-category.dto"
import { ZodValidationPipe } from "@anatine/zod-nestjs"

@Controller({
  version: "1",
  path: "expenses-categories",
})
@UsePipes(ZodValidationPipe)
export class ExpensesCategoriesController {
  constructor(
    private readonly expensesCategoriesService: ExpensesCategoriesService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createExpenseDto: CreateExpenseCategoryDto) {
    return await this.expensesCategoriesService.create(createExpenseDto)
  }

  @Post("/groups/:groupId")
  @HttpCode(201)
  async createForGroup(
    @Param("groupId", ParseIntPipe) id: number,
    @Body() createExpenseDto: CreateExpenseCategoryDto,
  ) {
    return await this.expensesCategoriesService.createForGroup(
      id,
      createExpenseDto,
    )
  }

  @Get()
  async findAll() {
    return await this.expensesCategoriesService.findAll({})
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return await this.expensesCategoriesService.findOne(id)
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseCategoryDto,
  ) {
    return await this.expensesCategoriesService.update(id, updateExpenseDto)
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    return await this.expensesCategoriesService.remove(id)
  }
}
