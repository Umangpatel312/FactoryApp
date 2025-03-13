import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { QueryKeys } from 'common/utils/constants';

/**
 * The `User` type.
 */
export type Employee = {
  id: number;
  name: string;
  mobileNumber: string;
  active: boolean
};

/**
 * The request properties for `useGetUser`.
 * @param {number} userId - A `User` identifier.
 */
interface UseGetEmployeeProps {
  employeeId: number;
}

/**
 * An API hook which fetches a `User` by the identifier.
 * @param {UseGetEmployeeProps} props - The hook properties.
 * @returns Returns a `UseQueryResult` with `User` data.
 */
export const useGetUser = ({ employeeId }: UseGetEmployeeProps): UseQueryResult<Employee, Error> => {
  const axios = useAxios();
  const config = useConfig();

  const getUser = async (): Promise<Employee | null> => {
    const response = await axios.request({
      url: `${config.VITE_BASE_SERVER_URL_API}/employees/${employeeId}`,
    });
    return response.data;
  };

  return useQuery({
    queryKey: [QueryKeys.Employees, employeeId],
    queryFn: () => getUser(),
    enabled: !!employeeId,
  });
};
