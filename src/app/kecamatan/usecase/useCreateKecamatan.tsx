import { IPostPutKecamatan } from "@/shared/models/kecamatan";
import { CreateKecamatan } from "@/shared/repositories/kecamatan";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useCreateKecamatan = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: IPostPutKecamatan) =>
            CreateKecamatan(payload),
        onSuccess: (resp) => {
            toast.success(resp.data.message);
            queryClient.invalidateQueries({ queryKey: ['kecamatans'] });
            navigate('/kecamatan');
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
};