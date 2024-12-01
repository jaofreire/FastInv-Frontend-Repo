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
import { ClipboardPaste, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

type DynamicInventoryItem = Record<string, any>

function MyTables() {
    const [editingCell, setEditingCell] = useState({ row: null, column: null });

    const handleEdit = (row: any, column: any) => {
        setEditingCell({ row, column });
    };

    const [inventory2, setInventory] = useState<DynamicInventoryItem[]>([
        { product: "Product 1", category: "Category 1", price: 50, stock: 10 },
        { product: "Product 2", category: "Category 2", price: 100, stock: 20 },
    ]);

    const handleValueChange = (rowIndex: number, key: string, value: any) => {
        const updatedInventory = [...inventory2];
        updatedInventory[rowIndex][key] = value;
        setInventory(updatedInventory);
    };

    const handleBlur = () => {
        setEditingCell({ row: null, column: null });
    };


    return (
        <>
            <SideBar />
            <div className="w-screen h-screen">
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
                                                <TableHead>Product</TableHead>
                                                <TableHead>Category</TableHead>
                                                <TableHead className="text-right">Price ($)</TableHead>
                                                <TableHead className="text-right">Stock</TableHead>
                                                <Button className="ml-2"><PlusIcon></PlusIcon></Button>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {inventory2.map((item, index) => (
                                                <TableRow key={index}>
                                                    {Object.entries(item).map(([key, value], columnIndex) => (
                                                        <TableCell className="font-medium cursor-pointer"
                                                            key={columnIndex}
                                                            onClick={() => handleEdit(index, key)}
                                                        >
                                                            {editingCell.row === index && editingCell.column === key ? (
                                                                <Input className="w-full border border-gray-300 rounded px-2 py-1"
                                                                    type="text"
                                                                    value={value}
                                                                    onChange={(e) => handleValueChange(index, key, e.target.value)}
                                                                    onBlur={handleBlur}
                                                                    autoFocus
                                                                />
                                                            ) : (
                                                                value
                                                            )}
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