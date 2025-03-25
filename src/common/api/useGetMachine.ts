import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { ApiResponse } from 'common/types/ApiResponse';
import { QueryKeys } from 'common/utils/constants';


/**
 * The `User` type.
 */
export type Machine = {
  id: number;
  name: string;
  heads?: number;
  area?: number;
  isActive?: boolean;
  managerId?: number;
  createdAt?: string;
  ModifiedAt?: string;
  createdBy?: number;
  modifiedBy?: number;
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

  const getMachine = async (): Promise<Machine> => {
    const response = await axios.request<ApiResponse<Machine>>({
      url: `${config.VITE_BASE_URL_API}/v1/machines/${machineId}`,
    });
    if (response.data.message !== "Machine details successfully!") {
      throw new Error('Failed to fetch machine details');
    }
    return response.data.data;
  };

  return useQuery({
    queryKey: [QueryKeys.Machines, machineId],
    queryFn: () => getMachine(),
    enabled: !!machineId,
  });
};
