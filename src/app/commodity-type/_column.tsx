import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ICommodityType } from "@/shared/models/commodity-type";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router";

export const columns = (setOpen: (open: boolean) => void, setSelectedId: (id: string | null) => void): ColumnDef<ICommodityType>[] => [
    {
        accessorKey: 'id',
        header: 'Id',
        size: 40,
        cell: ({ row }) => {
            return <span>{row.index + 1}</span>;
        },
    },
    {
        id: 'description',
        accessorKey: 'description',
        header: 'Deskripsi',
        size: 280,
    },
    {
        id: 'author',
        accessorKey: 'author',
        header: 'Pembuat',
        size: 80,
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
                        <DropdownMenuItem onClick={() => navigate(`/commodity-type/${data.id}/edit`)}>Sunting</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setSelectedId(data.id); setOpen(true) }}>Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
]