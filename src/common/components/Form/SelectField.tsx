import { InputHTMLAttributes, useEffect, useState, useRef } from 'react';
import { PropsWithTestId } from '@leanstacks/react-common';
import classNames from 'classnames';
import FAIcon from 'common/components/Icon/FAIcon';

export interface SelectFieldOption {
  label?: string;
  value: string;
}

interface SelectFieldProps extends Omit<InputHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value'>, PropsWithTestId {
  label?: string;
  name: string;
  onChange?: (value: string) => void;
  options: SelectFieldOption[];
  supportingText?: string;
  value?: string;
  error?: string;
}

const SelectField = ({
  className,
  label,
  name,
  onChange,
  options,
  supportingText,
  testId = 'field-select',
  value,
  error,
  ...props
}: SelectFieldProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const isDisabled = !!props.disabled || !!props.readOnly;

  const selectedOption = options.find(option => String(option.value) === String(value));
  const selectedLabel = selectedOption?.label ?? selectedOption?.value;

  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleSelect = (newValue: string) => {
    setIsExpanded(false);
    onChange?.(newValue);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateDropdownPosition = () => {
    if (!selectRef.current || !optionsRef.current) return;

    const selectRect = selectRef.current.getBoundingClientRect();
    const optionsHeight = optionsRef.current.scrollHeight;
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - selectRect.bottom;
    const spaceAbove = selectRect.top;

    // Check if dropdown should open upward
    const shouldOpenUpward = spaceBelow < optionsHeight && spaceAbove > spaceBelow;

    setDropdownStyle({
      maxHeight: '250px', // Set max height for scrolling
      position: 'fixed',
      width: selectRect.width,
      left: selectRect.left,
      [shouldOpenUpward ? 'bottom' : 'top']: shouldOpenUpward
        ? viewportHeight - selectRect.top
        : selectRect.bottom,
    });
  };

  useEffect(() => {
    if (isExpanded) {
      updateDropdownPosition();
      window.addEventListener('scroll', updateDropdownPosition);
      window.addEventListener('resize', updateDropdownPosition);
    }

    return () => {
      window.removeEventListener('scroll', updateDropdownPosition);
      window.removeEventListener('resize', updateDropdownPosition);
    };
  }, [isExpanded]);

  const renderOptions = () => (
    <div
      ref={optionsRef}
      style={dropdownStyle}
      className={classNames(
        'overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent',
        'absolute z-50 w-full rounded-md border border-gray-200 bg-white py-1 shadow-lg'
      )}
    >
      {options.map(({ label, value: optionValue }) => (
        <div
          key={optionValue}
          onClick={() => handleSelect(optionValue)}
          className={classNames(
            'flex cursor-pointer items-center px-4 py-2 text-sm transition-colors',
            {
              'bg-blue-50 text-blue-700': String(value) === String(optionValue),
              'text-gray-700 hover:bg-gray-50': String(value) !== String(optionValue)
            }
          )}
        >
          <span className="flex-grow">{label ?? optionValue}</span>
          {String(value) === String(optionValue) && (
            <FAIcon icon="check" className="ml-2 text-blue-600" />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className={classNames('relative', className)} ref={selectRef}>
      {label && (
        <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div
        onClick={() => !isDisabled && setIsExpanded(!isExpanded)}
        className={classNames(
          'relative flex min-h-[42px] cursor-pointer items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm transition-colors',
          {
            'cursor-not-allowed opacity-50': isDisabled,
            'border-red-300 ring-1 ring-red-300': error,
            'border-blue-500 ring-1 ring-blue-500': isExpanded,
            'hover:border-blue-400': !isDisabled && !error
          }
        )}
      >
        <span className={classNames('block truncate', {
          'text-gray-500': !selectedLabel
        })}>
          {selectedLabel || 'Select an option'}
        </span>
        <FAIcon
          icon="chevronDown"
          className={classNames(
            'ml-2 transition-transform duration-200',
            {
              'transform rotate-180': isExpanded
            }
          )}
        />
      </div>

      {/* Dropdown Options */}
      {isExpanded && renderOptions()}

      {/* Supporting Text */}
      {supportingText && !error && (
        <p className="mt-1 text-sm text-gray-500">
          {supportingText}
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectField;