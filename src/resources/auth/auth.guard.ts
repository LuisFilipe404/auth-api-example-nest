import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: '018a17c8-682d-11ee-8c99-0242ac120002',
      });

      // Adiciona o nível de permissão ao objeto de solicitação
      request['permissionLevel'] = payload.permissionLevel;

      // Verifica se o usuário tem permissão para acessar a rota
      const requiredPermissions = this.getRequiredPermissions(context);

      // Se o usuário tiver a permissão AdminMaster, conceda automaticamente acesso
      if (payload.permissionLevel === 'AdminMaster') {
        return true;
      }

      if (!this.hasPermission(payload.permissionLevel, requiredPermissions)) {
        throw new UnauthorizedException('Insufficient permissions');
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private getRequiredPermissions(context: ExecutionContext): string[] {
    return Reflect.getMetadata('permissions', context.getHandler()) || [];
  }

  private hasPermission(
    userPermission: string,
    requiredPermissions: string[],
  ): boolean {
    return requiredPermissions.includes(userPermission);
  }
}
