import { Alert, AlertVariant, PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
import React, { useState, useEffect, PropsWithChildren } from 'react';
import FAIcon, { FAIconName } from '../Icon/FAIcon';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

interface AlertsProps extends PropsWithChildren, PropsWithClassName, PropsWithTestId {
  message: string;
  onClose: () => void;
  icon: FAIconName;
  size: SizeProp;
  variant: AlertVariant;
}


const AlertWithTimer = ({ message, onClose, icon, size, variant }: AlertsProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Alert
      variant={variant}
      className="mb-4 flex items-center gap-2 rounded-none"
    // testId={`${testId}-alert`}
    >
      <FAIcon icon={icon} size={size} />
      {message}
    </Alert>
  );
};
export default AlertWithTimer;
