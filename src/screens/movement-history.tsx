import SideBar from "@/components/Global/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { getMovementsHistoryByCompanyId } from "@/services/movement-history-service";
import { MovementHistoryType } from "@/types/api-response-types/movement-history/movement-history-type";
import { useEffect, useState } from "react";
import { format } from 'date-fns'
import FilterOptions from "@/components/movement-history/filter-options";
import { FilterX } from "lucide-react";

function MovementHistory() {

    const tableHeaders: string[] = ['Usuário', 'Tabela', 'Ação', 'Data/Hora', 'Coluna alterada', 'Valor anterior', 'Valor atual']

    const [movementsHistory, setMovementsHistory] = useState<MovementHistoryType[]>([]);

    const [filteredMovements, setFilteredMovements] = useState<MovementHistoryType[]>([]);

    const [isFilterMode, setIsFilterMode] = useState<boolean>(false);

    useEffect(() => {
        const loadMovementsHistory = async () => {
            const loadedMovements = await getMovementsHistoryByCompanyId('e38bfaea-a2a9-4d05-ab9e-7ce9e0fd3af2');
            setMovementsHistory(loadedMovements);
        }

        loadMovementsHistory();
    }, []);

    function formatTimestamp(timestamp: string): string {
        const date = new Date(timestamp);
        const formattedDate = format(date, 'dd/MM/yyyy HH:mm');

        return formattedDate;
    }

    //#region Manipuladores de filtros

    function handleFilterByCriteria(column: string, criteria: string) {
        let filteredMovementsHistory: MovementHistoryType[] = [];
        switch (column) {
            case 'Usuário':
                filteredMovementsHistory = movementsHistory.filter(x => x.userName.includes(criteria));
                break;
            case 'Tabela':
                filteredMovementsHistory = movementsHistory.filter(x => x.inventoryTableName.includes(criteria));
                break;
            case 'Ação':
                filteredMovementsHistory = movementsHistory.filter(x => x.eventType.includes(criteria));
                break;
            case 'Data/Hora':
                filteredMovementsHistory = movementsHistory.filter(x => x.occurredOn.includes(criteria));
                break;
            case 'Coluna alterada':
                filteredMovementsHistory = movementsHistory.filter(x => x.columnChanged.includes(criteria));
                break;
            case 'Valor anterior':
                filteredMovementsHistory = movementsHistory.filter(x => x.previousValue.includes(criteria));
                break;
            case 'Valor atual':
                filteredMovementsHistory = movementsHistory.filter(x => x.currentValue.includes(criteria));
                break;
        }
        setFilteredMovements(filteredMovementsHistory);
        setIsFilterMode(true);
    }

    function removeFilters() {
        setIsFilterMode(false);
        setFilteredMovements([]);
    }

    //#endregion

    return (
        <>
            <SideBar />
            <div className="w-screen h-screen bg-gray-100">
                <main className="w-full h-full pl-64">
                    <div className="w-full h-full flex p-6">
                        <Card className="w-full overflow-auto">
                            <div className="flex flex-col h-full">
                                <CardHeader className="mb-4 h-28 w-full">
                                    <div className="items-center gap-5 w-[98%]">
                                        <CardTitle className="text-2xl font-bold"><span className="text-orange-500">Histórico de</span> movimentação</CardTitle>
                                        {isFilterMode && <Button className="w-40 h-5 bg-red-500 opacity-90 text-white font-medium rounded-sm hover:opacity-100 hover:bg-red-600" onClick={removeFilters}><FilterX />Remover filtros</Button>}
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
                                                            <FilterOptions
                                                                onChangeFilterValue={(_, criteria) => handleFilterByCriteria(headerName, criteria)}
                                                            />
                                                        </div>
                                                    </TableHead>
                                                ))}
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {(isFilterMode ? filteredMovements : movementsHistory).map((movement, index) => (
                                                <>
                                                    <TableRow key={index}>
                                                        <TableCell>{movement.userName}</TableCell>
                                                        <TableCell>{movement.inventoryTableName}</TableCell>
                                                        <TableCell>{movement.eventType}</TableCell>
                                                        <TableCell>
                                                            {formatTimestamp(movement.occurredOn)}
                                                        </TableCell>
                                                        <TableCell>{movement.columnChanged}</TableCell>
                                                        <TableCell>{movement.previousValue}</TableCell>
                                                        <TableCell>{movement.currentValue}</TableCell>
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