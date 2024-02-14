import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import {
  Serialize,
  SerializeInterceptor,
} from "../interceptors/serialize.interceptor";
import { UserDto } from "./dtos/user.dto";

@Controller("auth")
@Serialize(UserDto)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post("/signup")
  createUser(@Body() userDto: CreateUserDto) {
    this.userService.create(userDto.email, userDto.password);
    console.log(userDto);
  }

  @Get("/:id")
  findUser(@Param("id") id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Get()
  findUserByEmail(@Query("email") email: string) {
    return this.userService.find(email);
  }

  @Delete("/:id")
  removeUser(@Param("id") id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Put("/:id")
  updateUser(@Param("id") id: string, @Body() attrs: Partial<CreateUserDto>) {
    return this.userService.update(parseInt(id), attrs);
  }
}
