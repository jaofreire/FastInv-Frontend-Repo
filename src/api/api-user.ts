import { ApiResponse } from "@/types/api-response-types/api-response"
import api from "./api"
import { UserType } from "@/types/api-response-types/user/user-type"
import { RegisterNewUserRequestType } from "@/types/api-request-types/user/register-new-user-request-type"
import { UpdateUserRequestType } from "@/types/api-request-types/user/update-user-request-type"

export const postRegisterNewUser = async (request: RegisterNewUserRequestType): Promise<ApiResponse<UserType>> => {
    const data = await api.post<ApiResponse<UserType>>('/User', request)
        .then((response) => {
            return response.data;
        })
        .catch((error) => error);

    return data;
}

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

export const putUpdateUser = async (id: string, request: UpdateUserRequestType): Promise<ApiResponse<UserType>> => {
    const data = await api.put<ApiResponse<UserType>>('/User/' + id, request)
        .then((response) => {
            return response.data;
        })
        .catch((error) => error);

    return data;
}

export const deleteUser = async (id: string): Promise<ApiResponse<UserType>> => {
    const data = await api.delete<ApiResponse<UserType>>('/User/' + id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => error);

    return data;
}

