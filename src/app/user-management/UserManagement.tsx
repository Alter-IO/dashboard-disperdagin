import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetUsers } from "@/shared/repositories/user";
import { ErrorBoundary } from "@/shared/view/ErrorBoundary";
import { DataTable } from "@/shared/view/table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./_column";
import { useDeleteUser } from "./usecase/useDeleteUser";
import { useState } from "react";
import { DeleteConfirmationModal } from "@/shared/view/DeleteConfirmationModal";

const UserManagementContainer = () => {
    const [open, setOpen] = useState(false);
    const [selectedUsername, setSelectedUsername] = useState<string | null>(null);

    const {
        data: users,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['users'],
        queryFn: GetUsers,
    });

    const { mutate: deleteUser } = useDeleteUser();
    const handleDelete = async () => {
        if (!selectedUsername) return;
        deleteUser(selectedUsername);
    }

    if (isError) {
        return <ErrorBoundary errorMsg={error?.message} refetch={refetch} />;
    }

    return (
        <Card className="m-4">
            <CardHeader>
                <CardTitle>Daftar User</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={columns(setOpen, setSelectedUsername)}
                    data={users?.data ?? []}
                    filter="username"
                    linkCreate="/user-management/create"
                    isLoading={isLoading}
                />
                <DeleteConfirmationModal open={open} onOpenChange={setOpen} onConfirm={handleDelete} msg={`user dengan username ${selectedUsername}`} />
            </CardContent>
        </Card>
    )
}

export default UserManagementContainer;