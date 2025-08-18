import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { GetPhoto } from "@/shared/repositories/photo";
import { GetPhotoCategories } from "@/shared/repositories/photo-category";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/shared/view/LoadingSpinner";
import { ErrorBoundary } from "@/shared/view/ErrorBoundary";
import { useEditPhoto } from "../../usecase/useEditPhoto";
import { useState, useEffect, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

const endpoint = import.meta.env.VITE_BACKEND_URL;

const FormSchema = z.object({
    category_id: z.string({
        required_error: "Kategori wajib dipilih"
    }).min(1, "Kategori wajib dipilih"),
    title: z.string({
        required_error: "Judul wajib di isi"
    }).min(3, "Judul minimal 3 karakter"),
    file: z.instanceof(File).optional().refine((file) => {
        if (!file) return true; // Optional file
        return file.size <= 5 * 1024 * 1024; // 5MB
    }, "Ukuran file maksimal 5MB").refine((file) => {
        if (!file) return true; // Optional file
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        return allowedTypes.includes(file.type);
    }, "Format file harus berupa JPEG, PNG, atau WebP"),
    description: z.string({
        required_error: "Deskripsi wajib di isi"
    }).min(10, "Deskripsi minimal 10 karakter"),
});

export const PhotoEditContainer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const admin = JSON.parse(localStorage.getItem('admin')!);
    const { mutate: updatePhoto, isPending } = useEditPhoto(id!);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [isDragging, setIsDragging] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data: photoCategories, isPending: isPendingCategories } = useQuery({
        queryKey: ['photo-categories'],
        queryFn: GetPhotoCategories,
    });

    const {
        data: photo,
        isPending: isPendingPhoto,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: [`photo-${id}`],
        queryFn: () => GetPhoto(id!),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        values: {
            category_id: photo?.data.category_id || "",
            title: photo?.data.title || "",
            description: photo?.data.description || "",
        }
    })

    const watchFile = form.watch("file");

    // Set initial image URL when photo data loads
    useEffect(() => {
        if (photo?.data.file_url) {
            const fullImageUrl = `${endpoint}${photo.data.file_url}`;
            setCurrentImageUrl(fullImageUrl);
            setPreviewUrl(fullImageUrl);
        }
    }, [photo]);

    // Update preview when file changes
    useEffect(() => {
        if (watchFile) {
            const url = URL.createObjectURL(watchFile);
            setPreviewUrl(url);
            
            // Cleanup previous URL
            return () => URL.revokeObjectURL(url);
        } else if (currentImageUrl) {
            setPreviewUrl(currentImageUrl);
        } else {
            setPreviewUrl("");
        }
    }, [watchFile, currentImageUrl]);

    const handleFileSelect = (file: File) => {
        form.setValue("file", file);
        form.clearErrors("file");
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        
        const files = e.dataTransfer.files;
        if (files && files[0]) {
            handleFileSelect(files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            handleFileSelect(files[0]);
        }
    };

    const removeFile = () => {
        form.setValue("file", undefined);
        setPreviewUrl(currentImageUrl || "");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const formData = new FormData();
        formData.append('category_id', data.category_id);
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('author', admin.username);
        if (data.file) {
            formData.append('file', data.file);
        }
            
        updatePhoto(formData as any);
    }

    if (isPendingPhoto) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <ErrorBoundary errorMsg={error?.message} refetch={refetch} />;
    }

    return (
        <Card className="m-4">
            <CardHeader>
                <CardTitle>Edit Foto</CardTitle>
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

                            <FormLabel className="mt-2 text-sm">File Foto</FormLabel>
                            <div className="max-w-[600px] w-full space-y-3">
                                <FormField
                                    control={form.control}
                                    name="file"
                                    render={({ field: { onChange, value, ...field } }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <div className="space-y-4">
                                                    {/* File Upload Area */}
                                                    <div
                                                        className={`
                                                            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                                                            ${isDragging 
                                                                ? 'border-primary bg-primary/5' 
                                                                : 'border-gray-300 hover:border-primary/50'
                                                            }
                                                        `}
                                                        onDrop={handleDrop}
                                                        onDragOver={handleDragOver}
                                                        onDragLeave={handleDragLeave}
                                                        onClick={() => fileInputRef.current?.click()}
                                                    >
                                                        <input
                                                            {...field}
                                                            ref={fileInputRef}
                                                            type="file"
                                                            className="hidden"
                                                            accept="image/jpeg,image/jpg,image/png,image/webp"
                                                            onChange={handleFileInputChange}
                                                        />
                                                        
                                                        {!previewUrl ? (
                                                            <div className="space-y-2">
                                                                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                                                                <div className="text-sm text-gray-600">
                                                                    <span className="font-medium text-primary">Klik untuk upload</span> atau drag & drop
                                                                </div>
                                                                <div className="text-xs text-gray-500">
                                                                    PNG, JPG, JPEG, WebP hingga 5MB
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="relative">
                                                                <img 
                                                                    src={previewUrl} 
                                                                    alt="Preview"
                                                                    className="max-w-full max-h-64 mx-auto rounded-md"
                                                                    onError={(e) => {
                                                                        const target = e.target as HTMLImageElement;
                                                                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgNzVDMTU4LjI4NCA3NSAxNjUgODEuNzE2IDE2NSA5MEM2NSA5OC4yODQgMTU4LjI4NCAxMDUgMTUwIDEwNUMxNDEuNzE2IDEwNSAxMzUgOTguMjg0IDEzNSA5MEMxMzUgODEuNzE2IDE0MS43MTYgNzUgMTUwIDc1WiIgZmlsbD0iIzk0OThBNCIvPgo8cGF0aCBkPSJNMjAwIDEyNUg5OUwxMjUgOTVMMTUwIDExNUwxNzUgOTVMMjAwIDEyNVoiIGZpbGw9IiM5NDk4QTQiLz4KPHRLEHT+eD0iMTUwIiB5PSIxNDAiIGZpbGw9IiM5NDk4QTQiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+R2FnYWwgbWVtdWF0IGdhbWJhcjwvdGV4dD4KPC9zdmc+';
                                                                    }}
                                                                />
                                                                {watchFile && (
                                                                    <Button
                                                                        type="button"
                                                                        variant="destructive"
                                                                        size="sm"
                                                                        className="absolute top-2 right-2"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            removeFile();
                                                                        }}
                                                                    >
                                                                        <X className="h-4 w-4" />
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* File Info */}
                                                    {watchFile && (
                                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                                                            <ImageIcon className="h-5 w-5 text-gray-500" />
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                                    {watchFile.name}
                                                                </p>
                                                                <p className="text-xs text-gray-500">
                                                                    {(watchFile.size / 1024 / 1024).toFixed(2)} MB
                                                                </p>
                                                            </div>
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={removeFile}
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    )}

                                                    {/* Current Image Info */}
                                                    {!watchFile && currentImageUrl && (
                                                        <div className="text-xs text-gray-500 text-center">
                                                            Gambar saat ini. Upload file baru untuk menggantinya.
                                                        </div>
                                                    )}
                                                </div>
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
                                            <Textarea {...field} placeholder="Masukkan deskripsi foto" rows={4} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => navigate('/photo')}
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
    );
}