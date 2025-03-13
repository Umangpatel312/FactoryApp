import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';

import MessageCard from 'common/components/Card/MessageCard';

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
  return (
    <div className={className} data-testid={testId}>
      <MessageCard
        className="mx-auto"
        iconProps={{ icon: 'circleInfo', size: '2x' }}
        message="Select a user from the list to view details."
        testId={`${testId}-card-message`}
      />
    </div>
  );
};

export default EmployeeDetailEmpty;
