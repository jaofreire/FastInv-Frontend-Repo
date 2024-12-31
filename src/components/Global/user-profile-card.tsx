import { Building2, Calendar, Mail, Phone } from "lucide-react";
import { Avatar } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { format } from "date-fns";

function UserProfileCard({
    UserName,
    Role,
    Department,
    Email,
    PhoneNumber,
    CreatedAt
}: {
    UserName: string;
    Role: string;
    Department: string;
    Email: string;
    PhoneNumber: string;
    CreatedAt: string;
}) {

    return (
        <>
            <div className="flex flex-col md:flex-row h-screen w-screen justify-center items-center">
                <main className="flex items-center justify-center p-8 pl-64">
                    <div className="w-full flex justify-center items-center">
                        <Card className="shadow-lg w-full h-full flex justify-center items-center">
                            <CardContent className="p-6 w-[500px]">
                                <div className="flex flex-col items-center mb-8">
                                    <Avatar className="w-32 h-32 mb-4">
                                    </Avatar>
                                    <h1 className="text-2xl font-bold">{UserName}</h1>
                                    <p className="text-muted-foreground">{Role}</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <Building2 className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Departamento</p>
                                            <p className="font-medium">{Department}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <Mail className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Email</p>
                                            <p className="font-medium">{Email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <Phone className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Número celular</p>
                                            <p className="font-medium">{PhoneNumber}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <Calendar className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Desde</p>
                                            <p className="font-medium">{format(CreatedAt, 'dd/MM/yyyy')}</p>
                                        </div>
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