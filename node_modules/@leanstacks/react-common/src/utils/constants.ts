/**
 * ISO 4217 Currency Codes
 * @see {@link https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes | ISO 4217 Currency Codes}
 */
export enum CurrencyCode {
  CAD = 'CAD', // Canadian Dollar
  EUR = 'EUR', // Euro
  GBP = 'GBP', // Pound sterling (Great Britian)
  MXN = 'MXN', // Mexican Peso
  USD = 'USD', // US Dollar
}

/**
 * Possible `currencyDisplay` values to use with `Intl.NumberFormat`.
 * Default: `symbol`.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options | NumberFormatOptions}
 */
export enum CurrencyDisplay {
  Code = 'code',
  Name = 'name',
  NarrowSymbol = 'narrowSymbol',
  Symbol = 'symbol',
}

/**
 * Possible `currencySign` values to use with `Intl.NumberFormat`.
 * Default: `standard`.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options | NumberFormatOptions}
 */
export enum CurrencySign {
  Accounting = 'accounting',
  Standard = 'standard',
}

/**
 * Possible `signDisplay` values to use with `Intl.NumberFormat`. By default,
 * display sign for negative numbers only, including negative zero. Default: `auto`.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options | NumberFormatOptions}
 */
export enum SignDisplay {
  Auto = 'auto',
  Always = 'always',
  ExceptZero = 'exceptZero',
  Never = 'never',
}

/**
 * Possible `unit` values to use with "unit" formatting style using `Intl.NumberFormat`.
 * @see {@link https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers | ECMA Units of Measurement }
 */
export enum Unit {
  Celsius = 'celsius',
  Centimeter = 'centimeter',
  Fahrenheit = 'fahrenheit',
  Inch = 'inch',
  Kilometer = 'kilometer',
  KilometerPerHour = 'kilometer-per-hour',
  Mile = 'mile',
  MilePerHour = 'mile-per-hour',
  Millimeter = 'millimeter',
  Percent = 'percent',
}

/**
 * Possible `unitDisplay` values to use with "unit" formatting style using
 * `Intl.NumberFormat`. Default: `short`, e.g. "10 cm".
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options | NumberFormatOptions}
 */
export enum UnitDisplay {
  Long = 'long',
  Narrow = 'narrow',
  Short = 'short',
}
