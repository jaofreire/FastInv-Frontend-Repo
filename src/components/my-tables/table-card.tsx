import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "../ui/card";

function TableCard({
    tableName,
    registersCount
}: {
    tableName: string,
    registersCount: number
}) {
    return (
        <>
            <Card className=" w-7/12 bg-gray-200 hover:border-orange-500 transition-colors">
                <CardContent className="p-4">
                    <div className="flex items-center gap-4 justify-between">
                        <div className="">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-semibold">{tableName}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {"Registros: " + registersCount}
                                    </p>
                                </div>

                            </div>
                        </div>
                        <div className="h-full w-50">
                            <ChevronRight className="font-medium" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )

}

export default TableCard;