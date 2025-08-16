import { IPostPutKelurahan } from "@/shared/models/kelurahan";
import { UpdateKelurahan } from "@/shared/repositories/kelurahan";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useEditKelurahan = (id: string) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: IPostPutKelurahan) =>
            UpdateKelurahan(payload, id),
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