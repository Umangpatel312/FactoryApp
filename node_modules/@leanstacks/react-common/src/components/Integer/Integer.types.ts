import { SignDisplay, Unit, UnitDisplay } from '../../utils/constants';
import { PropsWithClassName, PropsWithTestId } from '../../utils/types';

/**
 * Properties for the `Integer` component.
 * @param {SignDisplay} [signDisplay] - Optional. When to display the sign for the number. Default: `auto`
 * @param {Unit} [unit] - Optional. When included, formatted value includes unit of measurement.
 * @param {UnitDisplay} [unitDisplay] - Optional. Display of the unit of measurement. Default: `short`
 * @param {number} value - The integer value, e.g. `100`.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options NumberFormatOptions}
 */
export interface IntegerProps extends PropsWithClassName, PropsWithTestId {
  signDisplay?: SignDisplay;
  unit?: Unit;
  unitDisplay?: UnitDisplay;
  value: number;
}
