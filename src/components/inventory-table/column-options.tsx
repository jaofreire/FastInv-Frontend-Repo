import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Ellipsis, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

function ColumnOptions({onClickDeleteButton}: {onClickDeleteButton: (columnName: string) => void}) {
    return (
        <>
            <Popover>
                <PopoverTrigger className="cursor-pointer" asChild><Ellipsis className="opacity-" /></PopoverTrigger>
                <PopoverContent
                    side="right"
                    align="center"
                    className="w-32 h-auto bg-gray-200 border rounded-lg"
                >
                    <div className="grid gap-1">
                        <Button
                            className="w-full justify-start gap-2 text-xs font-medium"
                            variant="destructive"
                            size="sm"
                            onClick={() => onClickDeleteButton("")}
                        >
                            <Trash2 className="h-4 w-4" />
                            Apagar
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default ColumnOptions;