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
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import ColumnOptions from "@/components/inventory-table/column-options";
import { useNavigate, useParams } from "react-router-dom";
import { exportToExcel, getInventoryTableById, removeInventoryTable, updateInventoryTableItems, updateInventoryTableItemsWithoutMovementEvent, updateInventoryTableName } from "@/services/inventory-table-service";
import { UpdateInventoryTableRequestType } from "@/types/api-request-types/inventory-table/update-inventory-table-request-type";
import RemoveTableAlertDialog from "@/components/inventory-table/remove-table-alert-dialog";
import UpdateTableNameDialog from "@/components/inventory-table/update-table-name-dialog";
import ErrorDialog from "@/components/Global/errors/error-dialog";
import { UpdateInventoryTableWithoutMovementEventRequestType } from "@/types/api-request-types/inventory-table/update-inventory-table-without-movement-event-request-type";
import { downloadExcel } from "@/utils/download-files-handler";

function InventoryTable() {
    const { tableName, id } = useParams();

    const navigation = useNavigate();

    useEffect(() => {
        const loadInventoryTable = async () => {
            if (id) {
                const inventoryTable = await getInventoryTableById(id.toString());
                if (inventoryTable.isSuccess === false) {
                    setError(inventoryTable.message);
                    return;
                }
                setInventory(inventoryTable.response.items);
            }
        };

        loadInventoryTable();
    }, []);

    const [error, setError] = useState<string>('');

    const [inventory, setInventory] = useState<Map<string, string[]>>(
        new Map<string, string[]>([
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

    const [columnEdited, setColumnEdited] = useState<string>('');
    const [previousValue, setPreviousValue] = useState<string>('');
    const [currentValue, setCurrentValue] = useState<string>('');

    const [columnNameEdited, setColumnNameEdited] = useState<string | null>(null);

    const [editingCell, setEditingCell] = useState({ row: null, column: null });
    const [editingColumn, setEditingColumn] = useState({ column: null });

    //#region Chamadas para API

    async function exportTableToExcel(){
        if(id && tableName){
            const apiResponse = await exportToExcel(id);
            
            if(apiResponse.isSuccess === false){
                setError(apiResponse.message);
                return;
            }

            downloadExcel(apiResponse.response, tableName + '.xlsx');
        }
    }

    async function updateItems(inventoryRequest: Map<string, string[]> | null = null) {

        if (columnEdited === '' || currentValue === '') {
            return;
        }

        if (id && tableName) {
            const inventoryObject = Object.fromEntries(inventoryRequest ?? inventory);
            const updateRequest = new UpdateInventoryTableRequestType(id, tableName, columnEdited, previousValue, currentValue, inventoryObject);
            const response = await updateInventoryTableItems(updateRequest);

            if (response.isSuccess === false) {
                setError(response.message);
            }
        }
    }

    async function updateColumnChanges(inventoryRequest: Map<string, string[]> | null = null) {

        if (id && tableName) {
            const inventoryObject = Object.fromEntries(inventoryRequest ?? inventory);
            const updateRequest: UpdateInventoryTableWithoutMovementEventRequestType = {
                id: id,
                name: tableName,
                items: inventoryObject
            }
            const response = await updateInventoryTableItemsWithoutMovementEvent(updateRequest);

            if (response.isSuccess === false) {
                setError(response.message);
            }
        }

    }

    async function updateTableName(newName: string) {
        if (id && newName) {
            const response = await updateInventoryTableName(id, newName);

            if (response.isSuccess === false) {
                setError(response.message);
            }

            navigation(-1);
        }
    }

    async function removeTable() {
        if (id) {
            const response = await removeInventoryTable(id);

            if (response.isSuccess === false) {
                setError(response.message);
            }

            navigation(-1);
        }
    }

    //#endregion

    //#region Manipuladores de alterações na tabela

    function handleEditedValuesChange(column: string, current: string) {
        setColumnEdited(column);
        setCurrentValue(current);
    }

    function removeEditedValues() {
        setColumnEdited('');
        setPreviousValue('');
        setCurrentValue('');
    }

    function handleEdit(row: any, column: any) {
        setEditingCell({ row, column });

        const columnData = inventory.get(column);
        setPreviousValue(columnData![row]);
    };

    function handleEditColumn(column: any) {
        setEditingColumn({ column })
        setPreviousValue(tableHeaders[column]);
    };

    function handleColumnValueChange(oldColumn: string, newColumn: string) {
        setColumnNameEdited(newColumn);
        handleEditedValuesChange(oldColumn, newColumn);
    }

    function handleSaveColumnValueChange(oldColumn: string, newColumn: string) {
        if (!currentValue) {
            return;
        }

        //No contexto de mudar o nome da coluna a melhor forma é criando um Array por causa da utilização do splice para substituir elementos existentes
        const inventoryToUpdate = isFilterMode ? filteredItens : inventory
        const updatedInventory = Array.from(inventoryToUpdate);

        const existsColumn = updatedInventory.filter(([column]) => column === newColumn);
        console.log(existsColumn);

        if (existsColumn.length > 0) {
            setError('Uma coluna com o nome ' + newColumn + ' ja existe na tabela, tente outro nome')
            return;
        }

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

            updateItems(map);
            setInventory(map);
        }
        else {
            updateItems(inventoryMap);
            setInventory(inventoryMap);
        }
    };

    function handleCellValueChange(rowIndex: number, column: string, value: string) {

        const inventoryToUpdate = isFilterMode ? filteredItens : inventory;
        const updatedInventory = new Map(inventoryToUpdate);
        const indexMap = generateIndexMap(filteredItens, inventory);

        const columnData = updatedInventory.get(column);

        if (columnData) {
            handleEditedValuesChange(column, value);

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
        setEditingCell({ row: null, column: null });
        setEditingColumn({ column: null });
        removeEditedValues();

        updateItems();
    };

    function handleBlurColumnInput(oldColumn: string, newColumn: string) {
        setEditingColumn({ column: null });
        setColumnNameEdited(null);
        removeEditedValues();

        handleSaveColumnValueChange(oldColumn, newColumn);
    }

    function addNewColumn() {
        const updatedInventory = new Map(inventory);
        updatedInventory.set("Coluna nova..", []);

        updateColumnChanges(updatedInventory);
        setInventory(updatedInventory);
    };

    function deleteColumn(column: string) {
        const updatedInventory = new Map(inventory);
        updatedInventory.delete(column);
        //Adicionar Dialog para avisar que os itens dessa coluna serão excluídas

        updateColumnChanges(updatedInventory);
        setInventory(updatedInventory);
    }

    //#endregion

    //#region Manipuladores de fitragem na tabela

    function handleFilterByAlphabeticalOrder(isAscending: boolean) {
        console.log(isAscending);
        setIsFilterMode(false);
        const updatedTable = new Map<string, string[]>();

        //Pode estar errado pois está fazendo o sort em todas as listas e não na que está sendo filtrada
        inventory.forEach((_, column) => {
            const columnData = inventory.get(column)

            if (columnData) {
                const sortedColumn = [...columnData].sort((a, b) => {
                    if (isAscending)
                        return a > b ? 1 : -1

                    return a < b ? 1 : -1
                })


                updatedTable.set(column, sortedColumn);
            }

        })
        setIsFilterMode(true);
        setFilteredItens(updatedTable);
    }

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
                // console.log("ColumnIndex: " + columnIndex);

                const filteredInventoryArray = Array.from(filteredInventory);
                // console.log(filteredInventoryArray);

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
                    // console.log("Value: " + value);

                    if (value === "" || value === undefined) {
                        columnDataArray.push("");
                        return;
                    }

                    columnDataArray.push(value!);

                })

            })

            filteredInventory.set(column, columnDataArray);
            // console.log("Coluna adicionado foi: " + column);
            // console.log(filteredInventory);
        })

        return filteredInventory;
    }

    function removeFilters() {
        setIsFilterMode(false);
        setFilteredItens(new Map<string, string[]>());
    }

    //#endregion


    if (error) {
        return <ErrorDialog errorDescription={error} />
    }

    return (
        <>
            <SideBar />
            <div className="w-screen h-screen bg-gray-100">
                <main className="w-full h-full pl-64">
                    <div className="w-full h-full flex p-6">
                        <Card className="w-full">
                            <div className="flex flex-col h-full">
                                <CardHeader className="mb-4 h-28 w-full">
                                    <div className="flex items-center gap-5 w-[98%]">
                                        <CardTitle className="text-2xl font-bold">{tableName}</CardTitle>
                                        <UpdateTableNameDialog
                                            onClickConfirmButton={(newName) => updateTableName(newName)}
                                        />
                                        <div className="flex flex-1 justify-end">
                                            <RemoveTableAlertDialog
                                                onClickConfirmButton={removeTable}
                                            />
                                        </div>
                                    </div>
                                    <Button className="w-40 h-5 bg-orange-500 opacity-90 text-black font-semibold hover:opacity-100 hover:bg-orange-500" onClick={exportTableToExcel}><ClipboardPaste />Exportar excel</Button>
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
                                                                    onClickFilterByAlphabeticalOrder={(isAscending) => handleFilterByAlphabeticalOrder(isAscending)}
                                                                />
                                                            </div>
                                                            {editingColumn.column === columnIndex
                                                                ?
                                                                (

                                                                    <Input className="w-full border border-gray-300 rounded px-2 py-1"
                                                                        type="text"
                                                                        value={columnNameEdited ?? columnName}
                                                                        onChange={(e) => handleColumnValueChange(columnName, e.target.value)}
                                                                        onBlur={(e) => handleBlurColumnInput(columnName, e.target.value)}
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

export default InventoryTable;