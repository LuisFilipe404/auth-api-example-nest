import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { compareHashes, hashPass } from 'src/lib/bcyrpt/bcrypt';
import { getUserById } from 'src/utils/user';

interface UserData {
  name?: string;
  password?: string;
  email?: string;
}

@Injectable()
export class UserService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async updatePass(id: string, newPassword: string) {
    try {
      const user = await getUserById(id);

      if (!user) {
        throw new HttpException(
          'Usuário não encontrado!',
          HttpStatus.NOT_FOUND,
        );
      }

      const isSamesPassword = compareHashes(newPassword, user.password);

      if (isSamesPassword) {
        throw new HttpException('As senhas são as Mesmas', HttpStatus.CONFLICT);
      }

      const hashedPassword = await hashPass(newPassword);

      await this.prisma.user.update({
        data: {
          password: hashedPassword,
        },
        where: {
          id,
        },
      });

      return 'Senha alterada com sucesso!';
    } catch (error) {
      return error;
    }
  }

  async update(id: string, userData: UserData) {
    try {
      const user = await getUserById(id);

      if (!user) {
        throw new HttpException(
          'Usuário não encontrado!',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prisma.user.update({
        data: userData,
        where: { id },
      });

      return `Usuário ${user.name} atualizado com sucesso!`;
    } catch (error) {
      return error;
    }
  }

  async delete() {}

  async findAll() {}

  async findAllByRole() {}
}
