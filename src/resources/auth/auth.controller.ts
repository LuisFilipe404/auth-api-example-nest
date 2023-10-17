import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginUserDto } from './dto/loginUserDto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUserDto';
import { Permissions } from 'src/decorators/permission.decorator';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    return this.authService.validateLogin(email, password);
  }

  @UseGuards(AuthGuard)
  @Permissions('AdminMaster')
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    const { email, password, name } = createUserDto;
    return this.authService.createUser(email, name, password);
  }
}
