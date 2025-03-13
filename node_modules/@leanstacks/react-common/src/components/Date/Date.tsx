import React from 'react';
import dayjs from 'dayjs';

import { DateFormat, DateProps } from './Date.types';

/**
 * The `Date` React component formats and renders a date. Use the `format`
 * property to apply a pattern to format the date.
 * @param {Date} props - Component properties, `DateProps`.
 * @returns {JSX.Element} JSX
 */
const Date: React.FC<DateProps> = ({
  className,
  date,
  testId = 'date',
  format = DateFormat.DATE,
}: DateProps): JSX.Element => {
  return (
    <span className={className} data-testid={testId}>
      {dayjs(date).format(format)}
    </span>
  );
};

export default Date;
