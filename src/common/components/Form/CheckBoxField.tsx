import { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import { PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

/**
 * Properties for the `CheckBoxField` component.
 */
interface CheckBoxFieldProps extends InputHTMLAttributes<HTMLInputElement>, PropsWithTestId {
  label?: string;
  name: string;
  supportingText?: string;
}

/**
 * The `CheckBoxField` component renders an HTML `input` element of type `checkbox`.
 * It is used to capture boolean input from a user.
 * @param {CheckBoxFieldProps} props - Component properties, `CheckBoxFieldProps`.
 * @returns {JSX.Element} JSX
 */
const CheckBoxField = ({
  className,
  label,
  supportingText,
  testId = 'field-checkbox',
  ...props
}: CheckBoxFieldProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  const showError = meta.touched && meta.error;
  const isDisabled = !!props.disabled || !!props.readOnly;

  return (
    <div className={classNames('flex items-center', className)} data-testid={testId}>
      <input
        id={props.id ?? props.name}
        type="checkbox"
        className={classNames('form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out', {
          'opacity-50 cursor-not-allowed': isDisabled,
          'text-blue-400': isDisabled,

        })}
        {...field}
        {...props}
        ref={inputRef}
        data-testid={`${testId}-input`}
      />
      {label && (
        <label
          htmlFor={props.id ?? props.name}
          className={classNames('ml-2', { 'opacity-50': isDisabled })}
          data-testid={`${testId}-label`}
        >
          {label}
        </label>
      )}
      {supportingText && (
        <div className="ml-2 text-sm opacity-75" data-testid={`${testId}-supporting-text`}>
          {supportingText}
        </div>
      )}
      {showError && (
        <div className="ml-2 text-sm text-red-600" data-testid={`${testId}-error`}>
          {meta.error}
        </div>
      )}
    </div>
  );
};

export default CheckBoxField;