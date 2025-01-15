import { fetchCompanyById, postRegisterNewCompany } from "@/api/api-company"
import { CompanyType } from "@/types/api-response-types/company/company-type";

export const registerNewCompany = async (
    companyName: string,
    cnpj: string,
    userName: string,
    department: string,
    email: string,
    phoneNumber: string,
    password: string
) => {
    const response = await postRegisterNewCompany(
        companyName,
        cnpj,
        userName,
        department,
        email,
        phoneNumber,
        password
    )

    return response;
}

export const getCompanyById = async (id: string) : Promise<CompanyType> => {
    const response = await fetchCompanyById(id);
    return response;
}