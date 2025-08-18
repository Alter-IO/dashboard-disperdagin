import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { IPostPutPhotoCategory } from "@/shared/models/photo-category";
import { GetPhotoCategory } from "@/shared/repositories/photo-category";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/shared/view/LoadingSpinner";
import { ErrorBoundary } from "@/shared/view/ErrorBoundary";
import { useEditPhotoCategory } from "../../usecase/useEditPhotoCategory";

const FormSchema = z.object({
    category: z.string({
        required_error: "Nama kategori wajib di isi"
    }).min(3, "Nama kategori minimal 3 karakter"),
});

export const PhotoCategoryEditContainer = () => {
    const { id } = useParams();
    const admin = JSON.parse(localStorage.getItem('admin')!);
    const { mutate: updatePhotoCategory, isPending } = useEditPhotoCategory(id!);

    const {
        data: photoCategory,
        isPending: isPendingPhotoCategory,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: [`photo-category-${id}`],
        queryFn: () => GetPhotoCategory(id!),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        values: {
            category: photoCategory?.data.category || "",
        }
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const payload: IPostPutPhotoCategory = {
            category: data.category,
            author: admin.username,
        }
        updatePhotoCategory(payload)
    }

    if (isPendingPhotoCategory) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <ErrorBoundary errorMsg={error?.message} refetch={refetch} />;
    }

    return (
        <Card className="m-4">
            <CardHeader>
                <CardTitle>Edit Kategori Foto</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-[150px_1fr] gap-x-4 gap-y-2 items-center">
                            <FormLabel>Nama Kategori</FormLabel>
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem className="max-w-[600px] w-full gap-1">
                                        <FormControl>
                                            <Input {...field} placeholder="Masukkan nama kategori foto" />
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