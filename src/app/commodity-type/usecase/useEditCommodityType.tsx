import { IPostPutCommodityType } from "@/shared/models/commodity-type";
import { UpdateCommodityType } from "@/shared/repositories/commodity-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useEditCommodityType = (
    id: string,
) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: IPostPutCommodityType) =>
            UpdateCommodityType(payload, id),
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