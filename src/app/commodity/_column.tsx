import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ICommodity } from "@/shared/models/commodity";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router";

export const columns = (setOpen: (open: boolean) => void, setSelectedId: (id: string | null) => void): ColumnDef<ICommodity>[] => [
    {
        accessorKey: 'id',
        header: 'Id',
        size: 40,
        cell: ({ row }) => {
            return <span>{row.index + 1}</span>;
        },
    },
    {
        id: 'name',
        accessorKey: 'name',
        header: 'Nama',
    },
    {
        id: 'price',
        accessorKey: 'price',
        header: 'Harga',
    },
    {
        id: 'unit',
        accessorKey: 'unit',
        header: 'Satuan',
    },
    {
        id: 'publish_date',
        accessorKey: 'publish_date',
        header: 'Tanggal Publikasi',
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
                        <DropdownMenuItem onClick={() => navigate(`/commodity/${data.id}/detail`)}>Detail</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/commodity/${data.id}/edit`)}>Sunting</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setSelectedId(data.id); setOpen(true) }}>Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
]