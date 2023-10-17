import { Body, Controller, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/createCompany.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  createCompany(@Body() createCompamyDto: CreateCompanyDto) {
    return this.companyService.create(createCompamyDto);
  }
}
