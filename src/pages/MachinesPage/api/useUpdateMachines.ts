import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'common/utils/constants';
import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { Machine } from 'common/api/useGetMachine';
import { ApiResponse } from 'common/types/ApiResponse';

export type UpdateMachineVariables = {
  machine: Machine;
};

export const useUpdateMachine = () => {
  const queryClient = useQueryClient();
  const config = useConfig();
  const axios = useAxios();

  const updateMachine = async ({ machine }: UpdateMachineVariables): Promise<ApiResponse<Machine>> => {
    const response = await axios.request<ApiResponse<Machine>>({
      method: 'put',
      url: `${config.VITE_BASE_URL_API}/v1/machines/${machine.id}`,
      data: machine,
    });

    if (response.data.message !== 'Machine details updated successfully!') {
      throw new Error('Failed to update machine');
    }
    return response.data;
  };

  return useMutation({
    mutationFn: updateMachine,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Machines],
      });
    },
  });
};