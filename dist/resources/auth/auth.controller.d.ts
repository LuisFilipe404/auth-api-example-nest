import { LoginUserDto } from './dto/loginUserDto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUserDto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginUserDto: LoginUserDto): Promise<any>;
    register(createUserDto: CreateUserDto): Promise<any>;
}
