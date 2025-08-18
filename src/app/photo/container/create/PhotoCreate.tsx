import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { useCreatePhoto } from "../../usecase/useCreatePhoto";
import { IPostPutPhoto } from "@/shared/models/photo";
import { useQuery } from "@tanstack/react-query";
import { GetPhotoCategories } from "@/shared/repositories/photo-category";
import { useEffect, useState } from "react";

const FormSchema = z.object({
    category_id: z.string({
        required_error: "Kategori wajib dipilih"
    }).min(1, "Kategori wajib dipilih"),
    title: z.string({
        required_error: "Judul wajib di isi"
    }).min(3, "Judul minimal 3 karakter"),
    file_url: z.string({
        required_error: "File foto wajib di isi"
    }).url("Format file harus berupa URL yang valid"),
    description: z.string({
        required_error: "Deskripsi wajib di isi"
    }).min(10, "Deskripsi minimal 10 karakter"),
});

export const PhotoCreateContainer = () => {
    const admin = JSON.parse(localStorage.getItem('admin')!);
    const { mutate: createPhoto, isPending } = useCreatePhoto();
    const [previewUrl, setPreviewUrl] = useState<string>("");

    const { data: photoCategories, isPending: isPendingCategories } = useQuery({
        queryKey: ['photo-categories'],
        queryFn: GetPhotoCategories,
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            category_id: '',
            title: '',
            file_url: '',
            description: '',
        }
    })

    const watchFile = form.watch("file_url");

    // Update preview when file URL changes
    useEffect(() => {
        if (watchFile && watchFile.startsWith('http')) {
            setPreviewUrl(watchFile);
        } else {
            setPreviewUrl("");
        }
    }, [watchFile]);

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const payload: IPostPutPhoto = {
            category_id: data.category_id,
            title: data.title,
            file_url: data.file_url,
            description: data.description,
            author: admin.username,
        }
        createPhoto(payload)
    }

    return (
        <Card className="m-4">
            <CardHeader>
                <CardTitle>Tambah Foto</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-[150px_1fr] gap-x-4 gap-y-4 items-start">
                            <FormLabel className="mt-2 text-sm">Kategori</FormLabel>
                            <FormField
                                control={form.control}
                                name="category_id"
                                render={({ field }) => (
                                    <FormItem className="max-w-[600px] w-full">
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}>
                                                <SelectTrigger disabled={isPendingCategories}>
                                                    <SelectValue
                                                        placeholder={
                                                            isPendingCategories ? 'Memuat...' : 'Pilih Kategori'
                                                        }
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {photoCategories?.data &&
                                                        photoCategories.data.length > 0 ? (
                                                        photoCategories.data.map((category) => (
                                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                                {category.category}
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
                            
                            <FormLabel className="mt-2 text-sm">Judul</FormLabel>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="max-w-[600px] w-full gap-1">
                                        <FormControl>
                                            <Input {...field} placeholder="Masukkan judul foto" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormLabel className="mt-2 text-sm">URL File</FormLabel>
                            <div className="max-w-[600px] w-full space-y-3">
                                <FormField
                                    control={form.control}
                                    name="file_url"
                                    render={({ field }) => (
                                        <FormItem className="w-full gap-1">
                                            <FormControl>
                                                <Input 
                                                    {...field} 
                                                    placeholder="https://example.com/photo.jpg"
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setPreviewUrl(e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {previewUrl && (
                                    <div className="border rounded-lg p-3 bg-gray-50">
                                        <p className="text-sm text-gray-600 mb-2">Preview:</p>
                                        <img 
                                            src={previewUrl} 
                                            alt="Preview"
                                            className="max-w-xs h-auto rounded-md border"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                            }}
                                            onLoad={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'block';
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            <FormLabel className="mt-2 text-sm">Deskripsi</FormLabel>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="max-w-[600px] w-full gap-1">
                                        <FormControl>
                                            <Textarea {...field} placeholder="Masukkan deskripsi foto" rows={4} />
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