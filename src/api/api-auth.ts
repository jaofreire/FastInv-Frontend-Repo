import { ApiResponse } from "@/types/api-response-types/api-response"
import api from "./api"

export const authenticate = async (email: string, password: string) : Promise<ApiResponse<string>> => {
    const data = await api.post<ApiResponse<string>>('/Auth', {
        email: email,
        password: password
    })
    .then((response) => {
        return response.data;
    })
    .catch((error) => error);

    return data;
}