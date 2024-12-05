import SideBar from "@/components/Global/sidebar";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardPaste, Ellipsis, MoreVertical, PlusIcon, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import ColumnOptions from "@/components/inventory-table/column-options";

// type DynamicInventoryItem = {[key: string]: string[]}

function MyTables() {
    const [inventory, setInventory] = useState<Map<string, string[]>>(
        new Map<string, string[]>([
            ["Produtos", ["Notbook", "Desktop"]],
            ["Marcas", ["Samsung", "Lenovo"]]
        ])
    );

    const tableHeaders = useMemo(() => Array.from(inventory.keys()), [inventory]);
    const tableRows = useMemo(() => Array.from(inventory.values()), [inventory]);
    const maxRows = Math.max(...tableRows.map((values) => values.length + 1))

    const [editingCell, setEditingCell] = useState({ row: null, column: null });
    const [editingColumn, setEditingColumn] = useState({ column: null })


    function handleEdit(row: any, column: any) {
        setEditingCell({ row, column });
    };

    function handleEditColumn(column: any) {
        setEditingColumn({ column })
    };

    function handleColumnValueChange(oldColumn: string, newColumn: string) {
        //No contexto de mudar o nome da coluna a melhor forma é criando um Array por causa da utilização do splice para substituir elementos existentes
        const updatedInventory = Array.from(inventory);
        const oldColumnIndex = updatedInventory.findIndex(([column]) => column === oldColumn);
        const oldColumnData = updatedInventory[oldColumnIndex][1];

        updatedInventory.splice(oldColumnIndex, 1, [newColumn, oldColumnData]);

        const inventoryMap = new Map(updatedInventory);
        setInventory(inventoryMap);
    };

    function handleCellValueChange(rowIndex: number, column: string, value: string) {
        const updatedInventory = new Map(inventory);
        const columnData = updatedInventory.get(column);

        if (columnData) {
            columnData[rowIndex] = value;
            updatedInventory.set(column, columnData);
        }
        setInventory(updatedInventory);
    };

    function handleBlur() {
        setEditingCell({ row: null, column: null });
        setEditingColumn({ column: null });
    };

    function addNewColumn() {
        const updatedInventory = new Map(inventory);
        updatedInventory.set("Coluna nova..", []);

        setInventory(updatedInventory);
    };

    function deleteColumn(column: string) {
        const updatedInventory = new Map(inventory);
        updatedInventory.delete(column);
        //Adicionar Dialog para avisar que os itens dessa coluna serão excluídas

        setInventory(updatedInventory);
    }


    return (
        <>
            <SideBar />
            <div className="w-screen h-screen bg-gray-100">
                <main className="w-full h-full pl-64">
                    <div className="w-full h-full flex p-6">
                        <Card className="w-full">
                            <div className="flex flex-col h-full">
                                <CardHeader className="mb-4">
                                    <CardTitle className="text-2xl font-bold">Inventário de notbooks</CardTitle>
                                    <Button className="w-40 h-5 bg-orange-500 opacity-90 text-black font-semibold hover:opacity-100 hover:bg-orange-500"><ClipboardPaste />Exportar excel</Button>
                                </CardHeader>
                                <CardContent className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                {tableHeaders.map((columnName, columnIndex) => (
                                                    <>

                                                        <TableHead className="cursor-pointer h-16 text-base"
                                                            key={columnIndex}
                                                            onClick={() => handleEditColumn(columnIndex)}
                                                        >
                                                            <div className="flex min-w-fit">
                                                                <ColumnOptions
                                                                    onClickDeleteButton={() => deleteColumn(columnName)}
                                                                />
                                                            </div>
                                                            {editingColumn.column === columnIndex
                                                                ?
                                                                (

                                                                    <Input className="w-full border border-gray-300 rounded px-2 py-1"
                                                                        type="text"
                                                                        value={columnName}
                                                                        onChange={(e) => handleColumnValueChange(columnName, e.target.value)}
                                                                        onBlur={handleBlur}
                                                                        autoFocus
                                                                    />
                                                                )
                                                                :
                                                                (
                                                                    columnName
                                                                )}

                                                        </TableHead>
                                                    </>
                                                ))}
                                                <Button className="ml-2 w-10" onClick={addNewColumn}><PlusIcon></PlusIcon></Button>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {Array.from({ length: maxRows }).map((_, rowIndex) => (
                                                <TableRow key={rowIndex}>
                                                    {tableHeaders.map((column, columnIndex) => (
                                                        <TableCell className="font-medium cursor-pointer"
                                                            key={columnIndex}
                                                            onClick={() => handleEdit(rowIndex, column)}
                                                        >
                                                            {editingCell.row === rowIndex && editingCell.column === column
                                                                ?
                                                                (
                                                                    <Input className="w-full border border-gray-300 rounded px-2 py-1"
                                                                        type="text"
                                                                        value={inventory.get(column)?.at(rowIndex)}
                                                                        onChange={(e) => handleCellValueChange(rowIndex, column, e.target.value)}
                                                                        onBlur={handleBlur}
                                                                        autoFocus
                                                                    />
                                                                )
                                                                :
                                                                (
                                                                    inventory.get(column)?.at(rowIndex)
                                                                )
                                                            }

                                                        </TableCell>
                                                    ))}

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
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