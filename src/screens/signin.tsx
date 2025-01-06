import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { login } from "@/services/auth-service";
import { saveUserDataGlobalState } from "@/services/user-service";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/auth/auth-provider";

const formSchema = z.object({
    email: z.string().email(),
    password:
        z.string()
            .min(6, { message: 'Senha deve conter pelo menos 6 caracteres' }),
})

function SignIn() {

    const { Login } = useContext(AuthContext);

    const navigator = useNavigate()

    const [error, setError] = useState<string>('');

    const formControl = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
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
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6">
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-semibold">Bem vindo ao</h1>
                            <h2 className="text-[#FF8B3D] text-2xl font-bold">FastInv</h2>
                        </div>
                        <Form {...formControl}>
                            <form onSubmit={formControl.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={formControl.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-orange-500 font-bold">Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Seu email" {...field} />
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
                                                <Input placeholder="Sua senha" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {error ?? <span className="text-red-500">{error}</span>}
                                <h5 className="text-sm">Ainda não tem uma conta? <span className="text-orange-500 cursor-pointer" onClick={() => navigator('/sign-up')}>Cadastre-se</span></h5>
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

export default SignIn;

