import { Building2, Calendar, Mail, Phone, Trash } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { format } from "date-fns";
import DeleteUserAlertDialog from "../user-profile/delete-user-alert-dialog";
import UpdateUserDialog from "../user-profile/update-user-dialog";
import { useContext, useEffect } from "react";
import UpdateUserRoleDialog from "../user-profile/update-user-role-dialog";
import { AuthContext } from "@/contexts/auth/auth-provider";


function UserProfileCard({
    Id,
    UserName,
    UserRole,
    Department,
    Email,
    PhoneNumber,
    CreatedAt,
    displayDeleteUserButton,
    displayUpdateUserRoleButton,
    onClickConfirmDeleteUserButton
}: {
    Id: string;
    UserName: string;
    UserRole: string;
    Department: string;
    Email: string;
    PhoneNumber: string;
    CreatedAt: string;
    displayDeleteUserButton: boolean;
    displayUpdateUserRoleButton: boolean
    onClickConfirmDeleteUserButton: () => void;
}) {

    const { Role } = useContext(AuthContext);

    useEffect(() => {
    }, [UserName]);

    return (
        <>
            <div className="flex flex-col md:flex-row h-screen w-screen justify-center items-center bg-gray-100">
                <main className="flex items-center justify-center p-8 pl-64">
                    <div className="w-full flex justify-center items-center">
                        <Card className="shadow-lg border-orange-500 w-full h-full flex justify-center items-center">
                            <CardContent className="p-6 w-[500px]">
                                <div className="flex flex-col items-center mb-8">
                                    <h1 className="text-2xl font-bold">{UserName}</h1>
                                    <p className="text-muted-foreground">{UserRole === 'Admin' ? 'Administrador' : 'Usuário'}</p>
                                    {Role === 'Admin' && displayUpdateUserRoleButton && (
                                        <UpdateUserRoleDialog Id={Id} />
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <Building2 className="w-5 h-5 text-muted-foreground text-orange-500" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Departamento</p>
                                            <p className="font-medium">{Department}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <Mail className="w-5 h-5 text-muted-foreground text-orange-500" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Email</p>
                                            <p className="font-medium">{Email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <Phone className="w-5 h-5 text-muted-foreground text-orange-500" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Número celular</p>
                                            <p className="font-medium">{PhoneNumber}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <Calendar className="w-5 h-5 text-muted-foreground text-orange-500" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Desde</p>
                                            <p className="font-medium">{format(CreatedAt, 'dd/MM/yyyy')}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-5 w-full items-center justify-center">

                                        {Role === 'Admin' && (
                                            <UpdateUserDialog
                                                Id={Id}
                                                Name={UserName}
                                                Department={Department}
                                                Email={Email}
                                                PhoneNumber={PhoneNumber}
                                            />

                                        )}


                                        {displayDeleteUserButton && Role === 'Admin' && (
                                            <DeleteUserAlertDialog
                                                onClickConfirmButton={onClickConfirmDeleteUserButton}
                                            />
                                        )}
                                    </div>

                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </>
    )
}

export default UserProfileCard;