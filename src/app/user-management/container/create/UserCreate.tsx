import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GetRoles } from "@/shared/repositories/role";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { useCreateUser } from "../../usecase/useCreateUser";
import { IPostUser } from "@/shared/models/user";

const FormSchema = z.object({
    role_id: z.string({
        required_error: "Role wajib di isi"
    }).min(1),
    username: z.string({
        required_error: "Username wajib di isi"
    })
        .min(3, "Username minimal 3 karakter")
        .max(32, "Username maksimal 32 karakter")
        .regex(/^[a-zA-Z0-9]+$/, "Username hanya boleh mengandung huruf a-z, A-Z, dan angka 0-9")
        .regex(/^\S*$/, "Username tidak boleh mengandung spasi"),
    password: z.string({
        required_error: "Password wajib di isi"
    })
        .min(6, "Password minimal 6 karakter")
        .max(32, "Password maksimal 32 karakter"),
    confirm_password: z.string({
        required_error: "Konfirmasi password wajib di isi"
    }),
}).refine((data) => data.password === data.confirm_password, {
    message: "Password dan konfirmasi password tidak cocok",
    path: ["confirm_password"],
});

export const UserCreateContainer = () => {
    const { mutate: createUser, isPending } = useCreateUser();

    const { data: roles, isPending: isPendingRole } = useQuery({
        queryKey: ['roles'],
        queryFn: GetRoles,
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            role_id: '',
            username: '',
            password: '',
        }
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const payload: IPostUser = {
            role_id: data.role_id,
            username: data.username,
            password: data.password,
        }
        createUser(payload)
    }

    return (
        <Card className="m-4">
            <CardHeader>
                <CardTitle>Buat User</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-[150px_1fr] gap-x-4 gap-y-2 items-center">
                            <FormLabel>Username</FormLabel>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem className="max-w-[600px] w-full gap-1">
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormLabel>Password</FormLabel>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="max-w-[600px] w-full gap-1">
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormLabel>Konfirmasi Password</FormLabel>
                            <FormField
                                control={form.control}
                                name="confirm_password"
                                render={({ field }) => (
                                    <FormItem className="max-w-[600px] w-full gap-1">
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormLabel>Role</FormLabel>
                            <FormField
                                control={form.control}
                                name="role_id"
                                render={({ field }) => (
                                    <FormItem className="max-w-[600px] w-full">
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}>
                                                <SelectTrigger disabled={isPendingRole}>
                                                    <SelectValue
                                                        placeholder={
                                                            isPendingRole ? 'Memuat...' : 'Pilih Role'
                                                        }
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {roles?.data &&
                                                        roles.data.length > 0 ? (
                                                        roles.data.map((role) => (
                                                            <SelectItem key={role.id} value={role.id.toString()}>
                                                                {role.name}
                                                            </SelectItem>
                                                        ))
                                                    ) : (
                                                        <SelectItem disabled value="no-data">
                                                            Tidak ada data
                                                        </SelectItem>
                                                    )
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={isPending}>
                                {isPending ? 'Sedang Menambahkan' : 'Tambah'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}