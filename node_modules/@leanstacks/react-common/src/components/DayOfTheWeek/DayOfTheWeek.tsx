import React from 'react';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isYesterday from 'dayjs/plugin/isYesterday';

import { Date } from '../Date';
import { DateFormat } from '../Date';
import { DayOfTheWeekProps } from './DayOfTheWeek.types';

dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(isYesterday);

const TODAY = 'Today';
const TOMORROW = 'Tomorrow';
const YESTERDAY = 'Yesterday';

/**
 * The `DayOfTheWeek` React component renders the day of the week,
 * e.g. `Monday`, for the supplied date value.
 * @param {DayOfTheWeekProps} props - Component properties, `DayOfTheWeekProps`.
 * @returns {JSX.Element} JSX
 */
const DayOfTheWeek: React.FC<DayOfTheWeekProps> = ({
  className,
  date,
  relative = false,
  testId = 'day-of-the-week',
}: DayOfTheWeekProps): JSX.Element => {
  if (relative) {
    let relativeDayOfTheWeek: string | null = null;
    const theDate = dayjs(date);
    if (theDate.isYesterday()) {
      relativeDayOfTheWeek = YESTERDAY;
    } else if (theDate.isToday()) {
      relativeDayOfTheWeek = TODAY;
    } else if (theDate.isTomorrow()) {
      relativeDayOfTheWeek = TOMORROW;
    }

    if (relativeDayOfTheWeek) {
      return (
        <span className={className} data-testid={testId}>
          {relativeDayOfTheWeek}
        </span>
      );
    }
  }

  return <Date date={date} format={DateFormat.DAY_OF_WEEK} className={className} testId={testId} />;
};

export default DayOfTheWeek;
