import { fetchUserById, fetchUsersByCompanyId } from '@/api/api-user';
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

    const response = await fetchUserById(id);
    login(
        response.id,
        response.companyId,
        response.name,
        response.company.name,
        response.department,
        response.email,
        response.phoneNumber,
        response.role,
        response.createdAt
    );

    return true;
}

const jwtTokenExpireValidate = (expireDate: number): boolean => {
    console.log('Validando data de expiração')
    const currentTime = Math.floor(Date.now() / 1000);
    console.log(currentTime)

    return currentTime < expireDate;
}

export const getUserById = async (id: string) : Promise<UserType> => {
    const response = await fetchUserById(id);
    return response;
}

export const getUsersByCompanyId = async (companyId: string) => {
    const response = await fetchUsersByCompanyId(companyId);
    return response;
}

