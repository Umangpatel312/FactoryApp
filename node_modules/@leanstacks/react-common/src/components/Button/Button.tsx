import React from 'react';
import classNames from 'classnames';

import { ButtonProps, ButtonVariant } from './Button.types';

/**
 * The `Button` React componentformats and renders a styled button.
 * @param {ButtonProps} props - Component properties, `ButtonProps`.
 * @returns {JSX.Element} JSX
 */
const Button: React.FC<ButtonProps> = ({
  children,
  className,
  role = 'button',
  type = 'button',
  variant = ButtonVariant.Solid,
  testId = 'button',
  ...props
}: ButtonProps): JSX.Element => {
  const getVariantClasses = (variant: ButtonVariant): string => {
    switch (variant) {
      case ButtonVariant.Outline:
        return 'border-neutral-700 dark:border-neutral-300';
      case ButtonVariant.Text:
        return 'border-transparent';
      case ButtonVariant.Solid:
      default:
        return 'border-neutral-700 bg-neutral-700 text-white dark:border-neutral-300 dark:bg-neutral-300 dark:text-neutral-900';
    }
  };

  return (
    <button
      className={classNames(
        'rounded-md border px-2 py-1 enabled:hover:opacity-80 disabled:opacity-50',
        getVariantClasses(variant),
        className,
      )}
      data-testid={testId}
      role={role}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
