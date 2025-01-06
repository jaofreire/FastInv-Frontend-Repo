import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";

function ErrorDialog({
    errorDescription
}: {
    errorDescription: string
}) {

    function handleBack() {
        window.history.back()
    }

    function handleTryAgain(){
        window.location.reload();
    }

    return (
        <>
            <Dialog open={true}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-destructive/15 p-3">
                                <AlertCircle className="h-6 w-6 text-destructive" />
                            </div>
                            <DialogTitle>Algo de errado acontenceu</DialogTitle>
                        </div>
                        <DialogDescription>{errorDescription}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:space-x-4">
                        <Button
                            variant="outline"
                            onClick={() => handleBack()}
                        >
                            Voltar
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => handleTryAgain()}
                        >
                            Tentar novamente
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )

}

export default ErrorDialog;