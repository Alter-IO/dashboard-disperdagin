import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IPhoto } from "@/shared/models/photo";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router";

const endpoint = import.meta.env.VITE_BACKEND_URL;

export const columns = (setOpen: (open: boolean) => void, setSelectedId: (id: string | null) => void): ColumnDef<IPhoto>[] => [
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
        id: 'category_name',
        accessorKey: 'category_name',
        header: 'Kategori',
        size: 150,
    },
    {
        id: 'file',
        accessorKey: 'file',
        header: 'File',
        size: 120,
        cell: ({ row }) => {
            console.log(row.original.file_url);
            console.log(endpoint);
            return (
                <img 
                    src={`${endpoint}${row.original.file_url}`} 
                    alt={row.original.title}
                    className="h-12 w-12 object-cover rounded-md"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAxNkMyNi4yMDkxIDE2IDI4IDE3Ljc5MDkgMjggMjBDMjggMjIuMjA5MSAyNi4yMDkxIDI0IDI0IDI0QzIxLjc5MDkgMjQgMjAgMjIuMjA5MSAyMCAyMEMyMCAxNy43OTA5IDIxLjc5MDkgMTYgMjQgMTZaIiBmaWxsPSIjOTQ5OEE0Ii8+CjxwYXRoIGQ9Ik0zMiAzMkgxNkwyMCAyNkwyNCAzMEwyOCAyNkwzMiAzMloiIGZpbGw9IiM5NDk4QTQiLz4KPC9zdmc+';
                    }}
                />
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
                        <DropdownMenuItem onClick={() => navigate(`/photo/${data.id}/detail`)}>Detail</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/photo/${data.id}/edit`)}>Sunting</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setSelectedId(data.id); setOpen(true) }}>Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
]