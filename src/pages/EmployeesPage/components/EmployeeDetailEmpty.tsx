import { ButtonVariant, PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import Button from 'common/components/Button/Button';

import MessageCard from 'common/components/Card/MessageCard';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Properties for the `UserDetailEmpty` component.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface EmployeeDetailEmptyProps extends PropsWithClassName, PropsWithTestId { }

/**
 * The `UserDetailEmpty` component renders a message when there is no specific
 * `User` selected.
 * @param {EmployeeDetailEmptyProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const EmployeeDetailEmpty = ({
  className,
  testId = 'user-detail-empty',
}: EmployeeDetailEmptyProps): JSX.Element => {

  const navigate = useNavigate();


  return (
    <div className={className} data-testid={testId}>
      <MessageCard
        className="mx-auto"
        iconProps={{ icon: 'circleInfo', size: '2x' }}
        message="Select a employee from the list to edit details or Use add button"
        testId={`${testId}-card-message`}
      />
      <div className='flex justify-center items-center'>
        <Button
          onClick={() => navigate("create")}
          variant={ButtonVariant.Text}
          className='w-full sm:w-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2'
        >Add Employee</Button>
      </div>

    </div>

  );
};

export default EmployeeDetailEmpty;
