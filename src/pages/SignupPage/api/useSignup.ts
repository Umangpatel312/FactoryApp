import { useMutation, useQueryClient } from '@tanstack/react-query';


import { User } from 'common/api/useGetUser';
import { UserTokens } from 'common/api/useGetUserTokens';
import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import storage from 'common/utils/storage';
import { QueryKeys, StorageKeys } from 'common/utils/constants';

/**
 * The `useDeleteTask` mutation function variables.
 */
export type SignUpReqestPayload = {
  name: string;
  mobileNumber: string;
  password: string
};

export type SignUpResponsePayload = {
  data: { id: number }
  message: string;
}

/**
 * An API hook which performs user authentication.
 * @returns Returns a `UseMutationResult` with `User` data.
 */
export const useSignup = () => {
  const axios = useAxios();
  const config = useConfig();

  /**
   * Attempts to authenticate a user.
   * @param username - A username value.
   * @returns Returns a Promise which resolves to a `User` if successful,
   * otherwise throws an Error.
   */
  const signup = async (signInRequestPayload: SignUpReqestPayload): Promise<SignUpResponsePayload> => {
    // REPLACE: This is a contrived "signin" approach for demonstration purposes.
    //          You should implement authentication functionality in accordance
    //          with your IdP.

    // fetch all users
    const response = await axios.request<SignUpResponsePayload>({
      url: `${config.VITE_BASE_URL_API}/v1/users/register`,
      method: 'post',
      data: signInRequestPayload
    });
    console.log(response);
    // if user matching 'username' is found, consider the user to be authenticated.
    const data = response.data;
    console.log(data);

    if (data.message) {

      return data;
    } else {
      throw new Error('Authentication failed.');
    }
  };

  return { signup };
};
