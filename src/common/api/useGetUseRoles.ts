import { useQuery } from '@tanstack/react-query';
import storage from 'common/utils/storage';
import { QueryKeys, StorageKeys } from 'common/utils/constants';

/**
 * An API hook which fetches the currently authenticated user's roles.
 * @returns Returns a `UseQueryResult` with user roles data.
 */
export const useGetUseRoles = () => {
  const getCurrentUserRoles = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      try {
        const storedUser = storage.getItem(StorageKeys.UserRoles);
        if (storedUser) {
          const roles = JSON.parse(storedUser) as unknown as string[];
          return resolve(roles);
        }
        return reject(new Error('No roles found'));
      } catch (err) {
        return reject(err);
      }
    });
  };

  return useQuery({
    queryKey: [QueryKeys.UserRoles],
    queryFn: getCurrentUserRoles,
    gcTime: 0, // Disable garbage collection (replaces cacheTime)
    staleTime: 0, // Always consider data as stale
  });
};
