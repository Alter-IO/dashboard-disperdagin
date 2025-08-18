import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ErrorBoundary } from "@/shared/view/ErrorBoundary";
import { DataTable } from "@/shared/view/table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { columns } from "./_column";
import { DeleteConfirmationModal } from "@/shared/view/DeleteConfirmationModal";
import { useDeleteVideo } from "./usecase/useDeleteVideo";
import { GetVideos } from "@/shared/repositories/video";

const VideoContainer = () => {
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const { data: videos, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['videos'],
        queryFn: GetVideos,
    })

    const { mutate: deleteVideo } = useDeleteVideo();
    const handleDelete = async () => {
        if (!selectedId) return;
        deleteVideo(selectedId);
    }

    if (isError) {
        return <ErrorBoundary errorMsg={error?.message} refetch={refetch} />
    }

    return (
        <Card className="m-4">
            <CardHeader>
                <CardTitle>Daftar Video</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={columns(setOpen, setSelectedId)}
                    data={videos?.data ?? []}
                    filter="title"
                    linkCreate="/video/create"
                    isLoading={isLoading}
                />
                <DeleteConfirmationModal 
                    open={open} 
                    onOpenChange={setOpen} 
                    onConfirm={handleDelete} 
                    msg={`video dengan id ${selectedId}`} 
                />
            </CardContent>
        </Card>
    )
}

export default VideoContainer;