import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IUser } from "@/shared/models/user";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router";
import ResetPasswordDialog from "./container/reset-password/ResetPassword";

export const columns = (setOpen: (open: boolean) => void, setSelectedUsername: (username: string | null) => void): ColumnDef<IUser>[] => [
    {
        accessorKey: 'id',
        header: 'Id',
        size: 40,
        cell: ({ row }) => {
            return <span>{row.index + 1}</span>;
        },
    },
    {
        id: 'username',
        accessorKey: 'username',
        header: 'Username',
        size: 280,
    },
    {
        id: 'role',
        accessorKey: 'role_id',
        header: 'Role',
        size: 80,
    },
    {
        id: "actions",
        enableHiding: false,
        header: () => <div>Actions</div>,
        size: 150,
        cell: ({ row }) => {
            const navigate = useNavigate();
            const data = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <ResetPasswordDialog id={data.id} />
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate(`/user-management/${data.id}/edit`)}>Sunting</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setSelectedUsername(data.username); setOpen(true) }}>Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
]