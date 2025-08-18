import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ErrorBoundary } from "@/shared/view/ErrorBoundary";
import { DataTable } from "@/shared/view/table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { columns } from "./_column";
import { DeleteConfirmationModal } from "@/shared/view/DeleteConfirmationModal";
import { useDeletePhoto } from "./usecase/useDeletePhoto";
import { GetPhotos } from "@/shared/repositories/photo";

const PhotoContainer = () => {
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const { data: photos, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['photos'],
        queryFn: GetPhotos,
    })

    const { mutate: deletePhoto } = useDeletePhoto();
    const handleDelete = async () => {
        if (!selectedId) return;
        deletePhoto(selectedId);
    }

    if (isError) {
        return <ErrorBoundary errorMsg={error?.message} refetch={refetch} />
    }

    return (
        <Card className="m-4">
            <CardHeader>
                <CardTitle>Daftar Foto</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={columns(setOpen, setSelectedId)}
                    data={photos?.data ?? []}
                    filter="title"
                    linkCreate="/photo/create"
                    isLoading={isLoading}
                />
                <DeleteConfirmationModal 
                    open={open} 
                    onOpenChange={setOpen} 
                    onConfirm={handleDelete} 
                    msg={`foto dengan id ${selectedId}`} 
                />
            </CardContent>
        </Card>
    )
}

export default PhotoContainer;