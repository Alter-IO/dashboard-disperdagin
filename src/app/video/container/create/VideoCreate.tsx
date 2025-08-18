import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { useCreateVideo } from "../../usecase/useCreateVideo";
import { IPostPutVideo } from "@/shared/models/video";

const FormSchema = z.object({
    title: z.string({
        required_error: "Judul wajib di isi"
    }).min(3, "Judul minimal 3 karakter"),
    link: z.string({
        required_error: "Link video wajib di isi"
    }).url("Format link harus berupa URL yang valid"),
    description: z.string({
        required_error: "Deskripsi wajib di isi"
    }).min(10, "Deskripsi minimal 10 karakter"),
});

export const VideoCreateContainer = () => {
    const admin = JSON.parse(localStorage.getItem('admin')!);
    const { mutate: createVideo, isPending } = useCreateVideo();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: '',
            link: '',
            description: '',
        }
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const payload: IPostPutVideo = {
            title: data.title,
            link: data.link,
            description: data.description,
            author: admin.username,
        }
        createVideo(payload)
    }

    return (
        <Card className="m-4">
            <CardHeader>
                <CardTitle>Tambah Video</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-[150px_1fr] gap-x-4 gap-y-4 items-start">
                            <FormLabel className="mt-2 text-sm">Judul</FormLabel>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="max-w-[600px] w-full gap-1">
                                        <FormControl>
                                            <Input {...field} placeholder="Masukkan judul video" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormLabel className="mt-2 text-sm">Link Video</FormLabel>
                            <FormField
                                control={form.control}
                                name="link"
                                render={({ field }) => (
                                    <FormItem className="max-w-[600px] w-full gap-1">
                                        <FormControl>
                                            <Input {...field} placeholder="https://youtube.com/watch?v=..." />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormLabel className="mt-2 text-sm">Deskripsi</FormLabel>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="max-w-[600px] w-full gap-1">
                                        <FormControl>
                                            <Textarea {...field} placeholder="Masukkan deskripsi video" rows={4} />
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