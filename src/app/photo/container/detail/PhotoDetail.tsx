import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { GetPhoto } from "@/shared/repositories/photo";
import { useParams } from "react-router";
import { LoadingSpinner } from "@/shared/view/LoadingSpinner";
import { ErrorBoundary } from "@/shared/view/ErrorBoundary";
import { Label } from "@/components/ui/label";
import { ExternalLink, Download } from "lucide-react";

const endpoint = import.meta.env.VITE_BACKEND_URL;

export const PhotoDetailContainer = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        data: photo,
        isPending,
        isError,
        error,
        refetch, } = useQuery({
            queryKey: [`photo-${id}`],
            queryFn: () => GetPhoto(id!),
        });

    if (isPending) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <ErrorBoundary errorMsg={error?.message} refetch={refetch} />;
    }

    const handleDownload = () => {
        if (photo.data.file_url) {
            const link = document.createElement('a');
            link.href = photo.data.file_url;
            link.download = photo.data.title || 'photo';
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <Card className="m-4">
            <CardHeader>
                <CardTitle>Detail Foto</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-y-4 gap-x-4 grid-cols-[150px_1fr] items-start max-w-4xl">
                    <Label>Kategori</Label>
                    <Input value={photo.data.category_name || '-'} readOnly />

                    <Label>Judul</Label>
                    <Input value={photo.data.title || '-'} readOnly />

                    <Label>File</Label>
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <Input value={photo.data.file_url || '-'} readOnly className="flex-1" />
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(`${endpoint}${photo.data.file_url}`, '_blank')}
                                className="shrink-0"
                            >
                                <ExternalLink className="h-4 w-4 mr-1" />
                                Buka
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleDownload}
                                className="shrink-0"
                            >
                                <Download className="h-4 w-4 mr-1" />
                                Download
                            </Button>
                        </div>
                        {photo.data.file_url && (
                            <div className="border rounded-lg p-4 bg-gray-50">
                                <img 
                                    src={`${endpoint}${photo.data.file_url}`} 
                                    alt={photo.data.title}
                                    className="max-w-full max-h-96 h-auto rounded-lg border bg-white"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgNzVDMTU4LjI4NCA3NSAxNjUgODEuNzE2IDE2NSA5MEM2NSA5OC4yODQgMTU4LjI4NCAxMDUgMTUwIDEwNUMxNDEuNzE2IDEwNSAxMzUgOTguMjg0IDEzNSA5MEMxMzUgODEuNzE2IDE0MS43MTYgNzUgMTUwIDc1WiIgZmlsbD0iIzk0OThBNCIvPgo8cGF0aCBkPSJNMjAwIDEyNUg5OUwxMjUgOTVMMTUwIDExNUwxNzUgOTVMMjAwIDEyNVoiIGZpbGw9IiM5NDk4QTQiLz4KPHRLEHT+eD0iMTUwIiB5PSIxNDAiIGZpbGw9IiM5NDk4QTQiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+R2FnYWwgbWVtdWF0IGdhbWJhcjwvdGV4dD4KPC9zdmc+';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <Label>Deskripsi</Label>
                    <Textarea value={photo.data.description || '-'} readOnly rows={4} />

                    <Label>Pembuat</Label>
                    <Input value={photo.data.author || '-'} readOnly />

                    <Label>Tanggal Dibuat</Label>
                    <Input value={new Date(photo.data.created_at).toLocaleDateString('id-ID') || '-'} readOnly />

                    
                </div>
                <div className="flex justify-end mt-4">
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => navigate('/photo')}
                    >
                        Kembali
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}