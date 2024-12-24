import { ArrowDownAZ, ArrowUpZA, Ellipsis, Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function FilterOptions({
    onChangeFilterValue,
    onClickFilterByAlphabeticalOrder
}: {
    onChangeFilterValue: (column: string, filterValue: string, isContainFilter: boolean) => void;
    onClickFilterByAlphabeticalOrder: (isAscending: boolean, column: string) => void;
}) {


    return (
        <>
            {/* Popover principal*/}
            <Popover>
                <PopoverTrigger className="cursor-pointer" asChild><Ellipsis className="opacity-" /></PopoverTrigger>
                <PopoverContent
                    className="w-32 bg-gray-200 border rounded-lg"
                    side="right"
                    align="center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="grid gap-1">
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
                                className="w-fit h-auto bg-gray-400 border rounded-lg"
                            >
                                <div className="grid gap-1 w-full">
                                    <Input
                                        className="bg-gray-200"
                                        placeholder="Filtrar por valor"
                                        type="text"
                                        onChange={(e) => onChangeFilterValue("", e.target.value, true)}
                                    >
                                    </Input>
                                    <Input
                                        className="bg-gray-200"
                                        placeholder="Filtrar por não contém valor"
                                        type="text"
                                        onChange={(e) => onChangeFilterValue("", e.target.value, false)}
                                    >
                                    </Input>
                                    <Button
                                        className="w-full justify-start gap-2 text-xs font-medium hover:font-semibold"
                                        size="sm"
                                        onClick={() => onClickFilterByAlphabeticalOrder(true, '')}
                                    >
                                        <ArrowDownAZ />
                                        Ordem alfabética
                                    </Button>
                                    <Button
                                        className="w-full justify-start gap-2 text-xs font-medium hover:font-semibold"
                                        size="sm"
                                        onClick={() => onClickFilterByAlphabeticalOrder(false, '')}
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

export default FilterOptions;