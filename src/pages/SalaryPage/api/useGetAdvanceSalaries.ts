import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { QueryKeys } from 'common/utils/constants';

export interface AdvanceSalary {
  userId: number;
  advanceSalaryAmount: number;
  paidByUserId: number;
  advanceSalaryDate: number | null;
  userName: string | null;
  paidByUserName: string | null;
}

export const useGetAdvanceSalaries = (
  month?: number,
  year?: number,
  userId?: number,
  options?: Partial<UseQueryOptions<AdvanceSalary[], Error, AdvanceSalary[], QueryKey>>
) => {
  const config = useConfig();
  const axios = useAxios();

  const now = new Date();
  const selectedMonth = month ?? now.getMonth() + 1;
  const selectedYear = year ?? now.getFullYear();

  const data = {
    month: selectedMonth,
    year: selectedYear,
    userId: userId
  };

  return useQuery({
    queryKey: [QueryKeys.AdvanceSalaries, selectedMonth, selectedYear, userId],
    queryFn: async (): Promise<AdvanceSalary[]> => {
      const response = await axios.request({
        url: `${config.VITE_BASE_URL_API}/v1/advance-salary/list`,
        method: 'POST',
        data,
      });
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (Array.isArray(response.data?.data)) {
        return response.data.data;
      }
      return [];
    },
    enabled: (options && typeof options.enabled !== 'undefined') ? options.enabled : !!userId,
    ...(options || {}),
  });
};

