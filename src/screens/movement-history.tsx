import SideBar from "@/components/Global/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { ArrowUpDown, Eye } from "lucide-react";

const mockData = [
    {
        id: 1,
        user: "John Doe",
        table: "Users",
        action: "Update",
        timestamp: new Date("2023-05-01T09:30:00"),
        changes: {
            name: ["John Smith", "John Doe"],
            email: ["john.smith@example.com", "john.doe@example.com"]
        }
    },
    {
        id: 2,
        user: "Jane Smith",
        table: "Products",
        action: "Insert",
        timestamp: new Date("2023-05-01T10:15:00"),
        changes: {
            name: ["New Product"],
            price: ["$19.99"]
        }
    },
    {
        id: 3,
        user: "Bob Johnson",
        table: "Orders",
        action: "Delete",
        timestamp: new Date("2023-05-01T11:45:00"),
        changes: {
            orderId: ["ORD-12345"]
        }
    },
    {
        id: 4,
        user: "Alice Brown",
        table: "Customers",
        action: "Update",
        timestamp: new Date("2023-05-01T13:20:00"),
        changes: {
            address: ["123 Old St", "456 New Ave"],
            phoneNumber: ["555-1234", "555-5678"]
        }
    },
    {
        id: 5,
        user: "Charlie Wilson",
        table: "Inventory",
        action: "Insert",
        timestamp: new Date("2023-05-01T14:50:00"),
        changes: {
            productId: ["PROD-789"],
            quantity: ["100"]
        }
    }
]

function MovementHistory() {
    const data = mockData
    const filterValue = "";

    const filteredData = data.filter(
        (item) =>
            item.user.toLowerCase().includes(filterValue.toLowerCase()) ||
            item.table.toLowerCase().includes(filterValue.toLowerCase()) ||
            item.action.toLowerCase().includes(filterValue.toLowerCase())
    )

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
                                        <CardTitle className="text-2xl font-bold">Histórico de movimentação</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Table className="overflow-x-auto">
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[200px]">
                                                    <Button variant="ghost" className="text-black bg-transparent">
                                                        Usuário
                                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </TableHead>
                                                <TableHead>
                                                    <Button variant="ghost" className="text-black bg-transparent">
                                                        Tabela
                                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </TableHead>
                                                <TableHead>
                                                    <Button variant="ghost" className="text-black bg-transparent">
                                                        Ação
                                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </TableHead>
                                                <TableHead>
                                                    <Button variant="ghost" className="text-black bg-transparent">
                                                        Data/Hora
                                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </TableHead>
                                                <TableHead className="text-black">Mudanças</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredData.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell className="font-medium">{item.user}</TableCell>
                                                    <TableCell>{item.table}</TableCell>
                                                    <TableCell>{item.action}</TableCell>
                                                    <TableCell className="text-right">
                                                    </TableCell>
                                                    <TableCell>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button variant="outline" size="sm">
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View Changes
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-80">
                                                                <div className="grid gap-4">
                                                                    <div className="space-y-2">
                                                                        <h4 className="font-medium leading-none">Changes</h4>
                                                                        <p className="text-sm text-muted-foreground">
                                                                            Details of the changes made in this event.
                                                                        </p>
                                                                    </div>
                                                                    <div className="grid gap-2">
                                                                        {Object.entries(item.changes).map(([field, values]) => (
                                                                            <div key={field} className="grid grid-cols-3 items-center gap-4">
                                                                                <span className="text-sm font-medium">{field}</span>
                                                                                {Array.isArray(values) && values.length > 1 ? (
                                                                                    <span className="col-span-2 text-sm">
                                                                                        {values[0]} → {values[1]}
                                                                                    </span>
                                                                                ) : (
                                                                                    <span className="col-span-2 text-sm">{values[0]}</span>
                                                                                )}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </TableCell>
                                                </TableRow>
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