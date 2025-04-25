import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { useCreateCommodityType } from "../../usecase/useCreateCommodityType";
import { IPostPutCommodityType } from "@/shared/models/commodity-type";

const FormSchema = z.object({
    description: z.string({
        required_error: "Deksripsi wajib di isi"
    }).min(3, "Deksripsi minimal 3 karakter"),
    author: z.string().optional(),
});

export const CommodityTypeCreateContainer = () => {
    const admin = JSON.parse(localStorage.getItem('admin')!);
    const { mutate: createCommodityType, isPending } = useCreateCommodityType();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            description: '',
            author: '',
        }
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const payload: IPostPutCommodityType = {
            description: data.description,
            author: admin.username,
        }
        createCommodityType(payload)
    }

    return (
        <Card className="m-4">
            <CardHeader>
                <CardTitle>Buat Tipe Kommodity</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-[150px_1fr] gap-x-4 gap-y-2 items-center">
                            <FormLabel>Dekspripsi</FormLabel>
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