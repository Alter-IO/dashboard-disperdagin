import { DeletePhoto } from "@/shared/repositories/photo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useDeletePhoto = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) =>
            DeletePhoto(id),
        onSuccess: (resp) => {
            toast.success(resp.data.message);
            queryClient.invalidateQueries({ queryKey: ['photos'] });
            navigate('/photo');
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
};