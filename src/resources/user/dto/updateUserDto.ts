import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'O nome do usuário deve ser um string' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Seu email deve ser valido' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'O nome do usuário deve ser um string' })
  password?: string;
}
