import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetUsers } from "@/shared/repositories/user";
import { ErrorBoundary } from "@/shared/view/ErrorBoundary";
import { DataTable } from "@/shared/view/table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./_column";

const UserManagementContainer = () => {
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
                    columns={columns()}
                    data={users?.data ?? []}
                    filter="username"
                    linkCreate="/user-management/create"
                    isLoading={isLoading}
                />
            </CardContent>
        </Card>
    )
}

export default UserManagementContainer;