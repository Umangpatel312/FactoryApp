import { useMutation, useQueryClient } from '@tanstack/react-query';
import reject from 'lodash/reject';

import { QueryKeys } from 'common/utils/constants';
import { Task } from 'pages/UsersPage/api/useGetUserTasks';
import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { Machine } from 'common/api/useGetMachine';

/**
 * The `useDeleteTask` mutation function variables.
 */
export type CreateMachineVariables = {
  machine: Machine;
};

/**
 * An API hook which deletes a single `Task`. Returns a `UseMutationResult`
 * object whose `mutate` attribute is a function to delete a `Task`.
 *
 * When successful, the hook updates cached `Task` query data.
 *
 * @returns Returns a `UseMutationResult`.
 */
export const useCreateMachine = () => {
  const queryClient = useQueryClient();
  const config = useConfig();
  const axios = useAxios();

  /**
   * Delete a `Task`.
   * @param {CreateMachineVariables} variables - The mutation function variables.
   */
  const createMachine = async ({ machine }: CreateMachineVariables): Promise<void> => {
    // throw new Error('Failed');
    await axios.request({
      method: 'post',
      url: `${config.VITE_BASE_SERVER_URL_API}/machines`,
      data: machine
    });
  };

  return useMutation({
    mutationFn: createMachine,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Machines]
      });
    },
  });
};
