import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { QueryKeys } from 'common/utils/constants';


/**
 * The `User` type.
 */
export type Machine = {
  id: number;
  name: string;
  heads: number;
  area: number;
};

/**
 * The request properties for `useGetUser`.
 * @param {number} userId - A `User` identifier.
 */
interface MachineGetUserProps {
  machineId: number;
}

/**
 * An API hook which fetches a `User` by the identifier.
 * @param {MachineGetUserProps} props - The hook properties.
 * @returns Returns a `UseQueryResult` with `User` data.
 */
export const useGetMachine = ({ machineId }: MachineGetUserProps): UseQueryResult<Machine, Error> => {
  const axios = useAxios();
  const config = useConfig();

  const getMachine = async (): Promise<Machine | null> => {
    const response = await axios.request({
      url: `${config.VITE_BASE_SERVER_URL_API}/machines/${machineId}`,
    });
    return response.data;
  };

  return useQuery({
    queryKey: [QueryKeys.Machines, machineId],
    queryFn: () => getMachine(),
    enabled: !!machineId,
  });
};
