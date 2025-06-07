import React from 'react';

import { SalaryPayment } from './api/useGetSalaries';

interface SalaryCardProps {
  salary: SalaryPayment;
}

const SalaryCard: React.FC<SalaryCardProps> = ({ salary }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto my-6 font-sans">
      <h2 className="mb-5 text-2xl font-semibold text-blue-700 text-center">{salary.userName}</h2>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between text-base border-b border-gray-100 pb-2">
          <span>Total Payable Amount:</span>
          <span className="font-medium">₹{salary.totalPayableAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-base border-b border-gray-100 pb-2">
          <span>Total Advance Paid:</span>
          <span className="font-medium">₹{salary.totalAdvancePaid.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-base border-b border-gray-100 pb-2">
          <span>Net Payable:</span>
          <span className="font-medium">₹{salary.netPayable.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-base border-b border-gray-100 pb-2">
          <span>Single Day Working Count:</span>
          <span className="font-medium">{salary.singleDayWorkingCount}</span>
        </div>
        <div className="flex justify-between text-base border-b border-gray-100 pb-2">
          <span>Double Day Working Count:</span>
          <span className="font-medium">{salary.doubleDayWorkingCount}</span>
        </div>
        <div className="flex justify-between text-base border-b border-gray-100 pb-2">
          <span>Single Machine Salary:</span>
          <span className="font-medium">₹{salary.singleMachineSalary.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-base pb-2">
          <span>Double Machine Salary:</span>
          <span className="font-medium">₹{salary.doubleMachineSalary.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default SalaryCard;
