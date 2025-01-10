import { PenLine } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUser } from "@/services/user-service";
import { UpdateUserRequestType } from "@/types/api-request-types/user/update-user-request-type";
import { useEffect, useState } from "react";
import ErrorDialog from "../Global/errors/error-dialog";
import { Input } from "../ui/input";

const formSchema = z.object({
    userName:
        z.string()
            .min(4, { message: 'Nome deve conter pelo menos 4 caracteres' })
            .max(100, { message: 'Nome deve ter até 100 caracteres' }),

    department:
        z.string()
            .min(4, { message: 'Departamento deve conter pelo menos 4 caracteres' })
            .max(85, { message: 'Departamente deve ter até 100 caracteres' }),

    email: z.string().email(),

    phoneNumber:
        z.string()
            .min(7, { message: 'Número celular deve conter pelo menos 7 números' })
            .max(15, { message: 'Número celular deve ter até 15 números' }),

})

function UpdateUserDialog({
    Id,
    Name,
    Department,
    Email,
    PhoneNumber
}: {
    Id: string;
    Name: string;
    Department: string;
    Email: string;
    PhoneNumber: string;
}) {

    const [error, setError] = useState<string>('');

    useEffect(() => {
        formControl.reset({
            userName: Name,
            department: Department,
            email: Email,
            phoneNumber: PhoneNumber,
        })
    }, [Name]);

    const formControl = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: Name,
            department: Department,
            email: Email,
            phoneNumber: PhoneNumber,
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const request: UpdateUserRequestType = {
            name: values.userName,
            department: values.department,
            email: values.email,
            phoneNumber: values.phoneNumber
        }

        const response = await updateUser(Id, request);

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
                    <Button className="w-full h-8 bg-orange-500 opacity-90 text-black font-semibold hover:opacity-100 hover:bg-orange-500"><PenLine />Atualizar informações</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-orange-600 border-black max-h-screen overflow-auto">
                    <DialogHeader>
                        <DialogTitle className="text-white text-xl font-bold">Atualizar informações</DialogTitle>
                        <DialogDescription className="text-white opacity-75">Insira as novas informações do usuário</DialogDescription>
                    </DialogHeader>
                    <Form {...formControl}>
                        <form onSubmit={formControl.handleSubmit(onSubmit)} className="space-y-6">

                            <FormField
                                control={formControl.control}
                                name="userName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white font-medium">Nome do usuário</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-950" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={formControl.control}
                                name="department"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white font-medium">Nome do setor/departamento do usuário</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-950" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={formControl.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white font-medium">Email do usuário</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-950" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={formControl.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white font-medium">Número celular do usuário</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
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

export default UpdateUserDialog;