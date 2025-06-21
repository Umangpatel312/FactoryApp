import { useMutation } from '@tanstack/react-query';
import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { useToasts } from 'common/hooks/useToasts';

export interface RegenerateSalaryRequest {
  month: number;
  year: number;
  userId?: number;
  managerId?: number;
}

export const useRegenerateSalary = () => {
  const axios = useAxios();
  const config = useConfig();
  const { createToast } = useToasts();

  return useMutation({
    mutationFn: async (body: RegenerateSalaryRequest) => {
      const response = await axios.post(
        `${config.VITE_BASE_URL_API}/v1/salary/regenerate`,
        body
      );
      return response.data;
    },
    onSuccess: (data) => {
      createToast({
        text: data?.message || 'Salary regenerated successfully',
        isAutoDismiss: true,
      });
    },
    onError: (error: any) => {
      createToast({
        text: error?.response?.data?.message || 'Failed to regenerate salary',
        isAutoDismiss: true,
      });
    },
  });
};
