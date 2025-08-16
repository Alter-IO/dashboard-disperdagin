import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { useCreateKelurahan } from "../../usecase/useCreateKelurahan";
import { IPostPutKelurahan } from "@/shared/models/kelurahan";
import { useQuery } from "@tanstack/react-query";
import { GetKecamatans } from "@/shared/repositories/kecamatan";

const FormSchema = z.object({
    subdistrict_id: z.string({
        required_error: "Kecamatan wajib dipilih"
    }).min(1, "Kecamatan wajib dipilih"),
    name: z.string({
        required_error: "Nama kelurahan wajib di isi"
    }).min(3, "Nama kelurahan minimal 3 karakter"),
});

export const KelurahanCreateContainer = () => {
    const admin = JSON.parse(localStorage.getItem('admin')!);
    const { mutate: createKelurahan, isPending } = useCreateKelurahan();

    const { data: kecamatans, isPending: isPendingKecamatan } = useQuery({
        queryKey: ['kecamatans'],
        queryFn: GetKecamatans,
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            subdistrict_id: '',
            name: '',
        }
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const payload: IPostPutKelurahan = {
            subdistrict_id: data.subdistrict_id,
            name: data.name,
            author: admin.username,
        }
        createKelurahan(payload)
    }

    return (
        <Card className="m-4">
            <CardHeader>
                <CardTitle>Tambah Kelurahan</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-[150px_1fr] gap-x-4 gap-y-4 items-start">
                            <FormLabel className="mt-2 text-sm">Kecamatan</FormLabel>
                            <FormField
                                control={form.control}
                                name="subdistrict_id"
                                render={({ field }) => (
                                    <FormItem className="max-w-[600px] w-full">
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}>
                                                <SelectTrigger disabled={isPendingKecamatan}>
                                                    <SelectValue
                                                        placeholder={
                                                            isPendingKecamatan ? 'Memuat...' : 'Pilih Kecamatan'
                                                        }
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {kecamatans?.data &&
                                                        kecamatans.data.length > 0 ? (
                                                        kecamatans.data.map((kecamatan) => (
                                                            <SelectItem key={kecamatan.id} value={kecamatan.id.toString()}>
                                                                {kecamatan.name}
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
                            
                            <FormLabel className="mt-2 text-sm">Nama Kelurahan</FormLabel>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="max-w-[600px] w-full gap-1">
                                        <FormControl>
                                            <Input {...field} placeholder="Masukkan nama kelurahan" />
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