import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { IPostPutCommodity } from "@/shared/models/commodity";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { useCreateCommodity } from "../../usecase/useCreateCommodity";
import { GetCommodityTypes } from "@/shared/repositories/commodity-type";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { FormatIDR } from "@/shared/usecases/formatter";
import { useNavigate } from "react-router";

export const FormSchema = z.object({
    commodity_type_id: z.string({
        required_error: "Jenis komoditas wajib dipilih",
    }).min(1, "Tipe komoditas wajib dipilih"),

    name: z.string({
        required_error: "Nama wajib diisi",
    }).min(3, "Nama minimal 3 karakter"),

    price: z.coerce.number({
        required_error: "Harga wajib diisi",
        invalid_type_error: "Harga harus berupa angka",
    }).nonnegative("Harga tidak boleh negatif"),

    unit: z.string({
        required_error: "Satuan wajib dipilih",
    }).min(1, "Satuan tidak boleh kosong"),

    publish_date: z.date({
        required_error: "Tanggal publikasi wajib diisi",
    }),

    description: z.string({
        required_error: "Deskripsi wajib diisi",
    }).min(3, "Deskripsi minimal 3 karakter"),
    author: z.string().optional(),
});
export const CommodityCreateContainer = () => {
    const navigate = useNavigate();
    const admin = JSON.parse(localStorage.getItem('admin')!);
    const { mutate: createCommodity, isPending } = useCreateCommodity();

    const { data: commodityTypes, isPending: isPendingCT } = useQuery({
        queryKey: ['commodity-types'],
        queryFn: GetCommodityTypes,
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            author: "",
            commodity_type_id: "",
            description: "",
            name: "",
            price: 0,
            publish_date: new Date(),
            unit: "",
        }
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const payload: IPostPutCommodity = {
            commodity_type_id: data.commodity_type_id,
            name: data.name,
            price: data.price,
            publish_date: data.publish_date.toISOString().split('T')[0], // format: YYYY-MM-DD
            description: data.description,
            unit: data.unit,
            author: admin.username,
        }
        createCommodity(payload)
    }

    return (
        <Card className="m-4">
            <CardHeader>
                <CardTitle>Buat Kommodity</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-[150px_1fr] gap-x-4 gap-y-4 items-start">
                            <FormLabel className="mt-2 text-sm">Tipe Komoditas</FormLabel>
                            <FormField
                                control={form.control}
                                name="commodity_type_id"
                                render={({ field }) => (
                                    <FormItem className="max-w-[600px] w-full">
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}>
                                                <SelectTrigger disabled={isPendingCT}>
                                                    <SelectValue
                                                        placeholder={
                                                            isPendingCT ? 'Memuat...' : 'Pilih Tipe Komoditas'
                                                        }
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {commodityTypes?.data &&
                                                        commodityTypes.data.length > 0 ? (
                                                        commodityTypes.data.map((commodityType) => (
                                                            <SelectItem key={commodityType.id} value={commodityType.id.toString()}>
                                                                {commodityType.description}
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
                            <FormLabel className="mt-2 text-sm">Nama</FormLabel>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="max-w-[600px] w-full gap-1">
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormLabel className="mt-2 text-sm">Harga / Satuan</FormLabel>
                            <div className="flex max-w-[600px] w-full gap-2">
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    value={FormatIDR(field.value || 0)}
                                                    onChange={(e) => {
                                                        const rawValue = e.target.value.replace(/\D/g, '');
                                                        const parsedValue = rawValue ? parseInt(rawValue, 10) : 0;
                                                        field.onChange(parsedValue);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center">/</div>
                                <FormField
                                    control={form.control}
                                    name="unit"
                                    render={({ field }) => (
                                        <FormItem className="w-[280px]">
                                            <FormControl>
                                                <Input {...field} placeholder="kg" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormLabel className="mt-2 text-sm">Deskripsi</FormLabel>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="max-w-[600px] w-full gap-1">
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormLabel>Tanggal Pengajuan</FormLabel>
                            <FormField
                                control={form.control}
                                name="publish_date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={'outline'}
                                                        className={cn(
                                                            'w-[240px] pl-3 text-left font-normal',
                                                            !field.value && 'text-muted-foreground'
                                                        )}>
                                                        {field.value ? (
                                                            format(field.value, 'PPP')
                                                        ) : (
                                                            <span>Pilih Tanggal Pengajuan</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value || undefined}
                                                    onSelect={(date) => field.onChange(date || null)}
                                                    disabled={(date) => date < new Date('1900-01-01')}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => navigate('/commodity')}
                            >
                                Kembali
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? 'Sedang Mengupdate' : 'Update'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}