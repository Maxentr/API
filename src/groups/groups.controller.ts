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
import { GroupsService } from "./groups.service"
import { CreateGroupDto } from "./dto/create-group.dto"
import { UpdateGroupDto } from "./dto/update-group.dto"
import { GroupsMembersService } from "src/groups-members/groups-members.service"
import { ZodValidationPipe } from "@anatine/zod-nestjs"

@Controller({
  version: "1",
  path: "groups",
})
@UsePipes(ZodValidationPipe)
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly groupsMembersService: GroupsMembersService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createGroupDto: CreateGroupDto) {
    return await this.groupsService.create(createGroupDto)
  }

  @Get(":groupId/invite/:email")
  async invite(
    @Param("groupId", ParseIntPipe) groupId: number,
    @Param("email") email: string,
  ) {
    try {
      return await this.groupsMembersService.createWithEmail({ groupId, email })
    } catch (error) {}
  }

  @Get()
  async findAll() {
    return await this.groupsService.findAll({})
  }

  @Get("user/:userId")
  async findAllByUserId(@Param("userId", ParseIntPipe) userId: number) {
    return await this.groupsService.findAllByUserId(userId)
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.groupsService.findOne(+id)
  }
  @Get(":id/member/:userId")
  async findOneByUserId(
    @Param("id", ParseIntPipe) id: number,
    @Param("userId", ParseIntPipe) userId: number,
  ) {
    return await this.groupsService.findUnpaidExpensesOfUser(id, userId)
  }

  @Get(":id/members")
  async findMembers(@Param("id") id: string) {
    return await this.groupsService.findMembers(+id)
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return await this.groupsService.update(+id, updateGroupDto)
  }

  @Delete(":groupId/:userId")
  async removeFromGroup(
    @Param("groupId", ParseIntPipe) groupId: number,
    @Param("userId", ParseIntPipe) userId: number,
  ) {
    return await this.groupsMembersService.removeFromGroup(groupId, userId)
  }

  @Delete(":id")
  async deleteGroup(@Param("id") id: string) {
    return await this.groupsService.remove(+id)
  }
}
