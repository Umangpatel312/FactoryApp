import { PropsWithClassName, PropsWithTestId } from '../../utils/types';
import { SignDisplay } from '../../utils';

/**
 * Properties for the `Percent` component.
 * @param {number} [minimumFractionDigits] - Optional. The minimum number of fraction digits to use. Default: `0`
 * @param {number} [maximumFractionDigits] - Optional. The maximum number of fraction digits to use. Default: the larger of `minimumFractionDigits` and `0`
 * @param {SignDisplay} [signDisplay] - Optional. When to display the sign for the number. Default: `auto`
 * @param {number} value - The percent as a decimal value, e.g. `0.34` renders 34%.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options NumberFormatOptions}
 */
export interface PercentProps extends PropsWithClassName, PropsWithTestId {
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
  signDisplay?: SignDisplay;
  value: number;
}
