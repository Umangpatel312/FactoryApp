import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { Machine } from 'common/api/useGetMachine';
import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { ApiResponse } from 'common/types/ApiResponse';
import { QueryKeys } from 'common/utils/constants';

export type MachineResponse = ApiResponse<Machine[]>;

/**
 * An API hook which fetches a collection of `Machine` objects.
 * @param {number} userId - The user identifier.
 * @returns Returns a `UseQueryResult` with `Machine` collection data.
 */
export const useGetMachines = (userId?: number): UseQueryResult<Machine[], Error> => {
  const axios = useAxios();
  const config = useConfig();

  const getMachines = async (): Promise<Machine[]> => {
    const response = await axios.request<MachineResponse>({
      url: `${config.VITE_BASE_URL_API}/v1/machines/user/${userId}`,
    });
    console.log("machine list", response.data);
    if (response.data.message === 'Machine list fetched successfully!') {
      return response.data.data;
    }
    return [];
  };

  return useQuery({
    queryKey: [QueryKeys.UserMachines, userId],
    queryFn: getMachines,
    enabled: !!userId,
  });
};