import { Injectable } from "@nestjs/common";
import { CreateCompanyDto } from "./dto/createCompany.dto";

@Injectable()
export class CompanyService {
  async create(companyData: CreateCompanyDto) {}

  async update() {}

  async delete() {}

  async findAll() {}

  async findAllByUserId() {}

  async findByCompanyId() {}
}
