import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { Machine } from 'common/api/useGetMachine';
import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { ApiResponse } from 'common/types/ApiResponse';
import { QueryKeys } from 'common/utils/constants';
import { Attendance } from './useCreateAttendence';



/**
 * An API hook which fetches a collection of `Machine` objects.
 * @param {number} userId - The user identifier.
 * @returns Returns a `UseQueryResult` with `Machine` collection data.
 */
export const useGetAttendences = (
  userId?: number,
  startDate?: number,
  endDate?: number
): UseQueryResult<Attendance[], Error> => {
  const axios = useAxios();
  const config = useConfig();

  return useQuery({
    queryKey: ['attendences', userId, startDate, endDate],
    queryFn: async () => {
      const params: Record<string, string> = {};
      if (userId) params.userId = userId.toString();
      if (startDate) params.startDate = startDate.toString();
      if (endDate) params.endDate = endDate.toString();

      const response = await axios.request<ApiResponse<Attendance[]>>({
        url: `${config.VITE_BASE_URL_API}/v1/attendance`,
        params
      });
      return response.data.data;
    },
    enabled: !!(startDate && endDate && userId) // Only fetch when both dates are provided
  });
};