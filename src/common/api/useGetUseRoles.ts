import { useQuery } from '@tanstack/react-query';

import storage from 'common/utils/storage';
import { User } from './useGetUser';
import { QueryKeys, StorageKeys } from 'common/utils/constants';

/**
 * An API hook which fetches the currently authenticated `User`.
 * @returns Returns a `UseQueryResult` with `User` data.
 */
export const useGetUseRoles = () => {
  const getCurrentUser = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      try {
        const storedUser = storage.getItem(StorageKeys.UserRoles);
        if (storedUser) {
          const roles = JSON.parse(storedUser) as unknown as string[];
          return resolve(roles);
        }
        return reject(new Error('Not found'));
      } catch (err) {
        return reject(err);
      }
    });
  };

  return useQuery({
    queryKey: [QueryKeys.UserRoles],
    queryFn: getCurrentUser,
  });
};
