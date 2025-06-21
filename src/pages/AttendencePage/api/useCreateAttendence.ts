import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QueryKeys } from 'common/utils/constants';
import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { ApiResponse } from 'common/types/ApiResponse';

export type CreateAttendenceVariables = {
  attendence: Attendance;
  file?: File;
};

export type Attendance = {
  id?: number;
  attendanceDate: number;
  production?: number;
  frames?: number;
  dhaga?: number;
  userId?: number;
  userName?: string;
  shiftId?: number;
  shiftName?: string;
  salaryTypeId?: number;
  salaryType?: string;
  machineId?: number;
  machineName?: string;
};

/**
 * An API hook which deletes a single `Task`. Returns a `UseMutationResult`
 * object whose `mutate` attribute is a function to delete a `Task`.
 *
 * When successful, the hook updates cached `Task` query data.
 *
 * @returns Returns a `UseMutationResult`.
 */
export const useCreateAttendence = () => {
  const queryClient = useQueryClient();
  const config = useConfig();
  const axios = useAxios();

  const createAttendence = async ({ attendence, file }: CreateAttendenceVariables): Promise<Attendance> => {
    const formData = new FormData();

    // Add attendance data first
    formData.append('attendance', new Blob([JSON.stringify(attendence)], {
      type: 'application/json'
    }));

    // Add file if provided
    if (file) {
      formData.append('file', file);
    }

    const response = await axios.request<ApiResponse<Attendance>>({
      method: 'post',
      url: `${config.VITE_BASE_URL_API}/v1/attendance`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        // Add this to prevent axios from setting its own boundary
        'Accept': 'application/json'
      },
    });

    if (response.data.message !== 'Success') {
      throw new Error('Failed to create attendance');
    }

    return response.data.data;
  };

  return useMutation({
    mutationFn: createAttendence,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Attendences]
      });
    },
  });
};