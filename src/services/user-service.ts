import { fetchUserById, fetchUsersByCompanyId, postRegisterNewUser } from '@/api/api-user';
import { RegisterNewUserRequestType } from '@/types/api-request-types/user/register-new-user-request-type';
import { ApiResponse } from '@/types/api-response-types/api-response';
import { UserType } from '@/types/api-response-types/user/user-type';
import { deleteCookie } from '@/utils/cookie-handler';
import { jwtDecode, JwtPayload } from 'jwt-decode';

//Futuramente separar tarefas que envolvem JWT em um jwt-utils
interface UserDataJwtPayload extends JwtPayload {
    nameid: string;
    unique_name: string;
    role: string;
}

export const saveUserDataGlobalState = async (token: string,
    login: (
        id: string,
        companyId: string,
        userName: string,
        companyName: string,
        department: string,
        email: string,
        phoneNumber: string,
        role: string,
        createdAt: string
    ) => void
)
    : Promise<boolean> => {
    const decodeJwt = jwtDecode<UserDataJwtPayload>(token);
    const id = decodeJwt.nameid;

    if (decodeJwt.exp) {
        if (jwtTokenExpireValidate(decodeJwt.exp) === false) {
            deleteCookie('token');
            return false;
        }

    }

    const apiResponse = await fetchUserById(id);

    if (apiResponse.isSuccess === false) {
        deleteCookie('token');
        return false;
    }

    login(
        apiResponse.response.id,
        apiResponse.response.companyId,
        apiResponse.response.name,
        apiResponse.response.company.name,
        apiResponse.response.department,
        apiResponse.response.email,
        apiResponse.response.phoneNumber,
        apiResponse.response.role,
        apiResponse.response.createdAt
    );

    return true;
}

const jwtTokenExpireValidate = (expireDate: number): boolean => {
    console.log('Validando data de expiração')
    const currentTime = Math.floor(Date.now() / 1000);
    console.log(currentTime)

    return currentTime < expireDate;
}

export const registerNewUser = async (request: RegisterNewUserRequestType): Promise<ApiResponse<UserType>> => {
    const response = await postRegisterNewUser(request);
    return response;
}

export const getUserById = async (id: string): Promise<ApiResponse<UserType>> => {
    const response = await fetchUserById(id);
    return response;
}

export const getUsersByCompanyId = async (companyId: string): Promise<ApiResponse<UserType>> => {
    const response = await fetchUsersByCompanyId(companyId);
    return response;
}

