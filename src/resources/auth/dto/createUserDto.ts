import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Voce precisa de um nome' })
  @IsString({ message: 'O nome do usuário precisa ser uma string' })
  name: string;

  @IsNotEmpty({ message: 'Voce precisa de um email' })
  @IsEmail({}, { message: 'Seu email deve ser valido' })
  email: string;

  @IsNotEmpty({ message: 'Voce precisa de uma senha' })
  @IsString({ message: 'A senha precisa ser uma string' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
    },
    { message: 'Essa senha é muito fraca, tente uma nova senha' },
  )
  password: string;
}
