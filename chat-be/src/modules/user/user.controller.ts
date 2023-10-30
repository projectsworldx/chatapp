import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserLogin } from './dto/user.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { Public } from '../../decorators/public.decorator';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  

  @Get('findFriends/:id')
  findAll(@Param('id') id: string) {
    return this.userService.findFriends(id);
  }


  @Public()
  @Post('login')
  userLogin(@Body() userLogin: UserLogin) {
    return this.userService.userLogin(userLogin);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
