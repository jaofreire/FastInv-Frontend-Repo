import api from "@/api/api"
import { postRegisterNewCompany } from "@/api/api-company"

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