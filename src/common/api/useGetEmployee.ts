import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { useAxios } from 'common/hooks/useAxios';
import { useConfig } from 'common/hooks/useConfig';
import { QueryKeys } from 'common/utils/constants';
import { User } from './useGetUser';
import { ApiResponse } from 'common/types/ApiResponse';
import { EmployeeRequestPayload } from 'pages/SignupPage/api/useCreateEmployee';
import EmployeeDetailEmpty from 'pages/EmployeesPage/components/EmployeeDetailEmpty';

interface EmployeeResponse {
  user: User;
  salaries: Array<{ salary: number; salaryType: { name: string } }>; // Adjust the type of salaries based on the actual structure of the salary data
}

/**
 * The request properties for `useGetUser`.
 * @param {number} userId - A `User` identifier.
 */
interface UseGetEmployeeProps {
  employeeId?: number | undefined;
}

/**
 * An API hook which fetches a `User` by the identifier.
 * @param {UseGetEmployeeProps} props - The hook properties.
 * @returns Returns a `UseQueryResult` with `User` data.
 */
export const useGetEmployee = ({ employeeId }: UseGetEmployeeProps): UseQueryResult<EmployeeRequestPayload, Error> => {
  const axios = useAxios();
  const config = useConfig();

  const getEmployee = async (): Promise<EmployeeRequestPayload> => {
    const response = await axios.request<ApiResponse<EmployeeResponse>>({
      url: `${config.VITE_BASE_URL_API}/v1/users/employees/${employeeId}/salaries`,
    });
    console.log(response.data);
    if (response.data.message !== 'Employee fetched successfully!') {
      throw new Error('Failed to fetch employee');
    }
    const employeeData: EmployeeRequestPayload = {
      id: response.data.data.user.id,
      name: response.data.data.user.name,
      mobileNumber: response.data.data.user.mobileNumber,
      salaries: response.data.data.salaries.reduce((acc, salary) => {
        acc[salary.salaryType.name] = salary.salary;
        return acc;
      }, {} as Record<string, number>),
      managerId: response.data.data.user.managerId,
    };
    console.log("employeeDAta", employeeData)
    return employeeData;
  };

  return useQuery({
    queryKey: [QueryKeys.Employees, employeeId],
    queryFn: () => getEmployee(),
    enabled: !!employeeId,
  });
};
