import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { LayoutDashboard } from "lucide-react";
import { useLogin } from "./usecase/useLogin";

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Passowrd must be at least 2 characters.",
    })
})

export function LoginContainer() {
    const { mutate: loginMutate, isPending } = useLogin();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        loginMutate(data);
    }

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center gap-2">
                                    <a
                                        href="#"
                                        className="flex flex-col items-center gap-2 font-medium"
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-md">
                                            <LayoutDashboard className="size-6" />
                                        </div>
                                        <span className="sr-only">Acme Inc.</span>
                                    </a>
                                    <h1 className="text-xl font-bold text-center">Selamat datang di Dashboard <br /> Dinas Perindustrian dan Perdagangan <br /> (DISPERDAGIN)</h1>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Username</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" placeholder="******" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button type="submit" disabled={isPending}>
                                        {isPending ? "Logging in..." : "Login"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}