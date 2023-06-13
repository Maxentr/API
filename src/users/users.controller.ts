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
  HttpException,
  HttpStatus,
} from "@nestjs/common"
import { UsersService } from "./users.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { ZodValidationPipe } from "@anatine/zod-nestjs"

@Controller({
  version: "1",
  path: "users",
})
@UsePipes(ZodValidationPipe)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto)
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll({})
  }

  @Get("email/:email")
  async findOneByEmail(@Param("email") email: string) {
    const user = await this.usersService.findOneByEmail(email)

    if (!user) {
      throw new HttpException(
        "User with email " + email + " not found",
        HttpStatus.NOT_FOUND,
      )
    }

    return user
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return await this.usersService.findOne(id)
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto)
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    return await this.usersService.remove(id)
  }
}
