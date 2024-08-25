import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service'
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'



@Controller('users') // /users route 
export class UsersController {

  constructor(private readonly userService: UsersService) { }


  @Get() // /users or /users?role=value&age=23
  findAll(@Query('role') role?: 'Intern' | 'Engineer' | 'Admin') {
    return this.userService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }


  @Post()
  create(@Body(ValidationPipe) user: CreateUserDTO) {
    return this.userService.create(user)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) userUpdate: UpdateUserDto) {
    return this.userService.update(id, userUpdate)
  }


  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id)
  }

}
