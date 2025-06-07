import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import Table from 'common/components/Table/Table';


import { useState } from 'react';
import { SalaryPayment, useGetSalaries } from './api/useGetSalaries';
import SalaryCard from './SalaryCard';
import { useRegenerateSalary } from './api/regenerateSalary';
import SelectField from 'common/components/Form/SelectField';
import { ButtonVariant } from '@leanstacks/react-common';
import Button from 'common/components/Button/Button';
import { useGetCurrentUser } from 'common/api/useGetUserRoles';
import { useGetEmployees } from 'pages/EmployeesPage/api/useGetEmployees';
import { useGenerateAllSalaries } from './api/generateAllSalaries';

export const getFinancialYears = () => {
  // For demonstration, show last 3 financial years
  const now = new Date();
  const currentYear = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1; // If before April, current FY started last year
  const years: { label: string; value: string }[] = [];
  for (let i = 0; i < 3; i++) {
    const start = currentYear - i;
    const end = start + 1;
    years.push({
      label: `FY ${start}-${end.toString().slice(-2)}`,
      value: `${start}-${end}`,
    });
  }
  return years;
};

export const getMonthsForFY = (fy: string) => {
  const [startYear, endYear] = fy.split('-').map(Number);
  const months: { label: string; value: string }[] = [];
  // April (4) to December (12) of startYear
  for (let m = 4; m <= 12; m++) {
    const date = new Date(startYear, m - 1, 1);
    months.push({
      label: date.toLocaleString('default', { month: 'short', year: 'numeric' }).replace(' ', '-'),
      value: `${m}-${startYear}`,
    });
  }
  // January (1) to March (3) of endYear
  for (let m = 1; m <= 3; m++) {
    const date = new Date(endYear, m - 1, 1);
    months.push({
      label: date.toLocaleString('default', { month: 'short', year: 'numeric' }).replace(' ', '-'),
      value: `${m}-${endYear}`,
    });
  }
  return months;
};

const SalaryTable: React.FC = () => {
  // All hooks must be declared before any early return
  const fys = getFinancialYears();
  const [selectedFY, setSelectedFY] = useState(fys[0].value);
  const fyMonths = getMonthsForFY(selectedFY);
  const [selectedMonth, setSelectedMonth] = useState(fyMonths[0].value);
  const [selectedObj, setSelectedObj] = useState(() => {
    const [month, year] = fyMonths[0].value.split('-').map(Number);
    return { month, year };
  });
  const [viewSalary, setViewSalary] = useState<SalaryPayment | null>(null);
  const { data: user, isLoading: isUserLoading } = useGetCurrentUser();
  const { data = [], isLoading, refetch } = useGetSalaries(
    selectedObj.month,
    selectedObj.year,
    user?.id,
    { enabled: !!user?.id }
  );
  const { data: employees = [], isLoading: isLoadingEmployees } = useGetEmployees(user?.id, { enabled: !!user?.id });
  const generateAllMutation = useGenerateAllSalaries();
  const regenerateSalaryMutation = useRegenerateSalary();

  // Now do your early return
  if (isUserLoading || !user) {
    return <div>Loading...</div>;
  }

  // const fyMonths = getMonthsForFY(selectedFY);
  // const [selectedMonth, setSelectedMonth] = useState(fyMonths[0].value);
  // const [selectedObj, setSelectedObj] = useState(() => {
  //   const [month, year] = fyMonths[0].value.split('-').map(Number);
  //   return { month, year };
  // });

  // Handler for regenerate all button
  const handleRegenerateAll = () => {
    regenerateSalaryMutation.mutate({
      month: selectedObj.month,
      year: selectedObj.year,
      managerId: user.id
    }, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const handleGenerateAll = () => {
    generateAllMutation.mutate({
      month: selectedObj.month,
      year: selectedObj.year,
      managerId: user.id,
    }, {
      onSuccess: () => {
        refetch();
      },
    });
  };


  // Handler for individual generate button
  const handleGenerateIndividual = (employeeId: number) => {
    generateAllMutation.mutate({
      month: selectedObj.month,
      year: selectedObj.year,
      userId: employeeId,
      // Do NOT send managerId here
    }, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  // Example columns for the salary table
  const getSalaryColumns = (showPlaceholders: boolean): ColumnDef<SalaryPayment>[] => [
    { accessorKey: 'userName', header: 'Employee Name' },
    { accessorKey: 'totalAdvancePaid', header: 'Advance Payment', cell: info => showPlaceholders ? '-' : `$${info.getValue()}` },
    { accessorKey: 'netPayable', header: 'Payment Amount', cell: info => showPlaceholders ? '-' : `$${info.getValue()}` },
    { accessorKey: 'paymentDate', header: 'Payment Date', cell: info => showPlaceholders ? '-' : info.getValue() },
    {
      header: 'Action',
      id: 'action',
      cell: ({ row }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            type="button"
            onClick={() => setViewSalary(row.original)}
            className="p-1 text-gray-600 hover:text-blue-600 focus:outline-none"
            title="View Salary Details"
          >
            {/* Heroicons Eye Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
          <button
            onClick={() => {
              if (showPlaceholders) {
                handleGenerateIndividual(row.original.userId);
              } else {
                regenerateSalaryMutation.mutate({
                  month: selectedObj.month,
                  year: selectedObj.year,
                  userId: row.original.userId,
                }, {
                  onSuccess: () => {
                    refetch();
                  },
                });
              }
            }}
            style={{ padding: '4px 12px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {showPlaceholders ? 'Generate' : 'Regenerate'}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Modal for SalaryCard */}
      {viewSalary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full relative">
            <button
              onClick={() => setViewSalary(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              aria-label="Close"
            >
              &times;
            </button>
            <SalaryCard salary={viewSalary} />
          </div>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, marginBottom: 16, width: '100%' }}>
        <SelectField
          label="Financial Year"
          name="financial-year"
          options={fys}
          value={selectedFY}
          onChange={val => {
            setSelectedFY(val);
            const months = getMonthsForFY(val);
            setSelectedMonth(months[0].value);
            const [month, year] = months[0].value.split('-').map(Number);
            setSelectedObj({ month, year });
          }}
        />
        <SelectField
          label="Select Month"
          name="salary-month"
          options={fyMonths}
          value={selectedMonth}
          onChange={val => {
            setSelectedMonth(val);
            const [month, year] = val.split('-').map(Number);
            setSelectedObj({ month, year });
          }}
        />
        {data.length === 0 ? (
          <Button
            variant={ButtonVariant.Solid}
            onClick={handleGenerateAll}
            className="h-10 mt-6"
            testId="generate-all-button"
            disabled={isLoadingEmployees || generateAllMutation.isPending}
          >
            {generateAllMutation.isPending ? 'Generating...' : 'Generate All'}
          </Button>
        ) : (
          <Button
            variant={ButtonVariant.Solid}
            onClick={handleRegenerateAll}
            className="h-10 mt-6"
            testId="regenerate-all-button"
            disabled={isLoadingEmployees || regenerateSalaryMutation.isPending}
          >
            {regenerateSalaryMutation.isPending ? 'Regenerating...' : 'Regenerate All'}
          </Button>
        )}
      </div>
      {/* Show salary table if data exists, otherwise show employee table for generation */}
      {data.length > 0 ? (
        <Table columns={getSalaryColumns(false)} data={data} testId="salary-table" />
      ) : (
          <Table
            columns={getSalaryColumns(true)}
            data={employees.map(emp => ({
              totalPayableAmount: 0,
              totalAdvancePaid: 0,
              netPayable: 0,
              singleDayWorkingCount: 0,
              doubleDayWorkingCount: 0,
              singleMachineSalary: 0,
              doubleMachineSalary: 0,
              userId: emp.id,
              userName: emp.name,
            })) as SalaryPayment[]}
            testId="salary-table"
          />
      )}
      {(isLoading || isLoadingEmployees) && <div>Loading...</div>}
    </div>
  );
};



export { SalaryTable };

