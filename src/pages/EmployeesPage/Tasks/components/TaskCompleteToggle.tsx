import {
  Button,
  ButtonVariant,
  PropsWithClassName,
  PropsWithTestId,
} from '@leanstacks/react-common';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Task } from 'pages/UsersPage/api/useGetUserTasks';
import { useUpdateTask } from '../api/useUpdateTask';
import { useToasts } from 'common/hooks/useToasts';
import FAIcon from 'common/components/Icon/FAIcon';

/**
 * Propeties for the `TaskCompleteToggle` component.
 * @param {Task} task - A Task object.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface TaskCompleteToggleProps extends PropsWithClassName, PropsWithTestId {
  task: Task;
}

/**
 * The `TaskCompleteToggle` component renders a `Button` which allows a user
 * to toggle the value of the Task `complete` attribute.
 * @param {TaskCompleteToggleProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const TaskCompleteToggle = ({
  className,
  task,
  testId = 'toggle-task-complete',
}: TaskCompleteToggleProps): JSX.Element => {
  const { t } = useTranslation();
  const { mutate: updateTask, isPending } = useUpdateTask();
  const { createToast } = useToasts();

  const buttonTitle = task.completed
    ? t('task.markIncomplete', { ns: 'users' })
    : t('task.markComplete', { ns: 'users' });

  /**
   * Actions to perform when the task complete toggle button is clicked.
   */
  const handleButtonClick = () => {
    updateTask(
      {
        task: {
          ...task,
          completed: !task.completed,
        },
      },
      {
        onSuccess: (data) => {
          createToast({
            text: data.completed
              ? t('task.markedComplete', { ns: 'users' })
              : t('task.markedIncomplete', { ns: 'users' }),
            isAutoDismiss: true,
          });
        },
      },
    );
  };

  return (
    <Button
      className={classNames('!m-0 contents !border-none !p-0', className)}
      variant={ButtonVariant.Text}
      title={buttonTitle}
      onClick={handleButtonClick}
      disabled={isPending}
      data-testid={testId}
    >
      <FAIcon
        icon={task.completed ? 'circleCheck' : 'circleRegular'}
        className={classNames({ 'text-green-600': task.completed })}
        testId={`${testId}-icon`}
      />
    </Button>
  );
};

export default TaskCompleteToggle;
