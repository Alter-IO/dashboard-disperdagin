import { IResetPassword } from "@/shared/models/user";
import { ResetPassword } from "@/shared/repositories/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useResetPassword = (
    id: string,
    setIsOpen: Dispatch<SetStateAction<boolean>>
) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: IResetPassword) =>
            ResetPassword(payload, id),
        onSuccess: (resp) => {
            toast.success(resp.data.message);
            queryClient.invalidateQueries({ queryKey: ['users'] });
            setIsOpen(false);
            navigate('/user-management');
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
};