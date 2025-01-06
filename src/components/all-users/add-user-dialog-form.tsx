import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { Button } from "../ui/button";
import { BadgePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { RegisterNewUserRequestType } from "@/types/api-request-types/user/register-new-user-request-type";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/auth/auth-provider";
import { registerNewUser } from "@/services/user-service";
import ErrorDialog from "../Global/errors/error-dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

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

    password:
        z.string()
            .min(6, { message: 'Senha deve conter pelo menos 6 caracteres' }),

    role:
        z.enum(['0', '1'], {
            required_error: 'Escolha uma opção'
        })
})

function AddUserDialogForm() {

    const { CompanyId } = useContext(AuthContext)

    const [error, setError] = useState<string>('');

    const formControl = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: '',
            department: '',
            email: '',
            phoneNumber: '',
            password: ''
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const request: RegisterNewUserRequestType = {
            companyId: CompanyId,
            name: values.userName,
            password: values.password,
            department: values.department,
            email: values.email,
            phoneNumber: values.phoneNumber,
            role: Number(values.role)
        }

        const response = await registerNewUser(request);

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
                    <Button className="w-30 h-8 bg-orange-500 opacity-90 text-black font-semibold hover:opacity-100 hover:bg-orange-500"><BadgePlus />Adicionar funcionário</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-orange-600 border-black max-h-screen overflow-auto">
                    <DialogHeader>
                        <DialogTitle className="text-white text-xl font-bold">Criar funcionário</DialogTitle>
                        <DialogDescription className="text-white opacity-75">Insira as informações do novo funcionário</DialogDescription>
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

                            <FormField
                                control={formControl.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white font-medium">Senha</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-950" />
                                    </FormItem>
                                )}
                            />

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
    );

}

export default AddUserDialogForm;