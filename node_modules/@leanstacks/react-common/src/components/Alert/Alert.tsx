import React from 'react';
import classNames from 'classnames';
import { AlertProps, AlertVariant } from './Alert.types';

/**
 * The `Alert` React component formats and renders a styled message. Use the
 * `variant` property to apply predefined styles.
 * @param {AlertProps} props - Component properties, `AlertProps`.
 * @returns {JSX.Element} JSX
 */
const Alert: React.FC<AlertProps> = ({
  children,
  className,
  variant = AlertVariant.Info,
  testId = 'alert',
}: AlertProps): JSX.Element => {
  const getVariantClasses = (variant: AlertVariant): string => {
    switch (variant) {
      case AlertVariant.Error:
        return 'bg-red-800/90 text-white/80';
      case AlertVariant.Warning:
        return 'bg-amber-400/90 text-slate-900';
      case AlertVariant.Success:
        return 'bg-green-800/90 text-white/80';
      case AlertVariant.Info:
      default:
        return 'bg-blue-800/90 text-white/80';
    }
  };

  return (
    <div
      className={classNames('rounded-lg p-3', getVariantClasses(variant), className)}
      role="alert"
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export default Alert;
