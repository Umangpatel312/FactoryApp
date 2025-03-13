import { PropsWithClassName, PropsWithTestId } from '../../utils/types';

/**
 * Properties for the `DayOfTheWeek` component.
 * @param {string|number} date - The date value expressed as an ISO 8601 date string or as a number of milliseconds.
 * @param {boolean} [relative] - Optional. Indicates if the day of the week should be expressed relative to the current day, i.e. `Yesterday`, `Today`, `Tomorrow`.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 * @see {@link https://en.wikipedia.org/wiki/ISO_8601 | ISO 8601}
 */
export interface DayOfTheWeekProps extends PropsWithClassName, PropsWithTestId {
  date: string | number;
  relative?: boolean;
}
