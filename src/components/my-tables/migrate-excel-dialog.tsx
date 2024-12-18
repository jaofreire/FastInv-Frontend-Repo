import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { BadgePlus, Blend, Check } from "lucide-react";
import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";

function MigrateExcelDialog({
    onClickConfirmButton
}: {
    onClickConfirmButton: (excelFile: File) => void;
}) {
    const [excelFile, setExcelFile] = useState<File | null>(null);

    function handleExcelFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files.length > 0) {
            setExcelFile(event.target.files[0]);
        }
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                <Button className="w-30 h-8 bg-slate-950 opacity-90 text-white font-semibold hover:opacity-100 hover:bg-slate-950"><Blend />Migrar tabela Excel</Button>
                </DialogTrigger>
                <DialogContent className="fixed w-4/12 h-[27%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-600 rounded-lg shadow-lg p-6">
                    <DialogHeader>
                        <DialogTitle className="text-white text-xl font-bold">Migrar tabela</DialogTitle>
                        <DialogDescription className="text-white opacity-75">Selecione o arquivo Excel que deseja migrar para o sistema</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col w-full h-full gap-4 items-center">
                        <Input
                            className="bg-white"
                            type='file'
                            onChange={handleExcelFileChange}
                        />
                        <Button
                            className="w-40 h-8 bg-black opacity-90 text-white font-semibold hover:opacity-100 hover:bg-black"
                            onClick={() => onClickConfirmButton(excelFile!)}
                        >
                            <Check />Confirmar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )

}

export default MigrateExcelDialog;