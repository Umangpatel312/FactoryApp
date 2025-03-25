import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { User } from 'common/api/useGetUser';
import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { ApiResponse } from 'common/types/ApiResponse';
import { QueryKeys } from 'common/utils/constants';


/**
 * An API hook which fetches a collection of `Employee` objects.
 * @param {number} managerId - The manager identifier.
 * @returns Returns a `UseQueryResult` with `Employee` collection data.
 */
export const useGetEmployees = (managerId?: number): UseQueryResult<User[], Error> => {
  const axios = useAxios();
  const config = useConfig();

  const getEmployees = async (): Promise<User[]> => {
    const response = await axios.request<ApiResponse<User[]>>({
      url: `${config.VITE_BASE_URL_API}/v1/users/employees/${managerId}`
    });
    return response.data.data;
  };

  return useQuery({
    queryKey: [QueryKeys.ManagerEmployees, managerId],
    queryFn: getEmployees,
    enabled: !!managerId, // Ensure the query only runs if managerId is provided
  });
};