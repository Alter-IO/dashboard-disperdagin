import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IEmployee } from "@/shared/models/employee";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router";

export const columns = (setOpen: (open: boolean) => void, setSelectedId: (id: string | null) => void): ColumnDef<IEmployee>[] => [
    {
        accessorKey: 'id',
        header: 'Id',
        size: 40,
        cell: ({ row }) => {
            return <span>{row.index + 1}</span>;
        },
    },
    {
        id: 'employee_id',
        accessorKey: 'employee_id',
        header: 'Id Pegawai',
    },
    {
        id: 'name',
        accessorKey: 'name',
        header: 'Nama',
    },
    {
        id: 'position',
        accessorKey: 'position',
        header: 'Jabatan',
    },
    {
        id: 'status',
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            return <span>{row.original.status === 1 ? "Aktif" : "Tidak Aktif"}</span>
        }
    },
    {
        id: 'author',
        accessorKey: 'author',
        header: 'Pembuat',
    },
    {
        id: "actions",
        enableHiding: false,
        header: () => <div>Tindakan</div>,
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
                        <DropdownMenuItem onClick={() => navigate(`/employee/${data.id}/detail`)}>Detail</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/employee/${data.id}/edit`)}>Sunting</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setSelectedId(data.id); setOpen(true) }}>Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
]