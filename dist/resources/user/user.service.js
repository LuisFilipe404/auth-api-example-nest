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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt_1 = require("../../lib/bcyrpt/bcrypt");
const user_1 = require("../../utils/user");
let UserService = class UserService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async updatePass(id, newPassword) {
        try {
            const user = await (0, user_1.getUserById)(id);
            if (!user) {
                throw new common_1.HttpException('Usuário não encontrado!', common_1.HttpStatus.NOT_FOUND);
            }
            const isSamesPassword = (0, bcrypt_1.compareHashes)(newPassword, user.password);
            if (isSamesPassword) {
                throw new common_1.HttpException('As senhas são as Mesmas', common_1.HttpStatus.CONFLICT);
            }
            const hashedPassword = await (0, bcrypt_1.hashPass)(newPassword);
            await this.prisma.user.update({
                data: {
                    password: hashedPassword,
                },
                where: {
                    id,
                },
            });
            return 'Senha alterada com sucesso!';
        }
        catch (error) {
            return error;
        }
    }
    async update(id, userData) {
        try {
            const user = await (0, user_1.getUserById)(id);
            if (!user) {
                throw new common_1.HttpException('Usuário não encontrado!', common_1.HttpStatus.NOT_FOUND);
            }
            await this.prisma.user.update({
                data: userData,
                where: { id },
            });
            return `Usuário ${user.name} atualizado com sucesso!`;
        }
        catch (error) {
            return error;
        }
    }
    async delete() { }
    async findAll() { }
    async findAllByRole() { }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UserService);
//# sourceMappingURL=user.service.js.map