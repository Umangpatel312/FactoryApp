import { ButtonVariant, PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import Button from 'common/components/Button/Button';

import MessageCard from 'common/components/Card/MessageCard';
import { useState } from 'react';
import MachineForm from './AttendenceOfEmployeeForm';
import { useNavigate } from 'react-router-dom';

/**
 * Properties for the `UserDetailEmpty` component.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface MachineDetailEmptyProps extends PropsWithClassName, PropsWithTestId { }

/**
 * The `UserDetailEmpty` component renders a message when there is no specific
 * `User` selected.
 * @param {MachineDetailEmptyProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const AttendenceDetailEmpty = ({
  className,
  testId = 'user-detail-empty',
}: MachineDetailEmptyProps): JSX.Element => {

  const navigate = useNavigate();


  return (
    <div className={className} data-testid={testId}>
      <MessageCard
        className="mx-auto"
        iconProps={{ icon: 'circleInfo', size: '2x' }}
        message="Select a machine from the list to edit details or Use add button"
        testId={`${testId}-card-message`}
      />
      <div className='flex justify-center items-center'>
        <Button
          onClick={() => navigate("create")}
          variant={ButtonVariant.Text}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-4'
        >Add Attendence</Button>
      </div>

    </div>

  );
};

export default AttendenceDetailEmpty;
