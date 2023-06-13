import { Injectable } from "@nestjs/common"
import { PrismaService } from "../database/prisma.service"
import { Prisma, Expense } from "@prisma/client"
import { CreateExpenseDto } from "./dto/create-expense.dto"
import { ExpensesMembersService } from "src/expenses-members/expenses-members.service"
import { UpdateExpenseDto } from "src/expenses/dto/update-expense.dto"
import { CustomExpenseMember } from "src/types/extends"

@Injectable()
export class ExpensesService {
  constructor(
    private prisma: PrismaService,
    private expenseMember: ExpensesMembersService,
  ) {}

  async create(data: CreateExpenseDto): Promise<Expense> {
    const expense = await this.prisma.expense.create({
      data: {
        name: data.name,
        description: data.description,
        amount: data.amount,
        date: data.date,
        group: {
          connect: {
            id: data.groupId,
          },
        },
        category: {
          connect: {
            id: data.categoryId,
          },
        },
        payer: {
          connect: {
            id: data.paidBy,
          },
        },
      },
    })

    for await (const member of data.members) {
      await this.expenseMember.create({
        expenseId: expense.id,
        userId: member.id,
        amount: Math.floor(data.amount / (data.members.length + 1)),
        hasPaid: member.hasPaid,
      })
    }

    return expense
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ExpenseWhereUniqueInput
    where?: Prisma.ExpenseWhereInput
    orderBy?: Prisma.ExpenseOrderByWithRelationInput
  }): Promise<Expense[]> {
    const { skip, take, cursor, where, orderBy } = params
    return await this.prisma.expense.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async findAllByGroupId(groupId: number): Promise<Expense[]> {
    return await this.prisma.expense.findMany({
      where: {
        groupId,
      },
    })
  }

  async findAllMembers(id: number): Promise<CustomExpenseMember[]> {
    const expenseMembers = await this.prisma.expenseMember.findMany({
      where: {
        expense: {
          id,
        },
      },
      include: {
        user: true,
      },
    })

    return expenseMembers.map((expenseMember) => {
      return {
        expenseMemberId: expenseMember.id,
        hasPaid: expenseMember.hasPaid,
        amount: expenseMember.amount,
        ...expenseMember.user,
      }
    })
  }

  async findOne(id: number): Promise<Expense | null> {
    return await this.prisma.expense.findUnique({
      where: {
        id,
      },
    })
  }

  async update(id: number, data: UpdateExpenseDto): Promise<Expense> {
    const expense = await this.prisma.expense.update({
      data: {
        description: data.description,
        date: data.date,
        category: {
          connect: {
            id: data.categoryId,
          },
        },
      },
      where: {
        id,
      },
    })

    for (const userId of data.members) {
      await this.expenseMember.create({
        expenseId: expense.id,
        userId,
        amount: Math.floor(expense.amount / (data.members.length + 1)),
        hasPaid: false,
      })
    }

    return expense
  }

  async remove(id: number) {
    await this.prisma.expense.delete({
      where: {
        id,
      },
    })
  }
}
