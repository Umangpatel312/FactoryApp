import React, { useState, useMemo } from 'react';
import Table from 'common/components/Table/Table';
import { getFinancialYears, getMonthsForFY } from './SalaryTable';
import { ColumnDef } from '@tanstack/react-table';
import { useGetAdvanceSalaries, AdvanceSalary } from './api/useGetAdvanceSalaries';
import SelectField from 'common/components/Form/SelectField';
import { useGetEmployees } from 'pages/EmployeesPage/api/useGetEmployees';
import { useSaveAdvanceSalary } from './api/useSaveAdvanceSalary';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from 'common/components/Form/TextField';
import Button from 'common/components/Button/Button';
import { ButtonVariant } from '@leanstacks/react-common';
import { useGetCurrentUser } from 'common/api/useGetUserRoles';
import { useGetUseRoles } from 'common/api/useGetUseRoles';

const initialValues = { employee: '', amount: '' };
const validationSchema = Yup.object({
  employee: Yup.string().required('Employee is required'),
  amount: Yup.number().typeError('Amount must be a number').required('Amount is required').min(1, 'Amount must be positive'),
});

const AdvanceSalaryTable: React.FC = () => {
  const fys = getFinancialYears();
  const [selectedFY, setSelectedFY] = useState(fys[0].value);
  const fyMonths = getMonthsForFY(selectedFY);
  const [selectedMonth, setSelectedMonth] = useState(fyMonths[0].value);

  const [selectedEmployeeFilter, setSelectedEmployeeFilter] = useState('');

  // Columns for AdvanceSalary table
  const advanceSalaryColumns: ColumnDef<AdvanceSalary>[] = [
    { accessorKey: 'userName', header: 'Employee Name', cell: info => info.getValue() ?? '-' },
    { accessorKey: 'advanceSalaryAmount', header: 'Advance Amount', cell: info => info.getValue() != null ? `₹${info.getValue()}` : '-' },
    { accessorKey: 'paidByUserName', header: 'Paid By', cell: info => info.getValue() ?? '-' },
    { accessorKey: 'advanceSalaryDate', header: 'Date', cell: info => {
        const val = info.getValue();
        if (!val) return '-';
        const date = new Date(val as number);
        return date.toLocaleDateString();
      }
    },
  ];

  // Parse month and year from selectedMonth
  const [month, year] = selectedMonth.split('-').map(Number);

  // All filters must be selected
  const allFiltersSelected = Boolean(selectedFY && selectedMonth && selectedEmployeeFilter);

  // Only fetch data if all filters are selected
  const { data: advanceSalaries = [], isLoading } = useGetAdvanceSalaries(
    allFiltersSelected ? month : undefined,
    allFiltersSelected ? year : undefined,
    allFiltersSelected ? Number(selectedEmployeeFilter) : undefined,
    { enabled: allFiltersSelected }
  );

  // No need for manual filtering, API does it
  const filteredData = advanceSalaries;


  // Employee dropdown logic (copied from AttendenceList)
  const roles = useGetUseRoles();
  const { data: user } = useGetCurrentUser();
  const isEmployee = roles.data?.includes('EMPLOYEE');
  const {
    data: employees,
    isPending: isEmployeePending
  } = !isEmployee ? useGetEmployees(user?.id) : { data: undefined, isPending: false };
  const { mutate: saveAdvanceSalary, isPending: saveAdvanceSalaryPending } = useSaveAdvanceSalary();
  const employeeOptions = useMemo(() => {
    if (isEmployee && user) {
      return [{ value: String(user.id), label: user.name }];
    }
    return employees?.map((employee: { id: number; name: string }) => ({
      value: String(employee.id),
      label: employee.name
    })) ?? [];
  }, [employees, user, isEmployee]);

  const [showForm, setShowForm] = useState(false);
  // const [selectedEmployeeFilter, setSelectedEmployeeFilter] = useState('');

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-4 justify-between items-end w-full">
        {/* Collapsible Add Advance Salary Form */}
        <div className="w-full md:w-1/2">
          {!showForm && (
            <Button
              type="button"
              variant={ButtonVariant.Text}
              className="mb-2 w-full sm:w-52 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
              onClick={() => setShowForm(true)}
              testId="advance-toggle-form"
            >
              Add Advance Salary
            </Button>
          )}
          <div
            className={`transition-all duration-300 overflow-hidden ${showForm ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
          >
            {showForm && (
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                  if (!user?.id) return;
                  saveAdvanceSalary({
                    userId: Number(values.employee),
                    advanceSalaryAmount: Number(values.amount),
                    paidByUserId: user.id,
                  }, {
                    onSuccess: () => {
                      resetForm();
                      setShowForm(false);
                    }
                  });
                }}
              >
                {({ values, handleChange, setFieldValue }) => (
                  <Form className="flex gap-2 items-end mt-2 relative">
                    <div className="flex flex-col w-1/2">
                      <SelectField
                        label="Employee"
                        name="employee"
                        options={employeeOptions}
                        value={values.employee}
                        onChange={val => setFieldValue('employee', val)}
                        className="min-w-[160px]"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <TextField
                        label="Advance Amount"
                        name="amount"
                        value={values.amount}
                        onChange={handleChange}
                        className="min-w-[120px]"
                        type="number"
                      />
                    </div>
                    <Button
                      type="submit"
                      variant={ButtonVariant.Text}
                      disabled={saveAdvanceSalaryPending}
                      className="bg-green-700 hover:bg-green-800 text-white"
                    >
                      {saveAdvanceSalaryPending ? 'Saving...' : 'Save'}
                    </Button>
                    <Button
                      type="button"
                      variant={ButtonVariant.Text}
                      onClick={() => setShowForm(false)}
                      className="ml-2 text-red-500"
                    >
                      ×
                    </Button>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
        {/* Right: Filters */}
        <div className="flex gap-4 w-full md:w-auto justify-end">
          <SelectField
            label="Financial Year"
            name="financial-year"
            options={fys}
            value={selectedFY}
            onChange={val => {
              setSelectedFY(val);
              const months = getMonthsForFY(val);
              setSelectedMonth(months[0].value);
            }}
          />
          <SelectField
            label="Select Month"
            name="salary-month"
            options={fyMonths}
            value={selectedMonth}
            onChange={val => setSelectedMonth(val)}
          />
          <SelectField
            label="Employee"
            name="filter-employee"
            options={employeeOptions}
            value={selectedEmployeeFilter}
            onChange={val => setSelectedEmployeeFilter(val)}
            className="min-w-[160px]"
          />
        </div>
      </div>
      {/* Only show table if all filters are selected */}
      {allFiltersSelected ? (
        <Table columns={advanceSalaryColumns} data={filteredData} testId="advance-salary-table" />
      ) : (
        <div className="text-red-600 font-semibold p-6 text-center">Please select Financial Year, Month, and Employee to view advance salary data.</div>
      )}
    </div>
  );
};

export default AdvanceSalaryTable;
