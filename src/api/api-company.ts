import { ApiResponse } from "@/types/api-response-types/api-response";
import api from "./api"
import { CompanyType } from "@/types/api-response-types/company/company-type";

export const postRegisterNewCompany = async (
    companyName: string,
    cnpj: string,
    userName: string,
    department: string,
    email: string,
    phoneNumber: string,
    password: string
) => {
    const data = await api.post<ApiResponse<CompanyType>>('/Company', {
        name: companyName,
        cnpj: cnpj,
        userName: userName,
        department: department,
        email: email,
        phoneNumber: phoneNumber,
        password: password
    })
        .then((response) => {
            const responseData = response.data;
            return responseData;
        })

    return data;
}

export const fetchCompanyById = async (id: string): Promise<CompanyType> => {
    const data = await api.get<ApiResponse<CompanyType>>('/Company/' + id)
        .then((response) => {
            const responseData = response.data
            return responseData.response;
        })

    return data;
}