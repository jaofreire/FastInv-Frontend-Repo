import { ApiResponse } from "@/types/api-response-types/api-response"
import api from "./api"
import { AuthType } from "@/types/api-response-types/auth/auth-type"

export const authenticate = async (email: string, password: string) : Promise<AuthType> => {
    const data = await api.post<ApiResponse<string>>('/Auth', {
        email: email,
        password: password
    })
    .then((response) => {
        const responseData = response.data
        return new AuthType(responseData.response);
    });

    return data;
}