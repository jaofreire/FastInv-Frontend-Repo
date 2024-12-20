import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { Blend, Check } from "lucide-react";
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
                <DialogContent className="sm:max-w-[425px] bg-orange-600 border-black">
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