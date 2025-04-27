import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ErrorBoundary } from "@/shared/view/ErrorBoundary";
import { DataTable } from "@/shared/view/table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { columns } from "./_column";
import { DeleteConfirmationModal } from "@/shared/view/DeleteConfirmationModal";
import { useDeleteCommodity } from "./usecase/useDeleteCommodity";
import { GetCommodities } from "@/shared/repositories/commodity";

const CommodityContainer = () => {
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const { data: commodityTypes, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['commodities'],
        queryFn: GetCommodities,
    })

    const { mutate: deleteCommodityType } = useDeleteCommodity();
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
                <CardTitle>Daftar Komodity</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={columns(setOpen, setSelectedId)}
                    data={commodityTypes?.data ?? []}
                    filter="description"
                    linkCreate="/commodity/create"
                    isLoading={isLoading}
                />
                <DeleteConfirmationModal open={open} onOpenChange={setOpen} onConfirm={handleDelete} msg={`komoditas ini`} />
            </CardContent>
        </Card>
    )
}

export default CommodityContainer;