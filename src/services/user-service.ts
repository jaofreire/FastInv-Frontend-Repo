import { fetchUserById } from '@/api/api-user';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface UserDataJwtPayload extends JwtPayload {
    nameid: string;
    unique_name: string;
    role: string;
}

export const saveUserDataGlobalState = async (token: string, login: (id: string, companyId: string, userName: string, companyName: string, department: string, email: string) => void) => {
    const decodeJwt = jwtDecode<UserDataJwtPayload>(token);
    const id = decodeJwt.nameid;

    const response = await fetchUserById(id);
    login(response.id, response.companyId, response.name, '', response.department, response.email);
}