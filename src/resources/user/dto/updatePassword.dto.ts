import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class UpdatePasswordDto {
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
