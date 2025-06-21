import { useParams } from 'react-router-dom';
import { ButtonVariant, PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';
import { useGetCurrentUser } from 'common/api/useGetCurrentUser';
import { useGetEmployees } from 'pages/EmployeesPage/api/useGetEmployees';
import { useEffect, useMemo, useState } from 'react';
import Button from 'common/components/Button/Button';
import FAIcon from 'common/components/Icon/FAIcon';
import SelectField from 'common/components/Form/SelectField';
import { format, subMonths, startOfMonth, endOfMonth, startOfDay, endOfDay } from 'date-fns';
import { useGetUseRoles } from 'common/api/useGetUseRoles';
import { useGetAttendences } from '../api/useGetAttendences';
import { AttendanceImageModal } from './AttendanceImageModal';
import { CalendarView } from 'common/components/Calendar/CalendarView';

interface UserListProps extends PropsWithClassName, PropsWithTestId { }

enum ViewType {
  LIST = 'list',
  CALENDAR = 'calendar'
}

type MonthOption = {
  label: string;
  startDate: Date;
  endDate: Date;
};

type SearchParams = {
  employeeId?: string;
  startDate: number;
  endDate: number;
};

type AttendanceMap = Map<string, number>;

const getBackgroundColor = (count: number) => {
  if (count === 0) return 'bg-white';
  if (count <= 1) return 'bg-blue-200';
  if (count <= 2) return 'bg-green-300';
  if (count <= 5) return 'bg-sky-300';
  return 'bg-blue-200';
};

const getMonthOptions = (numberOfMonths: number = 12): MonthOption[] => {
  const options: MonthOption[] = [];
  const today = new Date();

  for (let i = 0; i < numberOfMonths; i++) {
    const date = subMonths(today, i);
    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);

    options.push({
      label: format(date, 'MMMM yyyy'),
      startDate,
      endDate
    });
  }

  return options;
};

const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: Date[] = [];

  // Add padding for first week with previous month's days
  const prevMonthDays = firstDay.getDay();
  for (let i = prevMonthDays - 1; i >= 0; i--) {
    const prevDate = new Date(year, month, -i);
    days.push(prevDate);
  }

  // Add current month's days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }

  // Add padding for last week with next month's days
  const remainingDays = 42 - days.length; // 6 weeks * 7 days
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
};

const AttendenceList = ({ className, testId = 'list-users' }: UserListProps): JSX.Element => {
  const roles = useGetUseRoles();
  const { data: user } = useGetCurrentUser();
  const isEmployee = roles.data?.includes('EMPLOYEE');

  const {
    data: employees,
    error: isEmployeeError,
    isPending: isEmployeePending
  } = !isEmployee ? useGetEmployees(user?.id) : { data: undefined, error: null, isPending: false };

  const employeeOptions = useMemo(() => {
    if (isEmployee && user) {
      // If user is an employee, only show their own option
      return [{
        value: String(user.id),
        label: user.name
      }];
    }
    // Otherwise show all employees
    return employees?.map(employee => ({
      value: String(employee.id),
      label: employee.name
    })) ?? [];
  }, [employees, user, isEmployee]);

  useEffect(() => {
    if (isEmployee && user) {
      setSelectedEmployee(String(user.id));
    }
  }, [isEmployee, user]);

  const [selectedEmployee, setSelectedEmployee] = useState<string>('');

  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const monthOptions = useMemo(() =>
    getMonthOptions().map((month, index) => ({
      value: String(index),
      label: month.label
    })),
    []
  );

  const [searchParams, setSearchParams] = useState<{
    startDate: number;
    endDate: number;
    employeeId?: string;
  } | null>(null);


  const handleSearch = () => {
    if (!selectedMonth || !selectedEmployee) {
      alert('Please select both month and employee');
      return;
    }

    const monthOption = getMonthOptions()[Number(selectedMonth)];

    // Convert dates to timestamps with proper start/end of day
    console.log(monthOption)
    const startTimestamp = Math.floor(startOfDay(monthOption.startDate).getTime() / 1000);
    const endTimestamp = Math.floor(endOfDay(monthOption.endDate).getTime() / 1000);

    setSearchParams({
      employeeId: selectedEmployee,
      startDate: startTimestamp,
      endDate: endTimestamp
    });
    console.log("search params:", searchParams);
  };

  const handleReset = () => {
    setSelectedMonth('');
    setSelectedEmployee('');
    setSearchParams(null);
  };

  // Use the search params in the hook
  const { data: attendences, isPending: isAttendencePending } = useGetAttendences(
    Number(searchParams?.employeeId || 0),
    searchParams?.startDate || 0,
    searchParams?.endDate || 0
  );

  const [isFilterVisible, setIsFilterVisible] = useState(true);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const [viewType, setViewType] = useState<ViewType>(ViewType.LIST);
  const [selectedAttendanceId, setSelectedAttendanceId] = useState<number | null>(null);

  const handleViewImage = (attendanceId: number | undefined) => {
    setSelectedAttendanceId(attendanceId ?? 0);
  };

  const handleCloseImage = () => {
    setSelectedAttendanceId(null);
  };

  const renderListView = () => (
    <div className="divide-y divide-gray-200">
      {attendences?.map((attendance) => (
        <div key={attendance.id} className="py-4 first:pt-0 last:pb-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{attendance.userName}</h3>
              <p className="text-sm text-gray-500">
                Machine: {attendance.machineName} | Shift: {attendance.shiftName}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                {new Date(attendance.attendanceDate * 1000).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-900">
                Production: {attendance.production}
              </p>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>Frame: {attendance.frames}</div>
            <div>Dhaga: {attendance.dhaga}</div>
          </div>
          <div className="mt-2 flex justify-end">
            <button
              className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
              onClick={() => handleViewImage(attendance.id)}
              title="View Image"
            >
              <FAIcon icon="image" className="text-xl" />
            </button>
          </div>
        </div>
      ))}
      <AttendanceImageModal
        attendanceId={selectedAttendanceId || 0}
        onClose={handleCloseImage}
        isOpen={selectedAttendanceId !== null}
      />
    </div>
  );

  const generateAttendanceMap = (attendances: any[]): AttendanceMap => {
    const map = new Map<string, number>();

    attendances?.forEach(attendance => {
      const date = new Date(attendance.attendanceDate * 1000).toDateString();
      map.set(date, (map.get(date) || 0) + 1);
    });

    return map;
  };

  const renderCalendarView = () => {
    const currentDate = searchParams?.startDate
      ? new Date(searchParams.startDate * 1000)
      : new Date();

    // Generate attendance map
    const attendanceMap = generateAttendanceMap(attendences || []);

    const handleDateClick = (date: Date) => {
      // Optional: Handle date click if needed
      console.log('Date clicked:', date);
    };

    return (
      <CalendarView
        date={currentDate}
        attendanceMap={attendanceMap}
        onDateClick={handleDateClick}
      />
    );
  };

  const renderFilterSection = () => (
    <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
      {/* Filter Header */}
      <div
        className="px-6 py-4 flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
        onClick={toggleFilter}
      >
        <div className="flex items-center gap-3">
          <FAIcon icon="filter" className="text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Search Filters</h3>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-sm">
            {isFilterVisible ? 'Hide filters' : 'Show filters'}
          </span>
          <FAIcon
            icon={isFilterVisible ? 'chevronUp' : 'chevronDown'}
            className="transition-transform duration-200"
          />
        </div>
      </div>

      {/* Filter Content */}
      <div
        className={classNames(
          'transition-all duration-300 ease-in-out',
          isFilterVisible ? 'max-h-96' : 'max-h-0'
        )}
      >
        <div className="p-6 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              name="month"
              label="Select Month"
              value={selectedMonth}
              onChange={(value) => setSelectedMonth(value)}
              options={monthOptions}
              testId={`${testId}-select-field-month`}
            />
            <SelectField
              name="employee"
              label="Select Employee"
              value={selectedEmployee}
              onChange={(value) => setSelectedEmployee(value)}
              options={employeeOptions}
              disabled={isEmployeePending || isEmployee} // Disable if user is an employee

              testId={`${testId}-select-field-employee`}
            />
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant={ButtonVariant.Text}
              onClick={handleReset}
              className="px-6 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
            >
              <FAIcon icon="undo" />
              Reset
            </Button>
            <Button
              variant={ButtonVariant.Text}
              onClick={handleSearch}
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
            >
              <FAIcon icon="search" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderViewToggle = () => (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex bg-gray-100 p-1 rounded-lg">
        <Button
          variant={ButtonVariant.Text}
          onClick={() => setViewType(ViewType.LIST)}
          className={classNames(
            'px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2',
            viewType === ViewType.LIST
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          )}
        >
          <FAIcon icon="list" />
          {/* List View */}
        </Button>
        <Button
          variant={ButtonVariant.Text}
          onClick={() => setViewType(ViewType.CALENDAR)}
          className={classNames(
            'px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2',
            viewType === ViewType.CALENDAR
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          )}
        >
          <FAIcon icon="calendar" />
          {/* Calendar View */}
        </Button>
      </div>
    </div>
  );
  return (
    <div
      className="flex h-full flex-col overflow-y-auto bg-gray-50 p-6"
      data-testid={testId}
    >
      {renderFilterSection()}

      {isAttendencePending ? (
        <LoaderSkeleton className="rounded-lg" />
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          {renderViewToggle()}
          {attendences && attendences.length > 0 ? (
            viewType === ViewType.LIST ? renderListView() : renderCalendarView()
          ) : (
            <div className="py-12 text-center">
              <FAIcon icon="inbox" size="2x" className="text-gray-400 mb-3" />
              <p className="text-lg font-medium text-gray-900">No attendance records found</p>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your filters or selecting a different date range
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendenceList;
