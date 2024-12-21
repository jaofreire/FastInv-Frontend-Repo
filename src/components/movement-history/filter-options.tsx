import { Ellipsis } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";

function FilterOptions() {
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
                    >
                    </Input>
                </PopoverContent>
            </Popover>
        </>
    )

}

export default FilterOptions;