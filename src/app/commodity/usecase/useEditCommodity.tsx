import { IPostPutCommodity } from "@/shared/models/commodity";
import { UpdateCommodity } from "@/shared/repositories/commodity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useEditCommodity = (
    id: string,
) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: IPostPutCommodity) =>
            UpdateCommodity(payload, id),
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