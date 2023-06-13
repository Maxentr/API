import { Injectable } from "@nestjs/common"
import { PrismaService } from "../database/prisma.service"
import { Prisma, ExpenseCategory } from "@prisma/client"
import { CreateExpenseCategoryDto } from "./dto/create-expense-category.dto"

@Injectable()
export class ExpensesCategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateExpenseCategoryDto): Promise<ExpenseCategory> {
    return await this.prisma.expenseCategory.create({
      data: {
        name: data.name,
        global: true,
      },
    })
  }

  async createForGroup(
    groupId: number,
    data: CreateExpenseCategoryDto,
  ): Promise<ExpenseCategory> {
    return await this.prisma.expenseCategory.create({
      data: {
        name: data.name,
        group: {
          connect: {
            id: groupId,
          },
        },
      },
    })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ExpenseWhereUniqueInput
    where?: Prisma.ExpenseWhereInput
    orderBy?: Prisma.ExpenseOrderByWithRelationInput
  }): Promise<ExpenseCategory[]> {
    const { skip, take, cursor, where, orderBy } = params
    return await this.prisma.expenseCategory.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async findOne(id: number): Promise<ExpenseCategory | null> {
    return await this.prisma.expenseCategory.findUnique({
      where: {
        id,
      },
    })
  }

  async update(
    id: number,
    data: Prisma.ExpenseCategoryUpdateInput,
  ): Promise<ExpenseCategory> {
    return await this.prisma.expenseCategory.update({
      data,
      where: {
        id,
      },
    })
  }

  async remove(id: number) {
    await this.prisma.expenseCategory.delete({
      where: {
        id,
      },
    })
  }
}
