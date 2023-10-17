import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';

function isValidLength(value: string): boolean {
  return value.length === 11 || value.length === 14;
}

export class CreateCompanyDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  owner?: string;

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @Validate(isValidLength, {
    message: 'The length of this field must be either 11 or 14 characters.',
  })
  cnpj: string;

  @IsPostalCode()
  @IsNotEmpty()
  cep: string;

  @IsString()
  @IsNotEmpty()
  logradouro: string;

  @IsString()
  @IsNotEmpty()
  complement: string;
}
