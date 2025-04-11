import { useNavigate } from 'react-router';
import { ILoginPayload } from '@/shared/models/auth';
import { Login } from '@/shared/repositories/auth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: ILoginPayload) => Login(payload),
    onSuccess: (response) => {
      const { id, username, role_id, access_token } = response.data.data;

      localStorage.setItem('access_token', JSON.stringify(access_token));
      localStorage.setItem('admin', JSON.stringify({ id, username, role_id }));

      navigate('/');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
};
