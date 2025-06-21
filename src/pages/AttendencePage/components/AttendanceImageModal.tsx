import { PropsWithChildren } from 'react';
import { Modal } from 'common/components/Modal';
import { useGetAttendanceImage } from '../api/useGetAttendanceImage';


interface AttendanceImageModalProps {
  attendanceId: number | null;
  onClose: () => void;
  isOpen: boolean;
}

export const AttendanceImageModal: React.FC<PropsWithChildren<AttendanceImageModalProps>> = ({
  attendanceId,
  onClose,
  isOpen
}) => {
  const { data: imageData, isLoading } = useGetAttendanceImage(attendanceId ?? 0);
  console.log("attendanceId", attendanceId);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Attendance Image"
      size="lg"
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        imageData && (
          <div className="flex items-center justify-center h-64">
            <img
              src={URL.createObjectURL(imageData)}
              alt="Attendance"
              className="max-h-full"
            />
          </div>
        )
      )}
    </Modal>
  );
};
