import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  testId?: string;
}

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  className,
  children,
  testId = 'modal',
}: PropsWithChildren<ModalProps>): JSX.Element => {
  if (!isOpen) return null;

  const modalSizes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={classNames(
          'bg-white rounded-lg shadow-lg p-6 relative',
          modalSizes[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
        data-testid={testId}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>
        {title && (
          <h2 className="text-lg font-semibold mb-4 text-gray-900">{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
};
