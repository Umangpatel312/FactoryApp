import React, { useMemo } from 'react';

import { DecimalProps } from './Decimal.types';
import { formatNumber } from '../../utils/numbers';

/**
 * The `Decimal` React component formats and renders a decimal number.
 * @param {DecimalProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const Decimal: React.FC<DecimalProps> = ({
  className,
  maximumFractionDigits,
  minimumFractionDigits,
  signDisplay,
  unit,
  unitDisplay,
  value,
  testId = 'decimal',
}: DecimalProps): JSX.Element => {
  const val = useMemo(() => {
    const formatOptions: Intl.NumberFormatOptions = {
      maximumFractionDigits,
      minimumFractionDigits,
      signDisplay,
    };
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
  }, [value, maximumFractionDigits, minimumFractionDigits, signDisplay, unit, unitDisplay]);

  return (
    <span className={className} data-testid={testId}>
      {val}
    </span>
  );
};

export default Decimal;
