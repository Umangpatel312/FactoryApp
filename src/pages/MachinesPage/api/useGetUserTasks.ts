import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { QueryKeys } from 'common/utils/constants';

/**
 * The `Task` type.
 */
export type Task = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

/**
 * The request properties for `useGetUserTasks`.
 * @param {number} userId - A `User` identifier.
 */
interface UseGetUserTasksProps {
  userId?: number;
}

/**
 * An API hook which fetches a collection of `Task` objects which
 * are assigned to a `User`.
 * @param {UseGetUserTasksProps} props - Hook properties.
 * @returns Returns a `UseQueryResult` with `Task` collection data.
 */
export const useGetUserTasks = ({
  userId,
}: UseGetUserTasksProps): UseQueryResult<Task[], Error> => {
  const axios = useAxios();
  const config = useConfig();

  const getUserTasks = async (): Promise<Task[]> => {
    const response = await axios.request({
      url: `${config.VITE_BASE_URL_API}/users/${userId}/todos`,
    });
    return response.data;
  };

  return useQuery({
    queryKey: [QueryKeys.Tasks, { userId }],
    queryFn: getUserTasks,
    enabled: !!userId,
  });
};
