import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ErrorBoundary } from "@/shared/view/ErrorBoundary";
import { DataTable } from "@/shared/view/table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { columns } from "./_column";
import { DeleteConfirmationModal } from "@/shared/view/DeleteConfirmationModal";
import { useDeletePhotoCategory } from "./usecase/useDeletePhotoCategory";
import { GetPhotoCategories } from "@/shared/repositories/photo-category";

const PhotoCategoryContainer = () => {
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const { data: photoCategories, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['photo-categories'],
        queryFn: GetPhotoCategories,
    })

    const { mutate: deletePhotoCategory } = useDeletePhotoCategory();
    const handleDelete = async () => {
        if (!selectedId) return;
        deletePhotoCategory(selectedId);
    }

    if (isError) {
        return <ErrorBoundary errorMsg={error?.message} refetch={refetch} />
    }

    return (
        <Card className="m-4">
            <CardHeader>
                <CardTitle>Daftar Kategori Foto</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={columns(setOpen, setSelectedId)}
                    data={photoCategories?.data ?? []}
                    filter="category"
                    linkCreate="/photo-category/create"
                    isLoading={isLoading}
                />
                <DeleteConfirmationModal 
                    open={open} 
                    onOpenChange={setOpen} 
                    onConfirm={handleDelete} 
                    msg={`kategori foto dengan id ${selectedId}`} 
                />
            </CardContent>
        </Card>
    )
}

export default PhotoCategoryContainer;