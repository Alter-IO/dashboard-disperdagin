import { IPostPutKelurahan } from "@/shared/models/kelurahan";
import { CreateKelurahan } from "@/shared/repositories/kelurahan";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useCreateKelurahan = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: IPostPutKelurahan) =>
            CreateKelurahan(payload),
        onSuccess: (resp) => {
            toast.success(resp.data.message);
            queryClient.invalidateQueries({ queryKey: ['kelurahans'] });
            navigate('/kelurahan');
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
};