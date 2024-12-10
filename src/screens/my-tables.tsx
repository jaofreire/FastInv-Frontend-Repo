import SideBar from "@/components/Global/sidebar";
import TableCard from "@/components/my-tables/table-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";

function MyTables() {

    const [tables, setTable] = useState(["Inventário de nootboks", "Inventário de produtos"]);

    return (
        <>
            <SideBar />
            <div className="w-screen h-screen bg-gray-100">
                <main className="w-full h-full pl-64">
                    <div className="w-full h-full flex p-6">
                        <Card className="w-full">
                            <div className="flex flex-col h-full">
                                <CardHeader className="mb-4 h-28">
                                    <CardTitle className="pt-5 pl-10 text-3xl font-bold">Suas <span className="text-orange-400">Tabelas</span>:</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center gap-5 w-full">
                                    {tables.map((value, index) => (
                                        <Link className="w-full flex justify-center" to={'/inventory-table/' + value}>
                                            <TableCard key={index} tableName={value} />
                                        </Link>
                                    ))}
                                </CardContent>
                            </div>
                        </Card>
                    </div>
                </main>
            </div>
        </>
    )
}

export default MyTables;