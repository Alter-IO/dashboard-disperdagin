import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IVideo } from "@/shared/models/video";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router";

export const columns = (setOpen: (open: boolean) => void, setSelectedId: (id: string | null) => void): ColumnDef<IVideo>[] => [
    {
        accessorKey: 'id',
        header: 'No',
        size: 40,
        cell: ({ row }) => {
            return <span>{row.index + 1}</span>;
        },
    },
    {
        id: 'title',
        accessorKey: 'title',
        header: 'Judul',
        size: 200,
    },
    {
        id: 'link',
        accessorKey: 'link',
        header: 'Link',
        size: 200,
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <span className="max-w-[150px] truncate" title={row.original.link}>
                        {row.original.link}
                    </span>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(row.original.link, '_blank')}
                        className="h-6 w-6 p-0"
                    >
                        <ExternalLink className="h-3 w-3" />
                    </Button>
                </div>
            );
        },
    },
    {
        id: 'description',
        accessorKey: 'description',
        header: 'Deskripsi',
        size: 200,
        cell: ({ row }) => {
            return (
                <div className="max-w-[200px] truncate" title={row.original.description}>
                    {row.original.description}
                </div>
            );
        },
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
                        <DropdownMenuItem onClick={() => navigate(`/video/${data.id}/detail`)}>Detail</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/video/${data.id}/edit`)}>Sunting</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setSelectedId(data.id); setOpen(true) }}>Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
]