import { saveUserDataGlobalState } from "@/services/user-service";
import { AuthUserContextType } from "@/types/auth-types/auth-user-context-type";
import { getCookie } from "@/utils/cookie-handler";
import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext<AuthUserContextType>({
    IsLogged: false,
    Id: '',
    CompanyId: '',
    UserName: '',
    CompanyName: '',
    Department: '',
    Email: '',
    Login(id, companyId, userName, companyName, department, email) {
    },
    Logout() {
    },
});

export function AuthProvider({
    children
}: {
    children: React.ReactNode
}) {
    const [userState, setUserState] = useState<AuthUserContextType>({
        IsLogged: false,
        Id: '',
        CompanyId: '',
        UserName: '',
        CompanyName: '',
        Department: '',
        Email: '',
        Login: logIn,
        Logout: logOut
    });

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const tryPreviousLogin = async () => {
            const token = getCookie('token');
            if (token) {
                const isSavedData = await saveUserDataGlobalState(token, logIn);

                if (!isSavedData) {
                    setIsLoading(false);
                    return;
                }
            }
            setIsLoading(false);
        }

        tryPreviousLogin();
    }, []);

    function logIn(id: string, companyId: string, userName: string, companyName: string, department: string, email: string) {
        setUserState((prevState) => ({
            ...prevState,
            IsLogged: true,
            Id: id,
            CompanyId: companyId,
            UserName: userName,
            CompanyName: companyName,
            Department: department,
            Email: email
        }));
        console.log('Login feito por ' + userName);
    }

    function logOut() {
        setUserState((prevState) => ({
            ...prevState,
            IsLogged: false,
            Id: '',
            CompanyId: '',
            UserName: '',
            CompanyName: '',
            Department: '',
            Email: ''
        }));
    }

    if (isLoading) {
        return <div>Carregando...</div>
    }

    return (
        <AuthContext.Provider value={userState}>
            {children}
        </AuthContext.Provider>
    )
}