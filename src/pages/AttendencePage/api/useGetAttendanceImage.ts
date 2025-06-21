import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { QueryKey } from '@tanstack/react-query';
import { QueryKeys } from 'common/utils/constants';


/**
 * An API hook which fetches an attendance image.
 * @param {number} attendanceId - The attendance identifier.
 * @returns Returns a `UseQueryResult` with the image data.
 */
export const useGetAttendanceImage = (attendanceId: number): UseQueryResult<Blob, Error> => {
  const axios = useAxios();
  const config = useConfig();

  return useQuery<Blob, Error>({
    queryKey: [QueryKeys.AttendanceImage, attendanceId] as QueryKey,
    queryFn: async () => {
      const response = await axios.request<Blob>({
        url: `${config.VITE_BASE_URL_API}/v1/attendance/image/${attendanceId}`,
        responseType: 'blob',
        headers: {
          'Accept': 'application/octet-stream'
        }
      });
      return response.data;
    },
    enabled: !!attendanceId,
    gcTime: 0, // Disable garbage collection (replaces cacheTime)
    staleTime: 0, // Always consider data as stale
  });
};
