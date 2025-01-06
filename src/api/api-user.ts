import { ApiResponse } from "@/types/api-response-types/api-response"
import api from "./api"
import { UserType } from "@/types/api-response-types/user/user-type"

export const fetchUserById = async (id: string): Promise<ApiResponse<UserType>> => {
    const data = await api.get<ApiResponse<UserType>>('/User/' + id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => error);

    return data;
}

export const fetchUsersByCompanyId = async (companyId: string): Promise<ApiResponse<UserType>> => {
    const data = await api.get<ApiResponse<UserType>>('/User/company/' + companyId)
        .then((response) => {
            return response.data;
        })
        .catch((error) => error);

    return data;
}