import { useMutation } from '@tanstack/react-query';
import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';

export interface GenerateAllSalariesRequest {
  month: number;
  year: number;
  userId?: number;
  managerId?: number;
}

export const useGenerateAllSalaries = () => {
  const axios = useAxios();
  const config = useConfig();

  return useMutation({
    mutationFn: async (body: GenerateAllSalariesRequest) => {
      const response = await axios.post(
        `${config.VITE_BASE_URL_API}/v1/salary`,
        body
      );
      return response.data;
    },
  });
};
