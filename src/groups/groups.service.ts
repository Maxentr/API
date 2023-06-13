import { Injectable } from "@nestjs/common"
import { CreateGroupDto } from "./dto/create-group.dto"
import { UpdateGroupDto } from "./dto/update-group.dto"
import { PrismaService } from "src/database/prisma.service"
import { Group, Prisma } from "@prisma/client"
import { GroupsMembersService } from "src/groups-members/groups-members.service"

@Injectable()
export class GroupsService {
  constructor(
    private prisma: PrismaService,
    private groupMember: GroupsMembersService,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const group = await this.prisma.group.create({
      data: {
        name: createGroupDto.name,
      },
    })

    for await (const email of createGroupDto.members) {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      })

      await this.groupMember.create({
        groupId: group.id,
        userId: user.id,
      })
    }

    return group
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.GroupWhereUniqueInput
    where?: Prisma.GroupWhereInput
    orderBy?: Prisma.GroupOrderByWithRelationInput
  }): Promise<Group[]> {
    const { skip, take, cursor, where, orderBy } = params
    return await this.prisma.group.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async findAllByUserId(userId: number) {
    return await this.prisma.group.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
    })
  }

  async findOne(id: number) {
    return await this.prisma.group.findUnique({
      where: { id },
    })
  }

  async findUnpaidExpensesOfUser(id: number, userId: number) {
    const group = await this.prisma.group.findUniqueOrThrow({
      where: { id },
      include: {
        expenses: {
          include: {
            members: true,
          },
          where: {
            members: {
              some: {
                userId,
                hasPaid: false,
              },
            },
          },
        },
      },
    })

    return group.expenses
  }

  async findMembers(id: number) {
    const group = await this.prisma.group.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    })

    const members = group.members.map((member) => member.user)

    return members
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    return await this.prisma.group.update({
      where: { id },
      data: {
        name: updateGroupDto.name,
      },
    })
  }

  async remove(id: number) {
    return await this.prisma.group.delete({
      where: { id },
    })
  }
}
