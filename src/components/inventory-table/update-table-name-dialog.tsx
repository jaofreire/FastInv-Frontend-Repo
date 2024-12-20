
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Pencil } from "lucide-react"
import { useState } from "react"

function UpdateTableNameDialog({
    onClickConfirmButton
}: {
    onClickConfirmButton: (newName: string) => void

}) {
    const [newName, setNewName] = useState<string>('');

    function handleNewNameValueChange(value: string) {
        setNewName(value);
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Pencil className="w-5 cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-orange-600 border-black">
                    <DialogHeader>
                        <DialogTitle className="text-black">Renomear tabela</DialogTitle>
                        <DialogDescription className="text-black">
                            Insira o novo nome da sua tabela
                        </DialogDescription>
                    </DialogHeader>
                    <div className="w-full grid gap-4 py-4">
                        <div className=" w-full grid grid-cols-4 items-center gap-4">
                            <Input
                                className="col-span-3 bg-white"
                                value={newName}
                                onChange={(e) => handleNewNameValueChange(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={() => onClickConfirmButton(newName)}
                        >
                            Confirmar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )

}

export default UpdateTableNameDialog;