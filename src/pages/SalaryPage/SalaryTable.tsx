import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import Table from 'common/components/Table/Table';

import { useState } from 'react';
import { SalaryPayment, useGetSalaries } from './api/useGetSalaries';
import SalaryCard from './SalaryCard';
import { Modal } from 'common/components/Modal';
import { useRegenerateSalary } from './api/regenerateSalary';
import SelectField from 'common/components/Form/SelectField';
import { ButtonVariant } from '@leanstacks/react-common';
import Button from 'common/components/Button/Button';
import { useGetCurrentUser } from 'common/api/useGetCurrentUser';
import { useGetEmployees } from 'pages/EmployeesPage/api/useGetEmployees';
import { useGenerateAllSalaries } from './api/generateAllSalaries';

const getFinancialYears = () => {
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

const getMonthsForFY = (fy: string) => {
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
    { 
      accessorKey: 'userName', 
      header: 'Employee Name',
      cell: info => <div className="font-medium text-gray-900">{info.getValue() as string}</div>
    },
    { 
      accessorKey: 'totalAdvancePaid', 
      header: 'Advance', 
      cell: info => showPlaceholders ? '-' : 
        <div className="text-gray-700">${Number(info.getValue()).toLocaleString()}</div>
    },
    { 
      accessorKey: 'netPayable', 
      header: 'Net Payable', 
      cell: info => showPlaceholders ? '-' : 
        <div className="font-semibold text-gray-900">${Number(info.getValue()).toLocaleString()}</div>
    },
    { 
      accessorKey: 'paymentDate', 
      header: 'Payment Date', 
      cell: info => showPlaceholders ? '-' : 
        <div className="text-sm text-gray-500">{info.getValue() as string}</div> 
    },
    {
      header: 'Action',
      id: 'action',
      cell: ({ row }) => (
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          <button
            type="button"
            onClick={() => setViewSalary(row.original)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            title="View Salary Details"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
              <circle cx="12" cy="12" r="2.25" />
            </svg>
            View
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
            className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white ${
              showPlaceholders 
                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors`}
            disabled={regenerateSalaryMutation.isPending}
          >
            {regenerateSalaryMutation.isPending ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : showPlaceholders ? 'Generate' : 'Regenerate'}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* Modal for SalaryCard */}
      <Modal
        isOpen={!!viewSalary}
        onClose={() => setViewSalary(null)}
        title="Salary Details"
        size="lg"
      >
        {viewSalary && <SalaryCard salary={viewSalary} />}
      </Modal>
      
      {/* Filter Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-end md:justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="w-full">
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
            </div>
            <div className="w-full">
              <SelectField
                label="Month"
                name="month"
                options={fyMonths}
                value={selectedMonth}
                onChange={val => {
                  setSelectedMonth(val);
                  const [month, year] = val.split('-').map(Number);
                  setSelectedObj({ month, year });
                }}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2 sm:mt-0">
            {data.length > 0 ? (
              <Button
                onClick={handleRegenerateAll}
                disabled={regenerateSalaryMutation.isPending}
                className="w-full sm:w-auto text-sm"
              >
                {regenerateSalaryMutation.isPending ? 'Regenerating...' : 'Regenerate All'}
              </Button>
            ) : (
              <Button
                onClick={handleGenerateAll}
                disabled={generateAllMutation.isPending}
                className="w-full sm:w-auto text-sm"
              >
                {generateAllMutation.isPending ? 'Generating...' : 'Generate All'}
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* Show salary table if data exists, otherwise show employee table for generation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {isLoading || isLoadingEmployees ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        ) : data.length > 0 || employees.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="min-w-[800px] md:min-w-0">
              <Table 
                columns={getSalaryColumns(data.length === 0)} 
                data={data.length > 0 ? data : employees.map(emp => ({
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
                className="border-0 w-full"
              />
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <p className="text-lg font-medium">No data available</p>
            <p className="mt-1">Click "Generate All" to create salary records</p>
          </div>
        )}
      </div>
    </div>
  );
};



export { SalaryTable, getFinancialYears, getMonthsForFY };

