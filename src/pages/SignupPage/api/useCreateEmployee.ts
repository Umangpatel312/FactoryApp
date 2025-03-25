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
export const useCreateEmployee = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const config = useConfig();

  /**
   * Attempts to authenticate a user.
   * @param username - A username value.
   * @returns Returns a Promise which resolves to a `User` if successful,
   * otherwise throws an Error.
   */
  const createEmployee = async (employee: EmployeeRequestPayload): Promise<User> => {
    // REPLACE: This is a contrived "signin" approach for demonstration purposes.
    //          You should implement authentication functionality in accordance
    //          with your IdP.

    // fetch all users
    const response = await axios.request<ApiResponse<User>>({
      url: `${config.VITE_BASE_URL_API}/v1/users/employee`,
      method: 'post',
      data: employee
    });
    console.log(response);
    // if user matching 'username' is found, consider the user to be authenticated.
    const data = response.data;
    console.log(data);

    if (data.message) {

      return data.data;
    } else {
      throw new Error('Authentication failed.');
    }
  };

  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Employees]
      });
    },
  });
};
