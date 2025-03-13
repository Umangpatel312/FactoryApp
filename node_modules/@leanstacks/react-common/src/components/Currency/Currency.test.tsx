import React from 'react';
import { render, screen } from '@testing-library/react';

import Currency from './Currency';
import { CurrencyCode, CurrencyDisplay, CurrencySign } from '../../utils/constants';

describe('Currency', () => {
  it('should render successfully', () => {
    render(<Currency value={19.99} />);

    expect(screen.getByTestId('currency')).toBeDefined();
  });

  it('should use custom test ID', () => {
    render(<Currency value={19.99} testId="custom-testid" />);

    expect(screen.queryByTestId('currency')).toBeNull();
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use classes from className property', () => {
    render(<Currency value={19.99} className="custom-class" />);

    expect(screen.getByTestId('currency').classList).toContain('custom-class');
  });

  it('should use default currency code', () => {
    render(<Currency value={19.99} />);

    expect(screen.getByTestId('currency').textContent).toBe('$19.99');
  });

  it('should use specified currency code', () => {
    render(<Currency value={19.99} currency={CurrencyCode.CAD} />);

    expect(screen.getByTestId('currency').textContent).toBe('CA$19.99');
  });

  it('should use default currency display', () => {
    render(<Currency value={19.99} currency={CurrencyCode.CAD} />);

    expect(screen.getByTestId('currency').textContent).toBe('CA$19.99');
  });

  it('should use specified currency display', () => {
    render(
      <Currency value={19.99} currency={CurrencyCode.CAD} currencyDisplay={CurrencyDisplay.Name} />,
    );

    expect(screen.getByTestId('currency').textContent).toBe('19.99 Canadian dollars');
  });

  it('should use default currency sign', () => {
    render(<Currency value={-19.99} />);

    expect(screen.getByTestId('currency').textContent).toBe('-$19.99');
  });

  it('should use accounting currency sign', () => {
    render(<Currency value={-19.99} currencySign={CurrencySign.Accounting} />);

    expect(screen.getByTestId('currency').textContent).toBe('($19.99)');
  });
});
