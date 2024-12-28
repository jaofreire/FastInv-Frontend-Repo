import { ApiResponse } from "@/types/api-response-types/api-response"
import api from "./api"
import { UserType } from "@/types/api-response-types/user/user-type"

export const fetchUserById = async (id: string): Promise<UserType> => {
    const data = await api.get<ApiResponse<UserType>>('/User/' + id)
        .then((response) => {
            const responseData = response.data;
            return responseData.response;
        });

    return data;
}