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
import { ClipboardPaste, FilterX, PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import ColumnOptions from "@/components/inventory-table/column-options";

function MyTables() {
    const [inventory, setInventory] = useState<Map<string, string[]>>(
        new Map<string, string[]>([
            ["Marcas", Array.from({ length: 10 }, (_, i) => `Marca${i + 1}`)],
            ["Produtos", Array.from({ length: 8 }, (_, i) => `Produto${i + 1}`)],
            ["Cores", Array.from({ length: 10 }, (_, i) => `Cor${i + 1}`)],
        ])
    );

    const [isFilterMode, setIsFilterMode] = useState(false);
    const [filteredItens, setFilteredItens] = useState<Map<string, string[]>>(
        new Map<string, string[]>([
        ])
    );

    const tableHeaders = useMemo(() => Array.from(inventory.keys()), [inventory]);
    const tableRows = useMemo(() => Array.from(inventory.values()), [inventory]);
    const maxRows = Math.max(...tableRows.map((values) => values.length + 1));

    const [editingCell, setEditingCell] = useState({ row: null, column: null });
    const [editingColumn, setEditingColumn] = useState({ column: null })

    //#region Manipuladores de alterações na tabela
    function handleEdit(row: any, column: any) {
        setEditingCell({ row, column });
    };

    function handleEditColumn(column: any) {
        setEditingColumn({ column })
    };

    function handleColumnValueChange(oldColumn: string, newColumn: string) {
        //No contexto de mudar o nome da coluna a melhor forma é criando um Array por causa da utilização do splice para substituir elementos existentes
        const inventoryToUpdate = isFilterMode ? filteredItens : inventory
        const updatedInventory = Array.from(inventoryToUpdate);

        const oldColumnIndex = updatedInventory.findIndex(([column]) => column === oldColumn);
        const oldColumnData = updatedInventory[oldColumnIndex][1];

        updatedInventory.splice(oldColumnIndex, 1, [newColumn, oldColumnData]);

        const inventoryMap = new Map(updatedInventory);

        if (isFilterMode) {
            setFilteredItens(inventoryMap);

            const inventoryArray = Array.from(inventory);

            const inventoryOldColumnIndex = inventoryArray.findIndex(([column]) => column === oldColumn);
            const inventoryOldColumnData = inventoryArray[inventoryOldColumnIndex][1];

            inventoryArray.splice(inventoryOldColumnIndex, 1, [newColumn, inventoryOldColumnData]);

            const map = new Map(inventoryArray);
            setInventory(map);
        }
        else {
            setInventory(inventoryMap);
        }
    };

    function handleCellValueChange(rowIndex: number, column: string, value: string) {

        const inventoryToUpdate = isFilterMode ? filteredItens : inventory;
        const updatedInventory = new Map(inventoryToUpdate);
        const indexMap = generateIndexMap(filteredItens, inventory);

        const columnData = updatedInventory.get(column);

        if (columnData) {
            columnData[rowIndex] = value;
            updatedInventory.set(column, columnData);
        }

        if (isFilterMode) {
            setFilteredItens(updatedInventory);

            const updatedInventoryMap = new Map(inventory);
            const inventoryColumnData = updatedInventoryMap.get(column);

            console.log(indexMap);
            const originalIndex = indexMap.get(column)?.[rowIndex];

            if (originalIndex === undefined) {
                console.log("Ocorreu um erro ao buscar index na coluna original");
                return;
            }
            console.log("Original Index que será atualizado: " + originalIndex);

            if (inventoryColumnData) {
                inventoryColumnData[originalIndex!] = value;
                updatedInventoryMap.set(column, inventoryColumnData);
            }

            setInventory(updatedInventoryMap);
        }
        else {
            setInventory(updatedInventory);
        }

    };

    function generateIndexMap(
        filteredMap: Map<string, string[]>,
        originalMap: Map<string, string[]>

    ): Map<string, number[]> {
        //Mapeamento de index que será retornado
        const indexMap = new Map<string, number[]>();

        filteredMap.forEach((filteredValues, column) => {
            const originalColumnData = originalMap.get(column)

            if (!originalColumnData) {
                indexMap.set(column, []);
                return;
            }

            const columnIndexMap: number[] = [];
            const usedIndices = new Set<number>();

            filteredValues.forEach(value => {
                //Busca o index do valor na lista original verificando se o valor é igual e se o index ja não foi utilizado, para evitar conflitos de duplicação de valores
                const originalIndex = originalColumnData.findIndex((v, index) => v === value && !usedIndices.has(index));

                if (originalIndex !== -1) {
                    columnIndexMap.push(originalIndex);
                    usedIndices.add(originalIndex);
                }
                else {
                    columnIndexMap.push(-1);
                }

            })

            //Aqui irá armazenar no map: o nome da coluna e a lista dos index que os valores filtrados tem na tabela original, assim podendo alterar os valores sem conflitos de duplicação
            indexMap.set(column, columnIndexMap);
        })

        return indexMap;
    }

    function handleBlur() {
        //Problema quando estou alterando o nome da coluna da tabela caso tenha uma igual a tabela é excluída mesmo ainda sendo alterada
        //Solução: alterar o nome da coluna apenas quando desfocar do input
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

    //#endregion

    //#region Manipuladores de fitragem na tabela

    function handleFilterByNotContainValue(filteredColumn: string, notContainFilterValue: string) {
        setIsFilterMode(false);
        const filteredInventory = applyFilterWithCriteria(filteredColumn, notContainFilterValue, true);

        setFilteredItens(filteredInventory);
        setIsFilterMode(true);
    }

    function handleFilterByContainValue(filteredColumn: string, filterValue: string) {
        setIsFilterMode(false);
        const filteredInventory = applyFilterWithCriteria(filteredColumn, filterValue, false);

        setFilteredItens(filteredInventory);
        setIsFilterMode(true);
    }

    function applyFilterWithCriteria(filteredColumn: string, criteriaValue: string, isNotContainFilter: boolean): Map<string, string[]> {
        let filteredInventory = new Map<string, string[]>();
        const columnData = inventory.get(filteredColumn)!;

        const filteredColumnData = isNotContainFilter
            ? columnData.filter((value) => !value.includes(criteriaValue))
            : columnData.filter((value) => value.includes(criteriaValue));

        filteredInventory.set(filteredColumn, filteredColumnData);

        const indexMap = generateIndexMap(filteredInventory, inventory);

        inventory.forEach((_, column) => {

            if (column === filteredColumn) {
                //Identificando em qual index a coluna filtrada se encontra no map original
                const inventoryArray = Array.from(inventory);
                const columnIndex = inventoryArray.findIndex(([c]) => c === column);
                console.log("ColumnIndex: " + columnIndex);

                const filteredInventoryArray = Array.from(filteredInventory);
                console.log(filteredInventoryArray);

                //Excluindo coluna que está sendo filtrada existente no map
                const deleteColumnIndex = filteredInventoryArray.findIndex(([c]) => c === column);
                filteredInventoryArray.splice(deleteColumnIndex, 1);

                //Adicionando de volta a coluna que está sendo filtrado so que em sua respectiva posição
                filteredInventoryArray.splice(columnIndex, 1, [column, filteredColumnData]);
                filteredInventory = new Map<string, string[]>(filteredInventoryArray);
                return;
            }

            const columnDataArray: string[] = [];
            indexMap.forEach((indexNumbers) => {

                indexNumbers.forEach((indexNumber) => {
                    const value = inventory.get(column)?.[indexNumber];
                    console.log("Value: " + value);

                    if (value === "" || value === undefined) {
                        columnDataArray.push("");
                        return;
                    }

                    columnDataArray.push(value!);

                })

            })

            filteredInventory.set(column, columnDataArray);
            console.log("Coluna adicionado foi: " + column);
            console.log(filteredInventory);
        })

        return filteredInventory;
    }

    function removeFilters() {
        setIsFilterMode(false);
    }

    //#endregion

    return (
        <>
            <SideBar />
            <div className="w-screen h-screen bg-gray-100">
                <main className="w-full h-full pl-64">
                    <div className="w-full h-full flex p-6">
                        <Card className="w-full">
                            <div className="flex flex-col h-full">
                                <CardHeader className="mb-4 h-28">
                                    <CardTitle className="text-2xl font-bold">Inventário de notbooks</CardTitle>
                                    <Button className="w-40 h-5 bg-orange-500 opacity-90 text-black font-semibold hover:opacity-100 hover:bg-orange-500"><ClipboardPaste />Exportar excel</Button>
                                    {isFilterMode && <Button className="w-40 h-5 bg-red-500 opacity-90 text-white font-medium rounded-sm hover:opacity-100 hover:bg-red-600" onClick={removeFilters}><FilterX />Remover filtros</Button>}
                                </CardHeader>
                                <CardContent className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                {(tableHeaders).map((columnName, columnIndex) => (
                                                    <>

                                                        <TableHead className="cursor-pointer h-16 text-base"
                                                            key={columnIndex}
                                                            onClick={() => handleEditColumn(columnIndex)}
                                                        >
                                                            <div className="flex min-w-fit">
                                                                <ColumnOptions
                                                                    onClickDeleteButton={() => deleteColumn(columnName)}
                                                                    onChangeFilterByContainValue={(_, filterValue) => handleFilterByContainValue(columnName, filterValue)}
                                                                    onChangeFilterByNotContainValue={(_, notContainFilterValue) => handleFilterByNotContainValue(columnName, notContainFilterValue)}
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
                                                    {(tableHeaders).map((column, columnIndex) => (
                                                        <TableCell className="font-medium cursor-pointer"
                                                            key={columnIndex}
                                                            onClick={() => handleEdit(rowIndex, column)}
                                                        >
                                                            {editingCell.row === rowIndex && editingCell.column === column
                                                                ?
                                                                (
                                                                    <Input className="w-full border border-gray-300 rounded px-2 py-1"
                                                                        type="text"
                                                                        value={isFilterMode ? filteredItens.get(column)?.at(rowIndex) : inventory.get(column)?.at(rowIndex)}
                                                                        onChange={(e) => handleCellValueChange(rowIndex, column, e.target.value)}
                                                                        onBlur={handleBlur}
                                                                        autoFocus
                                                                    />
                                                                )
                                                                :
                                                                (
                                                                    isFilterMode ? filteredItens.get(column)?.at(rowIndex) : inventory.get(column)?.at(rowIndex)
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