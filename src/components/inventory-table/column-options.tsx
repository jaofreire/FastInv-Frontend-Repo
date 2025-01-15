import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { ArrowDownAZ, ArrowUpZA, Ellipsis, Filter, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function ColumnOptions
    ({
        onClickDeleteButton,
        onChangeFilterByContainValue,
        onChangeFilterByNotContainValue,
        onClickFilterByAlphabeticalOrder
    }: {
        onClickDeleteButton: (columnName: string) => void;
        onChangeFilterByContainValue: (filteredColumn: string, filterValue: string) => void;
        onChangeFilterByNotContainValue: (filteredColumn: string, filterValue: string) => void;
        onClickFilterByAlphabeticalOrder: (isAscending: boolean) => void;
    }) {
    return (
        <>
            {/* Popover principal*/}
            <Popover>
                <PopoverTrigger className="cursor-pointer" asChild><Ellipsis className="opacity-" /></PopoverTrigger>
                <PopoverContent
                    className="w-32 h-auto bg-gray-200 border rounded-lg"
                    side="right"
                    align="center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="grid gap-1">
                        <Button
                            className="w-full justify-start gap-2 text-xs font-medium hover:font-semibold"
                            variant="destructive"
                            size="sm"
                            onClick={() => onClickDeleteButton("")}
                        >
                            <Trash2 className="h-4 w-4" />
                            Apagar
                        </Button>
                        {/* Popover de filtros */}

                        <Popover>
                            <PopoverTrigger className="cursor-pointer" asChild>
                                <Button
                                    className="w-full justify-start gap-2 text-xs font-medium"
                                    variant="outline"
                                    size="sm"
                                >
                                    <Filter className="h-4 w-4" />
                                    Filtro
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                side="right"
                                align="center"
                                className="w-56 h-auto bg-gray-400 border rounded-lg"
                            >
                                <div className="grid gap-1 w-full">
                                    <Input
                                        className="bg-gray-200"
                                        placeholder="Filtrar por valor"
                                        type="text"
                                        onChange={(e) => onChangeFilterByContainValue("", e.target.value)}
                                    >
                                    </Input>
                                    <Input
                                        className="bg-gray-200"
                                        placeholder="Filtrar por não contém valor"
                                        type="text"
                                        onChange={(e) => onChangeFilterByNotContainValue("", e.target.value)}
                                    >
                                    </Input>
                                    <Button
                                        className="w-full justify-start gap-2 text-xs font-medium hover:font-semibold"
                                        size="sm"
                                        onClick={() => onClickFilterByAlphabeticalOrder(true)}
                                    >
                                        <ArrowDownAZ />
                                        Ordem alfabética
                                    </Button>
                                    <Button
                                        className="w-full justify-start gap-2 text-xs font-medium hover:font-semibold"
                                        size="sm"
                                        onClick={() => onClickFilterByAlphabeticalOrder(false)}
                                    >
                                        <ArrowUpZA />
                                        Ordem alfabética invertida
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default ColumnOptions;