import { Injectable } from "@nestjs/common"
import { PrismaService } from "../database/prisma.service"
import { Prisma, ExpenseMember } from "@prisma/client"

type ExpenseMemberCreateInput = {
  expenseId: number
  userId: number
  amount: number
  hasPaid: boolean
}

@Injectable()
export class ExpensesMembersService {
  constructor(private prisma: PrismaService) {}

  async create(data: ExpenseMemberCreateInput): Promise<ExpenseMember> {
    return await this.prisma.expenseMember.create({
      data: {
        expense: {
          connect: {
            id: data.expenseId,
          },
        },
        user: {
          connect: {
            id: data.userId,
          },
        },
        amount: data.amount,
        hasPaid: data.hasPaid,
      },
    })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ExpenseMemberWhereUniqueInput
    where?: Prisma.ExpenseMemberWhereInput
    orderBy?: Prisma.ExpenseMemberOrderByWithRelationInput
  }): Promise<ExpenseMember[]> {
    const { skip, take, cursor, where, orderBy } = params
    return await this.prisma.expenseMember.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async findOne(id: number): Promise<ExpenseMember | null> {
    return await this.prisma.expenseMember.findUnique({
      where: {
        id,
      },
    })
  }

  async update(
    id: number,
    data: Prisma.ExpenseMemberUpdateInput,
  ): Promise<ExpenseMember> {
    const updatedData = data

    return await this.prisma.expenseMember.update({
      data: updatedData,
      where: {
        id,
      },
    })
  }

  async remove(id: number) {
    await this.prisma.expenseMember.delete({
      where: {
        id,
      },
    })
  }
}
