import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { BadgePlus, Check } from "lucide-react";
import { useState } from "react";

function CreateNewInventoryTableDialog({
    onClickConfirmButton
}:{
    onClickConfirmButton: (name: string) => void;
}) {
    const [newTableName, setNewTableName] = useState('');

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="w-30 h-8 bg-orange-500 opacity-90 text-black font-semibold hover:opacity-100 hover:bg-orange-500"><BadgePlus />Criar tabela</Button>
                </DialogTrigger>
                <DialogContent className="fixed w-4/12 h-[27%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-600 rounded-lg shadow-lg p-6">
                    <DialogHeader>
                        <DialogTitle className="text-white text-xl font-bold">Criar tabela</DialogTitle>
                        <DialogDescription className="text-white opacity-75">Insira o nome da sua nova tabela</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col w-full h-full gap-4 items-center">
                        <Input
                            className="bg-white"
                            type="text"
                            value={newTableName}
                            onChange={(e) => setNewTableName(e.target.value)}
                        />
                        <Button
                            className="w-40 h-8 bg-black opacity-90 text-white font-semibold hover:opacity-100 hover:bg-black"
                            onClick={() => onClickConfirmButton(newTableName)}
                        >
                            <Check />Confirmar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateNewInventoryTableDialog;