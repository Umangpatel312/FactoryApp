import { CurrencyCode, CurrencyDisplay, CurrencySign } from '../../utils/constants';
import { PropsWithClassName, PropsWithTestId } from '../../utils/types';

/**
 * Properties for the `Currency` component.
 * @param {CurrencyCode} [currency] - Optional. The ISO 4217 currency code. Default: `USD`.
 * @param {CurrencyDisplay} [currencyDisplay]  - Optional. How the currency is displayed. Default: `symbol`.
 * @param {CurrencySign} [currencySign] - Optional. How negative values are displayed. Default: `standard`.
 * @param {number} value - The amount.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options | NumberFormatOptions}
 */
export interface CurrencyProps extends PropsWithClassName, PropsWithTestId {
  currency?: CurrencyCode;
  currencyDisplay?: CurrencyDisplay;
  currencySign?: CurrencySign;
  value: number;
}
