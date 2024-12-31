import { CompanyType } from "../company/company-type";

export interface UserType {
    id: string;
    companyId: string;
    company: CompanyType;
    name: string;
    department: string;
    email: string;
    passwordHash: string;
    phoneNumber: string;
    role: string;
    createdAt: string;
}