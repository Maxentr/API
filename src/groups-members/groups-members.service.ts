import { Injectable } from "@nestjs/common"
import { PrismaService } from "../database/prisma.service"
import { Prisma, GroupMember } from "@prisma/client"

type GroupMembersCreateInput = {
  groupId: number
  userId: number
}

@Injectable()
export class GroupsMembersService {
  constructor(private prisma: PrismaService) {}

  async create(data: GroupMembersCreateInput): Promise<GroupMember> {
    return await this.prisma.groupMember.create({
      data: {
        group: {
          connect: {
            id: data.groupId,
          },
        },
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    })
  }

  async createWithEmail(data: {
    groupId: number
    email: string
  }): Promise<GroupMember> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    })

    return await this.create({
      groupId: data.groupId,
      userId: user.id,
    })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.GroupMemberWhereUniqueInput
    where?: Prisma.GroupMemberWhereInput
    orderBy?: Prisma.GroupMemberOrderByWithRelationInput
  }): Promise<GroupMember[]> {
    const { skip, take, cursor, where, orderBy } = params
    return await this.prisma.groupMember.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async findOne(id: number): Promise<GroupMember | null> {
    return await this.prisma.groupMember.findUnique({
      where: {
        id,
      },
    })
  }

  async update(
    id: number,
    data: Prisma.GroupMemberUpdateInput,
  ): Promise<GroupMember> {
    const updatedData = data

    return await this.prisma.groupMember.update({
      data: updatedData,
      where: {
        id,
      },
    })
  }

  async removeFromGroup(groupId: number, userId: number) {
    await this.prisma.groupMember.deleteMany({
      where: {
        groupId,
        userId,
      },
    })
  }

  async remove(id: number) {
    await this.prisma.groupMember.delete({
      where: {
        id,
      },
    })
  }
}
