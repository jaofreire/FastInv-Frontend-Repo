import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { registerNewCompany } from "@/services/company-service";
import { login } from "@/services/auth-service";
import { saveUserDataGlobalState } from "@/services/user-service";
import { AuthContext } from "@/contexts/auth/auth-provider";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    companyName:
        z.string()
            .min(2, { message: 'Nome da empresa deve conter no minimo 2 caracteres' })
            .max(186, { message: 'Nome da empresa deve conter no máximo 186 caracteres' }),

    cnpj:
        z.string()
            .length(18, { message: 'Cnpj deve conter 18 caracteres' }),

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
})

function SignUpCompany() {

    const { Login } = useContext(AuthContext);

    const navigator = useNavigate();

    const [error, setError] = useState<string>('');

    const formControl = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: '',
            cnpj: '',
            userName: '',
            department: '',
            email: '',
            phoneNumber: '',
            password: ''
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await registerNewCompany(
            values.companyName,
            values.cnpj,
            values.userName,
            values.department,
            values.email,
            values.phoneNumber,
            values.password
        );

        const loginResponse = await login(values.email, values.password);

        if (loginResponse.isSuccess === false) {
            setError(loginResponse.message);
        }

        await saveUserDataGlobalState(loginResponse.response, Login);
        navigator('/main-page');
    }

    return (
        <>
            <div className=" h-screen w-screen flex items-center justify-center bg-[#FF8B3D]">
                <Card className="w-full h-full max-w-md max-h-md overflow-auto">
                    <CardContent className="pt-6 ">
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-semibold">Bem vindo ao</h1>
                            <h2 className="text-[#FF8B3D] text-2xl font-bold">FastInv</h2>
                        </div>
                        <Form {...formControl}>

                            <form onSubmit={formControl.handleSubmit(onSubmit)} className="space-y-6">

                                <FormField
                                    control={formControl.control}
                                    name="companyName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-orange-500 font-bold">Nome da empresa</FormLabel>
                                            <FormControl>
                                                <Input placeholder="insira o nome da empresa" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={formControl.control}
                                    name="cnpj"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-orange-500 font-bold">CNPJ</FormLabel>
                                            <FormControl>
                                                <Input placeholder="insira o CNPJ da empresa" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={formControl.control}
                                    name="userName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-orange-500 font-bold">Nome do usuário Administrador</FormLabel>
                                            <FormControl>
                                                <Input placeholder="insira o nome" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={formControl.control}
                                    name="department"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-orange-500 font-bold">Nome o setor/departamento do usuário Administrador</FormLabel>
                                            <FormControl>
                                                <Input placeholder="insira o setor/departamento" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={formControl.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-orange-500 font-bold">Email do usuário Administrador</FormLabel>
                                            <FormControl>
                                                <Input placeholder="insira o email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={formControl.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-orange-500 font-bold">Número celular do usuário Administrador</FormLabel>
                                            <FormControl>
                                                <Input placeholder="insira o número" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={formControl.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-orange-500 font-bold">Senha</FormLabel>
                                            <FormControl>
                                                <Input placeholder="insira a senha" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {error ?? <span className="text-red-500">{error}</span>}
                                <h5 className="text-sm">Ja tem uma conta? <span className="text-orange-500 cursor-pointer" onClick={() => navigator('/')}>Entre agora</span></h5>
                                <Button
                                    type="submit"
                                    className="w-full bg-[#FF8B3D] hover:bg-[#e67d35]"
                                >
                                    Entrar
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default SignUpCompany;


