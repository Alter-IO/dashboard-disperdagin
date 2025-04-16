import { IPostUser } from "@/shared/models/user";
import { CreateUser } from "@/shared/repositories/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useCreateUser = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: IPostUser) =>
            CreateUser(payload),
        onSuccess: (resp) => {
            toast.success(resp.data.message);
            queryClient.invalidateQueries({ queryKey: ['users'] });
            navigate('/user-management');
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
};