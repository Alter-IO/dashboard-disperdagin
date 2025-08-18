import { IPostPutPhotoCategory } from "@/shared/models/photo-category";
import { CreatePhotoCategory } from "@/shared/repositories/photo-category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useCreatePhotoCategory = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: IPostPutPhotoCategory) =>
            CreatePhotoCategory(payload),
        onSuccess: (resp) => {
            toast.success(resp.data.message);
            queryClient.invalidateQueries({ queryKey: ['photo-categories'] });
            navigate('/photo-category');
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
};