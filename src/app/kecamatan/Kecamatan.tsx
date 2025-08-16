import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ErrorBoundary } from "@/shared/view/ErrorBoundary";
import { DataTable } from "@/shared/view/table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { columns } from "./_column";
import { DeleteConfirmationModal } from "@/shared/view/DeleteConfirmationModal";
import { useDeleteKecamatan } from "./usecase/useDeleteKecamatan";
import { GetKecamatans } from "@/shared/repositories/kecamatan";

const KecamatanContainer = () => {
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const { data: kecamatans, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['kecamatans'],
        queryFn: GetKecamatans,
    })

    const { mutate: deleteKecamatan } = useDeleteKecamatan();
    const handleDelete = async () => {
        if (!selectedId) return;
        deleteKecamatan(selectedId);
    }

    if (isError) {
        return <ErrorBoundary errorMsg={error?.message} refetch={refetch} />
    }

    return (
        <Card className="m-4">
            <CardHeader>
                <CardTitle>Daftar Kecamatan</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={columns(setOpen, setSelectedId)}
                    data={kecamatans?.data ?? []}
                    filter="name"
                    linkCreate="/kecamatan/create"
                    isLoading={isLoading}
                />
                <DeleteConfirmationModal 
                    open={open} 
                    onOpenChange={setOpen} 
                    onConfirm={handleDelete} 
                    msg={`kecamatan dengan id ${selectedId}`} 
                />
            </CardContent>
        </Card>
    )
}

export default KecamatanContainer;