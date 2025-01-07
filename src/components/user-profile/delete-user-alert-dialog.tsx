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

function DeleteUserAlertDialog({
    onClickConfirmButton
}: {
    onClickConfirmButton: () => void;
}) {
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="destructive"
                        className="w-full h-8 bg opacity-90 text-white font-regular hover:opacity-100 hover:bg-red-600"
                    >
                        <Trash />
                        Excluir este usuário
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-orange-600 border-black">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Tem certeza que deseja excluir este usuário?</AlertDialogTitle>
                        <AlertDialogDescription className="text-black">
                            Esta ação é irreversível e não será possível recuperar os dados excluídos
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction
                            onClick={() => onClickConfirmButton()}
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

export default DeleteUserAlertDialog;