import { IPostPutCommodity } from "@/shared/models/commodity";
import { CreateCommodity } from "@/shared/repositories/commodity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useCreateCommodity = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: IPostPutCommodity) =>
            CreateCommodity(payload),
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