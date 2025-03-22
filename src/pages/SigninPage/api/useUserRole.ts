import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import find from 'lodash/find';

import { User } from 'common/api/useGetUser';
import { UserTokens } from 'common/api/useGetUserTokens';
import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import storage from 'common/utils/storage';
import { QueryKeys, StorageKeys } from 'common/utils/constants';

export type UserRoleResponsePayload = {
  data: string[];
  message: string;
}

/**
 * An API hook which performs user authentication.
 * @returns Returns a `UseMutationResult` with `User` data.
 */

export const useUserRoles = () => {
  const axios = useAxios();         // ✅ Safe hook usage
  const config = useConfig();       // ✅ Safe hook usage
  const queryClient = useQueryClient();

  const fetchAndCacheUserRoles = async () => {
    try {
      const response = await axios.request({
        url: `${config.VITE_BASE_URL_API}/v1/users/roles`,
        method: 'get',
      });

      console.log(response);

      if (response.data.message === 'Roles fetch successfully!') {
        const roles = response.data.data;

        if (roles.length === 0) {
          throw new Error('No roles found.');
        }

        // ✅ Cache the roles in React Query
        queryClient.setQueryData([QueryKeys.UserRoles], roles);

        // ✅ Store roles in local storage
        storage.setItem(StorageKeys.UserRoles, JSON.stringify(roles));

        console.log('Roles cached:', roles);
        return roles;
      }
      return [];
    } catch (error) {
      console.error('Failed to fetch user roles:', error);
      throw error;
    }
  };

  return { fetchAndCacheUserRoles };
};
