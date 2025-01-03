import { Building2, Calendar } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { format } from "date-fns";

function CompanyCard({
    Name,
    Cnpj,
    CreatedAt,
}: {
    Name: string;
    Cnpj: string;
    CreatedAt: string;
}) {
    return (
        <>
        <div className="flex flex-col md:flex-row h-screen w-screen justify-center items-center bg-gray-100">
            <main className="flex items-center justify-center p-8 pl-64">
                <div className="w-full flex justify-center items-center">
                    <Card className="shadow-lg border-orange-500 w-full h-full flex justify-center items-center">
                        <CardContent className="p-6 w-[500px]">
                            
                            <div className="flex flex-col items-center mb-8">
                                <h1 className="text-2xl font-bold">{Name}</h1>
                                <p className="text-muted-foreground">Empresa</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <Building2 className="w-5 h-5 text-muted-foreground text-orange-500" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Cnpj</p>
                                        <p className="font-medium">{Cnpj}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <Calendar className="w-5 h-5 text-muted-foreground text-orange-500" />
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
        </div >
        </>
    )

}

export default CompanyCard;