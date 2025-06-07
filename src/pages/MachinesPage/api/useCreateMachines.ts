import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QueryKeys } from 'common/utils/constants';
import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { Machine } from 'common/api/useGetMachine';
import { ApiResponse } from 'common/types/ApiResponse';

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
  const createMachine = async ({ machine }: CreateMachineVariables): Promise<ApiResponse<Machine>> => {
    console.log("create machine", machine);
    const response = await axios.request({
      method: 'post',
      url: `${config.VITE_BASE_URL_API}/v1/machines`,
      data: machine
    });

    if (response.data.message !== 'Machine details saved successfully!') {
      throw new Error('Failed to create machine');
    }
    return response.data;
  };

  return useMutation({
    mutationFn: createMachine,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.UserMachines]
      });
    },
  });
};
