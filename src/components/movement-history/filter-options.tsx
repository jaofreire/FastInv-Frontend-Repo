import { Ellipsis } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";

function FilterOptions({
    onChangeFilterValue
}: {
    onChangeFilterValue: (column: string, filterValue: string) => void;
}) {


    return (
        <>
            <Popover>
                <PopoverTrigger className="cursor-pointer" asChild>
                    <Ellipsis className="opacity-" />
                </PopoverTrigger>
                <PopoverContent
                    className="w-32 h-auto bg-gray-200 border rounded-lg"
                    side="right"
                    align="center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Input
                        className="bg-gray-200"
                        placeholder="Filtrar por valor"
                        type="text"
                        onChange={(e) => onChangeFilterValue('', e.target.value)}
                    >
                    </Input>
                </PopoverContent>
            </Popover>
        </>
    )

}

export default FilterOptions;