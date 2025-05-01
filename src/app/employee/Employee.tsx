import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ErrorBoundary } from "@/shared/view/ErrorBoundary";
import { DataTable } from "@/shared/view/table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DeleteConfirmationModal } from "@/shared/view/DeleteConfirmationModal";
import { useDeleteCommodity } from "./usecase/useDeleteCommodity";
import { columns } from "./_column";
import { GetEmployees } from "@/shared/repositories/employee";
import { EmployeeFilterContainer } from "./container/filter/EmployeeFilter";

const EmployeeContainer = () => {
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const { data: employees, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['employees'],
        queryFn: GetEmployees,
    })

    const { mutate: deleteEmployee } = useDeleteCommodity();
    const handleDelete = async () => {
        if (!selectedId) return;
        deleteEmployee(selectedId);
    }

    if (isError) {
        return <ErrorBoundary errorMsg={error?.message} refetch={refetch} />
    }

    return (
        <Card className="m-4">
            <CardHeader>
                <CardTitle>Daftar Pegawai</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={columns(setOpen, setSelectedId)}
                    data={employees?.data ?? []}
                    filter="name"
                    linkCreate="/employee/create"
                    isLoading={isLoading}
                    filterComponent={<EmployeeFilterContainer />}
                />
                <DeleteConfirmationModal open={open} onOpenChange={setOpen} onConfirm={handleDelete} msg={`komoditas ini`} />
            </CardContent>
        </Card>
    )
}

export default EmployeeContainer;