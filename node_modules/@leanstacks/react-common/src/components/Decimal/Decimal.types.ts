import { SignDisplay, Unit, UnitDisplay } from '../../utils/constants';
import { PropsWithClassName, PropsWithTestId } from '../../utils/types';

/**
 * Properties for the `Decimal` component.
 * @param {number} [minimumFractionDigits] - Optional. The minimum number of fraction digits to use. Default: `0`
 * @param {number} [maximumFractionDigits] - Optional. The maximum number of fraction digits to use. Default: the larger of `minimumFractionDigits` and `0`
 * @param {SignDisplay} [signDisplay] - Optional. When to display the sign for the number. Default: `auto`
 * @param {Unit} [unit] - Optional. When included, formatted value includes unit of measurement.
 * @param {UnitDisplay} [unitDisplay] - Optional. Display of the unit of measurement. Default: `short`
 * @param {number} value - The decimal value, e.g. `0.34` renders: 0.34
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options | NumberFormatOptions}
 */
export interface DecimalProps extends PropsWithClassName, PropsWithTestId {
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
  signDisplay?: SignDisplay;
  unit?: Unit;
  unitDisplay?: UnitDisplay;
  value: number;
}
