import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GetCommodityTypes } from "@/shared/repositories/commodity-type";
import { ErrorBoundary } from "@/shared/view/ErrorBoundary";
import { DataTable } from "@/shared/view/table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { columns } from "./_column";
import { DeleteConfirmationModal } from "@/shared/view/DeleteConfirmationModal";
import { useDeleteCommodityType } from "./usecase/useDeleteCommodityType";

const CommodityTypesContainer = () => {
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const { data: commodityTypes, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['commodity-types'],
        queryFn: GetCommodityTypes,
    })

    const { mutate: deleteCommodityType } = useDeleteCommodityType();
    const handleDelete = async () => {
        if (!selectedId) return;
        deleteCommodityType(selectedId);
    }

    if (isError) {
        return <ErrorBoundary errorMsg={error?.message} refetch={refetch} />
    }

    return (
        <Card className="m-4">
            <CardHeader>
                <CardTitle>Daftar Tipe Komodity</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={columns(setOpen, setSelectedId)}
                    data={commodityTypes?.data ?? []}
                    filter="description"
                    linkCreate="/commodity-type/create"
                    isLoading={isLoading}
                />
                <DeleteConfirmationModal open={open} onOpenChange={setOpen} onConfirm={handleDelete} msg={`tipe komoditas dengan id ${selectedId}`} />
            </CardContent>
        </Card>
    )
}

export default CommodityTypesContainer;