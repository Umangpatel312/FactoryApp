import { useMutation, useQueryClient } from '@tanstack/react-query';


import { User } from 'common/api/useGetUser';
import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { QueryKeys } from 'common/utils/constants';
import { ApiResponse } from 'common/types/ApiResponse';

/**
 * The `useDeleteTask` mutation function variables.
 */
export type EmployeeRequestPayload = {
  id: number;
  name: string;
  mobileNumber: string;
  password?: string;
  salaries: Record<string, number>;
  managerId?: number;
};

/**
 * An API hook which performs user authentication.
 * @returns Returns a `UseMutationResult` with `User` data.
 */
export const useUpdateEmployee = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const config = useConfig();

  /**
   * Attempts to authenticate a user.
   * @param username - A username value.
   * @returns Returns a Promise which resolves to a `User` if successful,
   * otherwise throws an Error.
   */
  const updateEmployee = async (employee: EmployeeRequestPayload): Promise<User> => {


    // fetch all users
    const response = await axios.request<ApiResponse<User>>({
      url: `${config.VITE_BASE_URL_API}/v1/users/employee/${employee.id}`,
      method: 'put',
      data: employee
    });
    console.log(response);
    // if user matching 'username' is found, consider the user to be authenticated.
    const data = response.data;
    console.log(data);

    if (data.message === 'User updated successfully!') {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  };

  return useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Employees]
      });
    },
  });
};
