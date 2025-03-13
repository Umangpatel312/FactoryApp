/**
 * Formats a number using `Intl.NumberFormat`.
 * @param {number} value - The value to format.
 * @param {Object} [options] - Optional options object.
 * @param {string} [locale] - Optional locale.
 * @returns {string} The formatted value.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options | NumberFormatOptions}
 */
export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions,
  locale?: string,
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}
