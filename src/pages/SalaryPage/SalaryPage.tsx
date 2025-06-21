import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { usePage } from "common/hooks/usePage";
import React, { useEffect } from "react";
import { SalaryTable } from "./SalaryTable";
import Tabs from "common/components/Tabs/Tabs";
import AdvanceSalaryTable from "./AdvanceSalaryTable";
import Page from 'common/components/Page/Page';
import { useMediaQuery } from "react-responsive";
import FAIcon from 'common/components/Icon/FAIcon';
import Button from 'common/components/Button/Button';
import { ButtonVariant } from '@leanstacks/react-common';

const SalaryPage: React.FC = () => {
  const isMobile: boolean = useMediaQuery({ maxWidth: 768 });
  const location = useLocation();
  const navigate = useNavigate();
  const { setPageTitle } = usePage();
  
  useEffect(() => {
    setPageTitle("Salary");
  }, [setPageTitle]);

  const tabsContent = (
    <Tabs
      tabs={[
        { label: "Salary", testId: "tab-salary" }, 
        { label: "Advance Salary", testId: "tab-advance-salary" }
      ]}
      tabContents={[
        { children: <SalaryTable /> },
        { children: <AdvanceSalaryTable /> },
      ]}
    />
  );

  return (
    <Page testId="page-salary">
      <div className="container mx-auto my-4 min-h-[50vh]">
            {tabsContent}
        {/* <div className="my-6 hidden grid-cols-1 gap-8 md:grid md:grid-cols-7"> */}
          {/* <div className="md:col-span-3">
          </div>
          <div className="md:col-span-4">
            <Outlet />
          </div> */}
      </div>
    </Page>
  );
};

export default SalaryPage;
