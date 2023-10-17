import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    private readonly prisma;
    constructor(jwtService: JwtService);
    validateLogin(email: string, password: string): Promise<any>;
    createUser(email: string, name: string, password: string): Promise<any>;
}
