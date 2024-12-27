import { authenticate } from "@/api/api-auth";
import { AuthType } from "@/types/api-response-types/auth/auth-type";
import { addCookie, getCookie } from "@/utils/cookie-handler";

export const login = async(email: string, password: string) : Promise<AuthType> => {
    const response = await authenticate(email, password);
    if(response){
        addCookie('token', response.token);
        console.log('Cookie adicionado');
        console.log('Cookie token',getCookie('token'));
    };
    
    return response;
}