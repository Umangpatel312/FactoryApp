import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { Employee } from 'common/api/useGetEmployee';

import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { QueryKeys } from 'common/utils/constants';

/**
 * An API hook which fetches a collection of `User` objects.
 * @returns Returns a `UseQueryResult` with `User` collection data.
 */
export const useGetEmployees = (): UseQueryResult<Employee[], Error> => {
  const axios = useAxios();
  const config = useConfig();

  const getEmployees = async (): Promise<Employee[]> => {
    const response = await axios.request({
      url: `${config.VITE_BASE_SERVER_URL_API}/employees`,
    });
    return response.data;
  };

  return useQuery({
    queryKey: [QueryKeys.Employees],
    queryFn: () => getEmployees(),
  });
};
