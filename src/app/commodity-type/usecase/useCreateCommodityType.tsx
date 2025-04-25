import { IPostPutCommodityType } from "@/shared/models/commodity-type";
import { CreateCommodityType } from "@/shared/repositories/commodity-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useCreateCommodityType = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: IPostPutCommodityType) =>
            CreateCommodityType(payload),
        onSuccess: (resp) => {
            toast.success(resp.data.message);
            queryClient.invalidateQueries({ queryKey: ['commodity-types'] });
            navigate('/commodity-type');
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
};