import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { QueryKeys } from 'common/utils/constants';

export interface SaveAdvanceSalaryRequest {
  userId: number;
  advanceSalaryAmount: number;
  paidByUserId: number;
}

export const useSaveAdvanceSalary = () => {
  const axios = useAxios();
  const config = useConfig();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SaveAdvanceSalaryRequest) => {
      const { data } = await axios.post(`${config.VITE_BASE_URL_API}/v1/advance-salary`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.AdvanceSalaries]
      });
    }
  });
};
