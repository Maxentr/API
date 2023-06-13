import { Module } from "@nestjs/common"
import { GroupsMembersService } from "./groups-members.service"
import { PrismaModule } from "src/database/prisma.module"

@Module({
  controllers: [],
  providers: [GroupsMembersService],
  imports: [PrismaModule],
  exports: [GroupsMembersService],
})
export class GroupsMembersModule {}
