import { IPostPutVideo } from "@/shared/models/video";
import { CreateVideo } from "@/shared/repositories/video";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useCreateVideo = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: IPostPutVideo) =>
            CreateVideo(payload),
        onSuccess: (resp) => {
            toast.success(resp.data.message);
            queryClient.invalidateQueries({ queryKey: ['videos'] });
            navigate('/video');
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
};