import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { useCreateKecamatan } from "../../usecase/useCreateKecamatan";
import { IPostPutKecamatan } from "@/shared/models/kecamatan";

const FormSchema = z.object({
    name: z.string({
        required_error: "Nama kecamatan wajib di isi"
    }).min(3, "Nama kecamatan minimal 3 karakter"),
});

export const KecamatanCreateContainer = () => {
    const admin = JSON.parse(localStorage.getItem('admin')!);
    const { mutate: createKecamatan, isPending } = useCreateKecamatan();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
        }
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const payload: IPostPutKecamatan = {
            name: data.name,
            author: admin.username,
        }
        createKecamatan(payload)
    }

    return (
        <Card className="m-4">
            <CardHeader>
                <CardTitle>Tambah Kecamatan</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-[150px_1fr] gap-x-4 gap-y-2 items-center">
                            <FormLabel>Nama Kecamatan</FormLabel>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="max-w-[600px] w-full gap-1">
                                        <FormControl>
                                            <Input {...field} placeholder="Masukkan nama kecamatan" />
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