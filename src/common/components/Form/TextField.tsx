import { InputHTMLAttributes, useRef } from 'react';
import { useField } from 'formik';
import { PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement>, PropsWithTestId {
  label?: string;
  name: string;
  supportingText?: string;
}

const TextField = ({
  className,
  label,
  supportingText,
  testId = 'field-text',
  ...props
}: TextFieldProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [field, meta] = useField(props);
  const showError = meta.touched && meta.error;
  const isDisabled = !!props.disabled || !!props.readOnly;

  return (
    <div className={classNames('relative w-full', className)} data-testid={testId}>
      <div className="relative">
        {label && (
          <label
            htmlFor={props.id ?? props.name}
            className={classNames(
              'absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-600 transition-all',
              {
                'text-red-500': showError,
                'text-gray-400': isDisabled
              }
            )}
            data-testid={`${testId}-label`}
          >
            {label}
          </label>
        )}

        <input
          id={props.id ?? props.name}
          ref={inputRef}
          className={classNames(
            'block w-full rounded-md border px-3 py-2 shadow-sm transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
            'placeholder:text-gray-400 text-gray-900',
            {
              'border-gray-300 hover:border-gray-400': !showError && !isDisabled,
              'border-red-300 ring-1 ring-red-300': showError,
              'bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed': isDisabled,
              'pr-10': showError || props.type === 'password'
            }
          )}
          {...field}
          {...props}
          data-testid={`${testId}-input`}
        />

        {showError && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Supporting Text */}
      {supportingText && !showError && (
        <p className="mt-1 text-sm text-gray-500" data-testid={`${testId}-supporting-text`}>
          {supportingText}
        </p>
      )}

      {/* Error Message */}
      {showError && (
        <p className="mt-1 text-sm text-red-600" data-testid={`${testId}-error`}>
          {meta.error}
        </p>
      )}
    </div>
  );
};

export default TextField;