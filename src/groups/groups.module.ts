import { Module } from "@nestjs/common"
import { GroupsService } from "./groups.service"
import { GroupsController } from "./groups.controller"
import { PrismaModule } from "src/database/prisma.module"
import { GroupsMembersModule } from "src/groups-members/groups-members.module"

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [PrismaModule, GroupsMembersModule],
  exports: [GroupsService],
})
export class GroupsModule {}
