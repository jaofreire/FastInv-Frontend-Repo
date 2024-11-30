import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

function SignIn() {

    const formControl = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Login válido!!");
    }

    return (
        <>
            <div className="flex items-center justify-center h-screen w-screen bg-orange-400">
                <Form {...formControl}>
                    <form
                        onSubmit={formControl.handleSubmit(onSubmit)}
                        className="space-y-8 bg-white p-6 rounded-lg shadow-md w-96 h-96"
                    >
                        <div className="flex justify-center">
                            <h6 className="font-bold text-black text-lg text-center w-40 h-10">
                                Bem vindo ao <span className="text-orange-600 text-2xl font-extrabold">FastInv</span>
                            </h6>
                        </div>
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
                        <div className="flex justify-center">
                            <Button className="bg-orange-500 font-semibold w-full" type="submit">Entrar</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default SignIn;

