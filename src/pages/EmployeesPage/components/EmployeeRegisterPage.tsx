import Page from 'common/components/Page/Page';
import EmployeeForm from 'pages/SignupPage/components/EmployeeForm';


/**
 * The `SignupPage` component renders the content for a user authentication
 * page.
 * @returns {JSX.Element} JSX
 */
const EmployeeRegisterPage = (): JSX.Element => {

  return (
    <Page testId="page-signin">
      <div className="container mx-auto min-h-[50vh]">
        <div className="my-6">
          <EmployeeForm />
        </div>
      </div>
    </Page>
  );
};

export default EmployeeRegisterPage;
