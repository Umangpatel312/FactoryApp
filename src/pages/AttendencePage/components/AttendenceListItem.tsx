import { PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { Machine } from 'common/api/useGetMachine';
import { QRCodeCanvas } from "qrcode.react";
import FAIcon from 'common/components/Icon/FAIcon';
import Badge from 'common/components/Badge/Badge';


/**
 * Properties for the `UserListItem` component.
 * @param {Machine} user - A `User` object.
 * @param {boolean} [isActive] - Optional. Indicates if this is the currently
 * selected item in the list. Default: `false`.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
interface AttendenceListItemProps extends PropsWithClassName, PropsWithTestId {
  machine: Machine;
  isActive?: boolean;
}

/**
 * The `UserListItem` React component renders select `User` attributes to
 * create a selectable item within a list.
 *
 * When clicked, navigates to a route which displays the details of the
 * clicked `User`.
 * @param {AttendenceListItemProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const AttendenceListItem = ({
  className,
  isActive = false,
  testId = 'list-item-user',
  machine,
}: AttendenceListItemProps): JSX.Element => {
  const navigate = useNavigate();

  const doClick = () => {
    navigate(`edit/${machine.id}`);
  };

  const downloadQR = (e: React.MouseEvent<Element, MouseEvent>, qrId: number) => {
    e.stopPropagation();
    const canvas = document.getElementById(`qr-code-${qrId}`) as HTMLCanvasElement;
    if (!canvas) return;

    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `myqr-${qrId}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div
      className={classNames(
        'min-h-16 border-b-2 px-2 py-1.5 hover:cursor-pointer hover:border-b-blue-300 hover:dark:border-b-blue-600',
        { 'border-b-neutral-500/10': !isActive },
        { 'border-b-blue-300 dark:border-b-blue-600': isActive },
        className,
      )}
      onClick={() => doClick()}
      data-testid={testId}
    >
      <div className='flex justify-between gap-x-6 py-5'>
        <div className="flex min-w-0 gap-x-4">
          <div className="bg-white shadow-md rounded size-12 flex-none">
            <QRCodeCanvas id={`qr-code-${machine.id}`} value={`https://google.com/${machine.id}`} size={50} />
          </div>
          <div className="min-w-0 flex-auto">
            <div className="truncate">{machine.name}</div>

            <div className="truncate text-xs opacity-75">{machine.heads}/{machine.area}</div>
          </div>

        </div>
        <div>
          <Badge className={machine.isActive ? '!bg-blue-600 dark:!bg-blue-700' : '!bg-neutral-500 uppercase dark:!bg-neutral-300 dark:text-black'} testId='my-badge'>

            {machine.isActive ? "ACTIVE" : "INACTIVE"}
          </Badge>
        </div>

        <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
          <FAIcon id={`qr-download-${machine.id}`} icon='download' size='lg' onClick={(e) => downloadQR(e, machine.id)} />
        </div>
      </div>

    </div>
  );
};

export default AttendenceListItem;
