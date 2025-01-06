import { authenticate } from "@/api/api-auth";
import { ApiResponse } from "@/types/api-response-types/api-response";
import { addCookie } from "@/utils/cookie-handler";

export const login = async(email: string, password: string) : Promise<ApiResponse<string>> => {
    const apiResponse = await authenticate(email, password);
    
    if(apiResponse.isSuccess === false){
        return apiResponse;
    }

    addCookie('token', apiResponse.response);
    return apiResponse;
}