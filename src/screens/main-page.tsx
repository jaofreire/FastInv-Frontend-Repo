import { Table2, TableCellsMerge, Users } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import SideBar from '@/components/Global/sidebar';
import { useEffect, useState } from 'react';
import { getMainInfos } from '@/services/main-info-service';
import { MovementHistoryType } from '@/types/api-response-types/movement-history/movement-history-type';
import { getLatestTenMovementsHistoryByCompanyId } from '@/services/movement-history-service';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

function MainPage() {

    const tableHeaders: string[] = ['Usuário', 'Tabela', 'Ação', 'Data/Hora', 'Coluna alterada', 'Valor anterior', 'Valor atual'];

    const companyId = '035b5700-abd7-4184-8be0-a38adfdd33a0';

    const [inventoryTableCount, setInventoryTableCount] = useState<number>(0);
    const [employersCount, setEmployersCount] = useState<number>(0);
    const [lastInventoryTableUpdated, setLastInventoryTableUpdated] = useState<string>('');

    const [latestTenMovementsHistory, setLatestTenMovementsHistory] = useState<MovementHistoryType[]>([]);


    useEffect(() => {
        const loadMainInfo = async () => {
            const infos = await getMainInfos(companyId);

            setInventoryTableCount(infos.inventoryTableCount);
            setEmployersCount(infos.emplooyersCont);
            setLastInventoryTableUpdated(infos.lastInventoryTableUpdated);
        }

        const loadLatestTenMovementsHistory = async () => {
            const movementsHistory = await getLatestTenMovementsHistoryByCompanyId(companyId);
            setLatestTenMovementsHistory(movementsHistory);
        }

        loadLatestTenMovementsHistory();
        loadMainInfo();
    }, []);


    function formatTimestamp(timestamp: string): string {
        const date = new Date(timestamp);
        const formattedDate = format(date, 'dd/MM/yyyy HH:mm');

        return formattedDate;
    }


    return (
        <>
            <div className=" h-screen w-screen bg-gray-100">
                <SideBar />
                <main className="pl-64">
                    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-8 rounded-full bg-purple-100" />
                            <div>
                                <div className="text-sm text-gray-500">LVA TRANSPORTE</div>
                                <div className="font-medium">Bem-Vindo, João</div>
                            </div>
                        </div>
                    </header>
                    <div className="p-6">
                        <div className="grid gap-6 md:grid-cols-3">
                            <Card>
                                <CardContent className="flex items-center gap-4 p-6">
                                    <Table2 className="h-8 w-8 text-orange-500" />
                                    <div>
                                        <div className="text-sm font-medium">Tabelas:</div>
                                        <div className="text-2xl font-bold">{inventoryTableCount}</div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex items-center gap-4 p-6">
                                    <Users className="h-8 w-8 text-orange-500" />
                                    <div>
                                        <div className="text-sm font-medium">Funcionários:</div>
                                        <div className="text-2xl font-bold">{employersCount}</div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex items-center gap-4 p-6">
                                    <TableCellsMerge className="h-8 w-8 text-orange-500" />
                                    <div>
                                        <div className="text-sm font-medium">Ultima tabela modificada:</div>
                                        <div className="font-bold">{lastInventoryTableUpdated}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <Card className="mt-6 h-[350px] overflow-auto">
                            <CardContent className="p-6 ">
                                <h2 className="mb-4 text-lg font-medium">Últimos movimentos:</h2>
                                <Table className="overflow-auto w-full h-full">
                                    <TableHeader>
                                        <TableRow>
                                            {tableHeaders.map((headerName) => (
                                                <TableHead className="w-[200px]">
                                                    <div className="flex">
                                                        {headerName}
                                                    </div>
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {latestTenMovementsHistory.map((movement, index) => (
                                            <>
                                                <TableRow key={index}>
                                                    {/* Adicionar link direcionando para o perfil do usuário responsavel pela alteração */}
                                                    <TableCell>{movement.userName}</TableCell>
                                                    <Link className="cursor-pointer" to={'/inventory-table/' + movement.inventoryTableName + '/' + movement.inventoryTableId}>
                                                        <TableCell>{movement.inventoryTableName}</TableCell>
                                                    </Link>
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
                        </Card>
                    </div>
                </main>
            </div>
        </>
    )
}

export default MainPage;