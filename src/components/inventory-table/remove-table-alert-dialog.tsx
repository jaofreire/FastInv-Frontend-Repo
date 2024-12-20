import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button";
import { Trash } from "lucide-react";


function RemoveTableAlertDialog({
    onClickConfirmButton
}: {
    onClickConfirmButton: (id: string) => void
}) {
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="destructive"
                        className="w-40 h-8 bg opacity-90 text-white font-regular hover:opacity-100 hover:bg-red-600"
                    >
                        <Trash />
                        Excluir esta tabela
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-orange-600 border-black">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Tem certeza que deseja excluir sua tabela?</AlertDialogTitle>
                        <AlertDialogDescription className="text-black">
                            Esta ação é irreversível e não será possível recuperar os dados excluídos
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction
                            onClick={() => onClickConfirmButton('')}
                        >
                            Confirmar
                        </AlertDialogAction>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    )

}

export default RemoveTableAlertDialog;