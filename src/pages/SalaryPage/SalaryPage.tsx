import { usePage } from "common/hooks/usePage";
import React, { useEffect } from "react";
import { SalaryTable } from "./SalaryTable";
import Tabs from "common/components/Tabs/Tabs";
import AdvanceSalaryTable from "./AdvanceSalaryTable";

const SalaryPage: React.FC = () => {
  const { setPageTitle } = usePage();
  useEffect(() => {
    setPageTitle("Salary");
  }, [setPageTitle]);
  return (
    <div> 
      <Tabs
        tabs={[{ label: "Salary", testId: "tab-salary" }, { label: "Advance Salary", testId: "tab-advance-salary" }]}
        tabContents={[
          { children: <SalaryTable /> },
          { children: <AdvanceSalaryTable /> },
        ]}
      />
    </div>
  );
};

export default SalaryPage;
