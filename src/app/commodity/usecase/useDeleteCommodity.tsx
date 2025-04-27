import { DeleteCommodity } from "@/shared/repositories/commodity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useDeleteCommodity = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) =>
            DeleteCommodity(id),
        onSuccess: (resp) => {
            toast.success(resp.data.message);
            queryClient.invalidateQueries({ queryKey: ['commodities'] });
            navigate('/commodity');
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
};