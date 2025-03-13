import React, { useMemo } from 'react';

import { IntegerProps } from './Integer.types';
import { formatNumber } from '../../utils/numbers';

/**
 * The `Integer` React component formats and renders an integer number.
 * @param {IntegerProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const Integer: React.FC<IntegerProps> = ({
  className,
  signDisplay,
  unit,
  unitDisplay,
  value,
  testId = 'integer',
}: IntegerProps): JSX.Element => {
  const val = useMemo(() => {
    const formatOptions: Intl.NumberFormatOptions = { maximumFractionDigits: 0, signDisplay };
    // if formatting with units
    if (unit) {
      return formatNumber(value, {
        style: 'unit',
        unit,
        unitDisplay,
        ...formatOptions,
      });
    }
    // everything else
    return formatNumber(value, formatOptions);
  }, [value, signDisplay, unit, unitDisplay]);

  return (
    <span className={className} data-testid={testId}>
      {val}
    </span>
  );
};

export default Integer;
