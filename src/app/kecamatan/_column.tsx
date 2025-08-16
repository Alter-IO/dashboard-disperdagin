import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IKecamatan } from "@/shared/models/kecamatan";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router";

export const columns = (setOpen: (open: boolean) => void, setSelectedId: (id: string | null) => void): ColumnDef<IKecamatan>[] => [
    {
        accessorKey: 'id',
        header: 'No',
        size: 40,
        cell: ({ row }) => {
            return <span>{row.index + 1}</span>;
        },
    },
    {
        id: 'name',
        accessorKey: 'name',
        header: 'Nama Kecamatan',
        size: 280,
    },
    {
        id: 'author',
        accessorKey: 'author',
        header: 'Pembuat',
        size: 120,
    },
    {
        id: 'created_at',
        accessorKey: 'created_at',
        header: 'Tanggal Dibuat',
        size: 150,
        cell: ({ row }) => {
            return new Date(row.original.created_at).toLocaleDateString('id-ID');
        },
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
                        <DropdownMenuItem onClick={() => navigate(`/kecamatan/${data.id}/edit`)}>Sunting</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setSelectedId(data.id); setOpen(true) }}>Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
]
