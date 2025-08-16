import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { IPostPutKecamatan } from "@/shared/models/kecamatan";
import { GetKecamatan } from "@/shared/repositories/kecamatan";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/shared/view/LoadingSpinner";
import { ErrorBoundary } from "@/shared/view/ErrorBoundary";
import { useEditKecamatan } from "../../usecase/useEditKecamatan";

const FormSchema = z.object({
    urutan: z.string({
        required_error: "Nama kecamatan wajib di isi"
    }).min(3, "Nama kecamatan minimal 3 karakter"),
});

export const KecamatanEditContainer = () => {
    const { id } = useParams();
    const admin = JSON.parse(localStorage.getItem('admin')!);
    const { mutate: updateKecamatan, isPending } = useEditKecamatan(id!);

    const {
        data: kecamatan,
        isPending: isPendingKecamatan,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: [`kecamatan-${id}`],
        queryFn: () => GetKecamatan(id!),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        values: {
            urutan: kecamatan?.data.name || "",
        }
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const payload: IPostPutKecamatan = {
            name: data.name,
            author: admin.username,
        }
        updateKecamatan(payload)
    }

    if (isPendingKecamatan) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <ErrorBoundary errorMsg={error?.message} refetch={refetch} />;
    }

    return (
        <Card className="m-4">
            <CardHeader>
                <CardTitle>Edit Kecamatan</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-[150px_1fr] gap-x-4 gap-y-2 items-center">
                            <FormLabel>Nama Kecamatan</FormLabel>
                            <FormField
                                control={form.control}
                                name="urutan"
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
                                {isPending ? 'Sedang Mengupdate' : 'Update'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}