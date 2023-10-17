import { UserService } from './user.service';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UpdateUserDto } from './dto/updateUserDto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    forgotPass(id: string, updatePasswordDto: UpdatePasswordDto): Promise<any>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<any>;
}
