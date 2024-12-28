export interface AuthUserContextType{
    IsLogged: boolean;
    Id: string;
    CompanyId: string;
    UserName: string;
    CompanyName: string;
    Department: string;
    Email: string;
    Login: (id: string, companyId: string, userName: string, companyName: string, department: string, email: string) => void;
    Logout: () => void;
}