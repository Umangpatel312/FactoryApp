import { QueryKey, useQuery } from '@tanstack/react-query';
import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { ApiResponse } from 'common/types/ApiResponse';

export interface SalaryPayment {
  totalPayableAmount: number;
  totalAdvancePaid: number;
  netPayable: number;
  singleDayWorkingCount: number;
  doubleDayWorkingCount: number;
  singleMachineSalary: number;
  doubleMachineSalary: number;
  userId: number;
  userName: string;
}


import { UseQueryOptions } from '@tanstack/react-query';

export const useGetSalaries = (
  month?: number,
  year?: number,
  managerId?: number,
  options?: Partial<UseQueryOptions<SalaryPayment[], Error, SalaryPayment[], QueryKey>>
) => {
    const config = useConfig();
    const axios = useAxios();
  
  const now = new Date();
  const selectedMonth = month ?? now.getMonth() + 1;
  const selectedYear = year ?? now.getFullYear();

  const data = {
    month: selectedMonth,
    year: selectedYear,
    managerId: managerId
  };

  return useQuery({
    queryKey: ['salaries', selectedMonth, selectedYear, managerId],
    queryFn: async (): Promise<SalaryPayment[]> => {

      const response = await axios.request<ApiResponse<SalaryPayment[]>>({
            url: `${config.VITE_BASE_URL_API}/v1/salary/list`,
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
    enabled: (options && typeof options.enabled !== 'undefined') ? options.enabled : !!managerId,
    ...(options || {}),
  });
};

// If you see errors about missing '@tanstack/react-query', run:
// npm install @tanstack/react-query
