import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { PenBox } from "lucide-react";
import { updateUserRole } from "@/services/user-service";
import { useState } from "react";
import ErrorDialog from "../Global/errors/error-dialog";

const formSchema = z.object({
    'role': z.enum(['0', '1'])
})

function UpdateUserRoleDialog({
    Id
}: {
    Id: string;
}) {

    const [error, setError] = useState<string>('');

    const formControl = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await updateUserRole(Id, Number(values.role));

        if (response.isSuccess === false) {
            setError(response.message);
            return;
        }

        window.location.reload();
    }

    if (error) {
        return <ErrorDialog errorDescription={error} />
    }


    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="w-30 h-8 bg-black opacity-80 text-white font-semibold hover:opacity-100 hover:bg-black"><PenBox />Alterar permissão</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-orange-600 border-black max-h-screen overflow-auto">
                    <DialogHeader>
                        <DialogTitle className="text-white text-xl font-bold">Alterar permissão</DialogTitle>
                        <DialogDescription className="text-white opacity-75">Insira as a nova permissão do usuário</DialogDescription>
                    </DialogHeader>
                    <Form {...formControl}>
                        <form onSubmit={formControl.handleSubmit(onSubmit)} className="space-y-6">

                            <FormField
                                control={formControl.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white font-medium">Tipo de permissão</FormLabel>
                                        <FormControl>
                                            <Select {...field}
                                                onValueChange={(value) => field.onChange(value)}
                                                value={field.value} >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value='0'> Usuário </SelectItem>
                                                        <SelectItem value='1'> Admin </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className="text-red-950" />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full bg-black hover:bg-black hover:opacity-95"
                            >
                                Criar
                            </Button>

                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default UpdateUserRoleDialog;