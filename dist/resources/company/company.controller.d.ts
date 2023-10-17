import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/createCompany.dto';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    createCompany(createCompamyDto: CreateCompanyDto): Promise<void>;
}
