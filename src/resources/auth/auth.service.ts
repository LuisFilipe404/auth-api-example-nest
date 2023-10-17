import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { compareHashes, hashPass } from 'src/lib/bcyrpt/bcrypt';

@Injectable()
export class AuthService {
  private readonly prisma: PrismaClient;

  constructor(private jwtService: JwtService) {
    this.prisma = new PrismaClient();
  }

  async validateLogin(email: string, password: string) {
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
        throw new HttpException(
          'Email ou senha incorreto',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const isAuth = await compareHashes(password, user.password);

      if (!isAuth) {
        throw new HttpException(
          'Email ou senha incorreto',
          HttpStatus.UNAUTHORIZED,
        );
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
    } catch (error) {
      return error;
    }
  }

  async createUser(email: string, name: string, password: string) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        throw new HttpException('Email já existe', HttpStatus.BAD_REQUEST);
      }

      const hashedPassword = await hashPass(password);

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
    } catch (error) {
      return error;
    }
  }
}
