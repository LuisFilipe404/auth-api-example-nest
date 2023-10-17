import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UpdateUserDto } from './dto/updateUserDto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('forgot-pass/:id')
  forgotPass(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const { password } = updatePasswordDto;

    return this.userService.updatePass(id, password);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
