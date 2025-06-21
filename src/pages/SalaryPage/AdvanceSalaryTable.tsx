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
import { useGetCurrentUser } from 'common/api/useGetCurrentUser';
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
        // Convert seconds to milliseconds by multiplying with 1000
        const date = new Date(Number(val) * 1000);
        return date.toLocaleDateString('en-GB'); // Use 'en-GB' for DD/MM/YYYY format
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
    <div className="w-full">
      {/* Filter Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full">
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="w-full">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Financial Year</label>
                <SelectField
                  name="financial-year"
                  options={fys}
                  value={selectedFY}
                  onChange={val => {
                    setSelectedFY(val);
                    const months = getMonthsForFY(val);
                    setSelectedMonth(months[0].value);
                  }}
                  className="w-full text-sm sm:text-base"
                />
              </div>
              <div className="w-full">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Month</label>
                <SelectField
                  name="salary-month"
                  options={fyMonths}
                  value={selectedMonth}
                  onChange={val => setSelectedMonth(val)}
                  className="w-full text-sm sm:text-base"
                />
              </div>
              <div className="w-full">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Employee</label>
                <SelectField
                  name="filter-employee"
                  options={employeeOptions}
                  value={selectedEmployeeFilter}
                  onChange={val => setSelectedEmployeeFilter(val)}
                  className="w-full text-sm sm:text-base"
                />
              </div>
              <div className="w-full flex items-end">
                {!showForm ? (
                  <Button
                    type="button"
                    variant={ButtonVariant.Text}
                    className="w-full text-white bg-green-600 hover:bg-green-700 text-sm h-10"
                    onClick={() => setShowForm(true)}
                    testId="advance-toggle-form"
                  >
                    Add Advance Salary
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Add Advance Salary Form */}
        <div className={`transition-all duration-300 overflow-hidden mt-4 ${showForm ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
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
                <Form className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end p-4 bg-gray-50 rounded-md">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Employee</label>
                    <SelectField
                      name="employee"
                      options={employeeOptions}
                      value={values.employee}
                      onChange={val => setFieldValue('employee', val)}
                      className="w-full text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Advance Amount</label>
                    <TextField
                      name="amount"
                      value={values.amount}
                      onChange={handleChange}
                      className="w-full text-sm sm:text-base"
                      type="number"
                    />
                  </div>
                  <div className="flex items-end gap-2 sm:col-span-2">
                    <Button
                      type="submit"
                      variant={ButtonVariant.Text}
                      disabled={saveAdvanceSalaryPending}
                      className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white text-sm h-10"
                    >
                      {saveAdvanceSalaryPending ? 'Saving...' : 'Save Advance'}
                    </Button>
                    <Button
                      type="button"
                      variant={ButtonVariant.Text}
                      onClick={() => setShowForm(false)}
                      className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm h-10"
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        ) : allFiltersSelected && filteredData.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="min-w-[800px] md:min-w-0">
              <Table 
                columns={advanceSalaryColumns} 
                data={filteredData} 
                testId="advance-salary-table"
                className="w-full border-0"
              />
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <p className="text-lg font-medium">No data available</p>
            <p className="mt-1">Please select Financial Year, Month, and Employee to view advance salary data.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvanceSalaryTable;
