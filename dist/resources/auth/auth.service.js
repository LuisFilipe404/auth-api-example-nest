"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
const bcrypt_1 = require("../../lib/bcyrpt/bcrypt");
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.prisma = new client_1.PrismaClient();
    }
    async validateLogin(email, password) {
        try {
            const user = await this.prisma.user.findFirst({
                select: {
                    email: true,
                    password: true,
                    role: true,
                    id: true,
                    name: true,
                },
                where: {
                    email: email,
                },
            });
            if (!user) {
                throw new common_1.HttpException('Email ou senha incorreto', common_1.HttpStatus.UNAUTHORIZED);
            }
            const isAuth = await (0, bcrypt_1.compareHashes)(password, user.password);
            if (!isAuth) {
                throw new common_1.HttpException('Email ou senha incorreto', common_1.HttpStatus.UNAUTHORIZED);
            }
            const payload = {
                email: user.email,
                permissionLevel: user.role,
            };
            return {
                name: user.name,
                access_token: await this.jwtService.sign(payload),
                role: user.role,
            };
        }
        catch (error) {
            return error;
        }
    }
    async createUser(email, name, password) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (existingUser) {
                throw new common_1.HttpException('Email já existe', common_1.HttpStatus.BAD_REQUEST);
            }
            const hashedPassword = await (0, bcrypt_1.hashPass)(password);
            const user = await this.prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                },
            });
            return {
                message: `Usuário ${user.name} foi cadastrado com sucesso`,
            };
        }
        catch (error) {
            return error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map