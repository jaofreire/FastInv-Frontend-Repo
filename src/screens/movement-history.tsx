import SideBar from "@/components/Global/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { getMovementsHistoryByCompanyId } from "@/services/movement-history-service";
import { MovementHistoryType } from "@/types/api-response-types/movement-history/movement-history-type";
import { useContext, useEffect, useState } from "react";
import { format } from 'date-fns'
import FilterOptions from "@/components/movement-history/filter-options";
import { FilterX } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/auth/auth-provider";
import ErrorDialog from "@/components/Global/errors/error-dialog";

function MovementHistory() {

    const columnMapping: Record<string, keyof MovementHistoryType> = {
        'Usuário': 'userName',
        'Tabela': 'inventoryTableName',
        'Ação': 'eventType',
        'Data/Hora': 'occurredOn',
        'Coluna alterada': 'columnChanged',
        'Valor anterior': 'previousValue',
        'Valor atual': 'currentValue',
    };

    const { CompanyId } = useContext(AuthContext);

    const navigator = useNavigate();

    const tableHeaders: string[] = ['Usuário', 'Tabela', 'Ação', 'Data/Hora', 'Coluna alterada', 'Valor anterior', 'Valor atual']

    const [movementsHistory, setMovementsHistory] = useState<MovementHistoryType[]>([]);

    const [filteredMovements, setFilteredMovements] = useState<MovementHistoryType[]>([]);

    const [isFilterMode, setIsFilterMode] = useState<boolean>(false);

    const [error, setError] = useState<string>('');

    useEffect(() => {
        const loadMovementsHistory = async () => {
            const movementsResponse = await getMovementsHistoryByCompanyId(CompanyId);

            if (movementsResponse.isSuccess === false) {
                setError(movementsResponse.message);
            }

            if (movementsResponse.responseList) {
                setMovementsHistory(movementsResponse.responseList);
            }
        }

        loadMovementsHistory();
    }, []);

    function formatTimestamp(timestamp: string): string {
        const date = new Date(timestamp);
        const formattedDate = format(date, 'dd/MM/yyyy HH:mm');

        return formattedDate;
    }

    if (error) {
        return <ErrorDialog errorDescription={error} />
    }

    //#region Manipuladores de filtros

    function handleFilterByAlphabeticalOrder(isAscending: boolean, column: string) {
        let filteredMovementsHistory: MovementHistoryType[] = [];
        const attribute = columnMapping[column];
        const sortedMovements = [...movementsHistory].sort((a, b) =>
            isAscending
                ? a[attribute].localeCompare(b[attribute])
                : b[attribute].localeCompare(a[attribute])
        );
        filteredMovementsHistory = sortedMovements;

        setIsFilterMode(true);
        setFilteredMovements(filteredMovementsHistory);
    }

    function handleFilterByCriteria(column: string, criteria: string, isContainFilter: boolean) {
        let filteredMovementsHistory: MovementHistoryType[] = [];
        const attribute = columnMapping[column];

        if (attribute) {
            filteredMovementsHistory = movementsHistory.filter(
                x =>
                    isContainFilter
                        ? x[attribute].includes(criteria)
                        : !x[attribute].includes(criteria)
            );
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
                                                                onChangeFilterValue={(_, criteria, isContainFilter) => handleFilterByCriteria(headerName, criteria, isContainFilter)}
                                                                onClickFilterByAlphabeticalOrder={(isAscending, _) => handleFilterByAlphabeticalOrder(isAscending, headerName)}
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
                                                        {/* Adicionar link direcionando para o perfil do usuário responsavel pela alteração */}
                                                        <TableCell
                                                            className='cursor-pointer text-blue-500'
                                                            onClick={() => navigator('/user-profile/' + movement.userId)}
                                                        >
                                                            {movement.userName}
                                                        </TableCell>
                                                        <TableCell
                                                            className='cursor-pointer text-blue-500'
                                                            onClick={() => navigator('/inventory-table/' + movement.inventoryTableName + '/' + movement.inventoryTableId)}
                                                        >
                                                            {movement.inventoryTableName}
                                                        </TableCell>
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