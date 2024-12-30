import { saveUserDataGlobalState } from "@/services/user-service";
import { getCookie } from "@/utils/cookie-handler";
import { createContext, useEffect, useState } from "react"

export interface AuthUserContextType {
    IsLogged: boolean;
    Id: string;
    CompanyId: string;
    UserName: string;
    CompanyName: string;
    Department: string;
    Email: string;
    PhoneNumber: string;
    Role: string;
    CreatedAt: string;
    Login: (
        id: string,
        companyId: string,
        userName: string,
        companyName: string,
        department: string,
        email: string,
        phoneNumber: string,
        role: string,
        createdAt: string
    ) => void;
    Logout: () => void;
}

export const AuthContext = createContext<AuthUserContextType>({
    IsLogged: false,
    Id: '',
    CompanyId: '',
    UserName: '',
    CompanyName: '',
    Department: '',
    Email: '',
    PhoneNumber: '',
    Role: '',
    CreatedAt: '',
    Login(
        id,
        companyId,
        userName,
        companyName,
        department,
        email,
        phoneNumber,
        role,
        createdAt
    ) {
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
        PhoneNumber: '',
        Role: '',
        CreatedAt: '',
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

    function logIn(
        id: string,
        companyId: string,
        userName: string,
        companyName: string,
        department: string,
        email: string,
        phoneNumber: string,
        role: string,
        createdAt: string
    ) {
        setUserState((prevState) => ({
            ...prevState,
            IsLogged: true,
            Id: id,
            CompanyId: companyId,
            UserName: userName,
            CompanyName: companyName,
            Department: department,
            Email: email,
            PhoneNumber: phoneNumber,
            Role: role,
            CreatedAt: createdAt
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
            Email: '',
            PhoneNumber: '',
            Role: '',
            CreatedAt: ''
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