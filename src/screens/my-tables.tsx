import SideBar from "@/components/Global/sidebar";
import TableCard from "@/components/my-tables/table-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInventoryTablesByCompanyId } from "@/services/inventory-table-service";
import { InventoryTabelSummaryType } from "@/types/api-response-types/inventory-table-summary-type";
import { BadgePlus, Blend } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyTables() {
    const [fetchedInventoryTables, setFetchedInventoryTables] = useState<InventoryTabelSummaryType[]>([]);

    useEffect(() => {
        const loadInventoryTables = async () => {
            const inventoryTables = await getInventoryTablesByCompanyId('e38bfaea-a2a9-4d05-ab9e-7ce9e0fd3af2');
            setFetchedInventoryTables(inventoryTables);
        }

        loadInventoryTables();
    }, []);

    return (
        <>
            <SideBar />
            <div className="w-screen h-screen bg-gray-100">
                <main className="w-full h-full pl-64">
                    <div className="w-full h-full flex p-6">
                        <Card className="w-full">
                            <div className="flex flex-col h-full">
                                <CardHeader className="flex mb-5 w-full h-28 ">
                                    <div className="flex w-full h-full">
                                        <div className="w-full">
                                            <CardTitle className="pt-5 pl-10 text-3xl font-bold">Suas <span className="text-orange-400">Tabelas</span>:</CardTitle>
                                        </div>
                                        <div className="flex flex-col gap-3 justify-end h-24 w-52 pr-5">
                                            <Button className="w-30 h-8 bg-orange-500 opacity-90 text-black font-semibold hover:opacity-100 hover:bg-orange-500"><BadgePlus />Criar tabela</Button>
                                            <Button className="w-30 h-8 bg-slate-950 opacity-90 text-white font-semibold hover:opacity-100 hover:bg-slate-950"><Blend />Migrar tabela Excel</Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center gap-5 w-full">
                                    {fetchedInventoryTables!.map((inventoryTable, index) => (
                                        <Link className="w-full flex justify-center" to={'/inventory-table/' + inventoryTable.Name}>
                                            <TableCard key={index} tableName={inventoryTable.Name} registersCount={inventoryTable.RegistersCount} />
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