import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { GetVideo } from "@/shared/repositories/video";
import { useParams } from "react-router";
import { LoadingSpinner } from "@/shared/view/LoadingSpinner";
import { ErrorBoundary } from "@/shared/view/ErrorBoundary";
import { Label } from "@/components/ui/label";
import { ExternalLink } from "lucide-react";

export const VideoDetailContainer = () => {
    const { id } = useParams();

    const {
        data: video,
        isPending,
        isError,
        error,
        refetch, } = useQuery({
            queryKey: [`video-${id}`],
            queryFn: () => GetVideo(id!),
        });

    if (isPending) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <ErrorBoundary errorMsg={error?.message} refetch={refetch} />;
    }

    return (
        <Card className="m-4">
            <CardHeader>
                <CardTitle>Detail Video</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-y-4 gap-x-4 grid-cols-[150px_1fr] items-start max-w-3xl">
                    <Label>Judul</Label>
                    <Input value={video.data.title || '-'} readOnly />

                    <Label>Link</Label>
                    <div className="flex gap-2">
                        <Input value={video.data.link || '-'} readOnly />
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(video.data.link, '_blank')}
                            className="shrink-0"
                        >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Buka
                        </Button>
                    </div>

                    <Label>Deskripsi</Label>
                    <Textarea value={video.data.description || '-'} readOnly rows={4} />

                    <Label>Pembuat</Label>
                    <Input value={video.data.author || '-'} readOnly />

                    <Label>Tanggal Dibuat</Label>
                    <Input value={new Date(video.data.created_at).toLocaleDateString('id-ID') || '-'} readOnly />
                </div>
            </CardContent>
        </Card>
    )
}