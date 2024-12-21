import SideBar from "@/components/Global/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { getMovementsHistoryByCompanyId } from "@/services/movement-history-service";
import { MovementHistoryType } from "@/types/api-response-types/movement-history/movement-history-type";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { ArrowUpDown, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from 'date-fns'
import FilterOptions from "@/components/movement-history/filter-options";

function MovementHistory() {

    const tableHeaders: string[] = ['Usuário', 'Tabela', 'Ação', 'Data/Hora', 'Coluna alterada', 'Valor anterior', 'Valor atual']

    const [movementsHistory, setMovementsHistory] = useState<MovementHistoryType[]>([]);

    useEffect(() => {
        const loadMovementsHistory = async () => {
            const loadedMovements = await getMovementsHistoryByCompanyId('035b5700-abd7-4184-8be0-a38adfdd33a0');
            setMovementsHistory(loadedMovements);
        }

        loadMovementsHistory();
    }, []);

    function formatTimestamp(timestamp: string): string {
        const date = new Date(timestamp);
        const formattedDate = format(date, 'dd/MM/yyyy HH:mm');

        return formattedDate;
    }

    return (
        <>
            <SideBar />
            <div className="w-screen h-screen bg-gray-100">
                <main className="w-full h-full pl-64">
                    <div className="w-full h-full flex p-6">
                        <Card className="w-full overflow-auto">
                            <div className="flex flex-col h-full">
                                <CardHeader className="mb-4 h-28 w-full">
                                    <div className="flex items-center gap-5 w-[98%]">
                                        <CardTitle className="text-2xl font-bold"><span className="text-orange-500">Histórico de</span> movimentação</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Table className="overflow-x-auto">
                                        <TableHeader>
                                            <TableRow>
                                                {tableHeaders.map((headerName) => (
                                                    <TableHead className="w-[200px]">
                                                        <div className="flex">
                                                            <Button variant="ghost" className="text-black bg-transparent">
                                                                {headerName}
                                                            </Button>
                                                            <FilterOptions />
                                                        </div>
                                                    </TableHead>
                                                ))}
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {movementsHistory.map((item) => (
                                                <>
                                                    <TableRow key={item.id}>
                                                        <TableCell className="font-medium">{item.userName}</TableCell>
                                                        <TableCell className="font-medium">{item.inventoryTableName}</TableCell>
                                                        <TableCell className="font-medium">{item.eventType}</TableCell>
                                                        <TableCell className="font-medium">
                                                            {formatTimestamp(item.occurredOn)}
                                                        </TableCell>
                                                        <TableCell className="font-medium">{item.columnChanged}</TableCell>
                                                        <TableCell className="font-medium">{item.previousValue}</TableCell>
                                                        <TableCell >{item.currentValue}</TableCell>
                                                    </TableRow>
                                                </>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </div>
                        </Card >
                    </div>
                </main>
            </div>
        </>
    )
}

export default MovementHistory;