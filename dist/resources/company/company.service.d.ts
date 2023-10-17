import { CreateCompanyDto } from "./dto/createCompany.dto";
export declare class CompanyService {
    create(companyData: CreateCompanyDto): Promise<void>;
    update(): Promise<void>;
    delete(): Promise<void>;
    findAll(): Promise<void>;
    findAllByUserId(): Promise<void>;
    findByCompanyId(): Promise<void>;
}
