import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { Machine } from 'common/api/useGetMachine';

import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { QueryKeys } from 'common/utils/constants';

/**
 * An API hook which fetches a collection of `Machine` objects.
 * @returns Returns a `UseQueryResult` with `Machine` collection data.
 */
export const useGetMachines = (): UseQueryResult<Machine[], Error> => {
  const axios = useAxios();
  const config = useConfig();

  // console.log(config);

  const getMachines = async (): Promise<Machine[]> => {
    const response = await axios.request({
      url: `${config.VITE_BASE_SERVER_URL_API}/machines`,
    });
    return response.data;
  };

  return useQuery({
    queryKey: [QueryKeys.Machines],
    queryFn: () => getMachines(),
  });
};
