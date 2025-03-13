import { PropsWithClassName, PropsWithTestId } from '../../utils/types';

/**
 * The `DateFormat` enumerates patterns for formatting dates.
 */
export enum DateFormat {
  DATE = 'MM/DD/YYYY',
  DAY_OF_WEEK = 'dddd',
  HOURS_AND_MINUTES = 'H[h] mm[m]',
  TIME = 'h:mma',
  TIMESTAMP_SHORT = 'h:mma ddd MMM D',
  TIMESTAMP = 'dddd MMMM D [at] h:mma',
}

/**
 * Properties for the `Date` component.
 * @param {string|number} date - The date value expressed as an ISO 8601 date string or as a number of milliseconds.
 * @param {DateFormat} [format] - Optional. The format of the Date. Default: `DATE`
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 * @see {@link https://en.wikipedia.org/wiki/ISO_8601 | ISO 8601}
 */
export interface DateProps extends PropsWithClassName, PropsWithTestId {
  date: string | number;
  format?: DateFormat;
}
