import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ErrorBoundary } from "@/shared/view/ErrorBoundary";
import { DataTable } from "@/shared/view/table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { columns } from "./_column";
import { DeleteConfirmationModal } from "@/shared/view/DeleteConfirmationModal";
import { useDeleteKelurahan } from "./usecase/useDeleteKelurahan";
import { GetKelurahans } from "@/shared/repositories/kelurahan";

const KelurahanContainer = () => {
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const { data: kelurahans, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['kelurahans'],
        queryFn: GetKelurahans,
    })

    const { mutate: deleteKelurahan } = useDeleteKelurahan();
    const handleDelete = async () => {
        if (!selectedId) return;
        deleteKelurahan(selectedId);
    }

    if (isError) {
        return <ErrorBoundary errorMsg={error?.message} refetch={refetch} />
    }

    return (
        <Card className="m-4">
            <CardHeader>
                <CardTitle>Daftar Kelurahan</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={columns(setOpen, setSelectedId)}
                    data={kelurahans?.data ?? []}
                    filter="name"
                    linkCreate="/kelurahan/create"
                    isLoading={isLoading}
                />
                <DeleteConfirmationModal 
                    open={open} 
                    onOpenChange={setOpen} 
                    onConfirm={handleDelete} 
                    msg={`kelurahan dengan id ${selectedId}`} 
                />
            </CardContent>
        </Card>
    )
}

export default KelurahanContainer;