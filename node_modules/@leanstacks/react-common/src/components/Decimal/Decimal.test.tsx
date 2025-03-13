import React from 'react';
import { render, screen } from '@testing-library/react';

import Decimal from './Decimal';
import { SignDisplay, Unit, UnitDisplay } from '../../utils/constants';

describe('Decimal', () => {
  it('should render successfully', () => {
    render(<Decimal value={3.1415} />);

    expect(screen.getByTestId('decimal')).toBeDefined();
  });

  it('should use custom test ID', () => {
    render(<Decimal value={3.1415} testId="custom-testid" />);

    expect(screen.queryByTestId('decimal')).toBeNull();
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use classes from className property', () => {
    render(<Decimal value={3.1415} className="custom-class" />);

    expect(screen.getByTestId('decimal').classList).toContain('custom-class');
  });

  it('should render integer value as decimal', () => {
    render(<Decimal value={3} minimumFractionDigits={1} />);

    expect(screen.getByTestId('decimal').textContent).toBe('3.0');
  });

  it('should render decimal with units', () => {
    render(<Decimal value={3.1415} unit={Unit.Centimeter} />);

    expect(screen.getByTestId('decimal').textContent).toBe('3.142 cm');
  });

  it('should render decimal with units and unit display', () => {
    render(<Decimal value={3.1415} unit={Unit.Centimeter} unitDisplay={UnitDisplay.Narrow} />);

    expect(screen.getByTestId('decimal').textContent).toBe('3.142cm');
  });

  it('should render with minimum fraction digits', () => {
    render(<Decimal value={3.1415} minimumFractionDigits={6} />);

    expect(screen.getByTestId('decimal').textContent).toBe('3.141500');
  });

  it('should render with maximum fraction digits', () => {
    render(<Decimal value={3.1415} maximumFractionDigits={1} />);

    expect(screen.getByTestId('decimal').textContent).toBe('3.1');
  });

  it('should render with sign displayed always', () => {
    render(
      <div>
        <Decimal testId="positive" value={3.1415} signDisplay={SignDisplay.Always} />
        <Decimal testId="negative" value={-3.1415} signDisplay={SignDisplay.Always} />
        <Decimal testId="zero" value={0} signDisplay={SignDisplay.Always} />
      </div>,
    );

    expect(screen.getByTestId('positive').textContent).toBe('+3.142');
    expect(screen.getByTestId('negative').textContent).toBe('-3.142');
    expect(screen.getByTestId('zero').textContent).toBe('+0');
  });

  it('should render with a sign only on negative values', () => {
    render(
      <div>
        <Decimal testId="positive" value={3.1415} signDisplay={SignDisplay.Auto} />
        <Decimal testId="negative" value={-3.1415} signDisplay={SignDisplay.Auto} />
        <Decimal testId="zero" value={0} signDisplay={SignDisplay.Auto} />
      </div>,
    );

    expect(screen.getByTestId('positive').textContent).toBe('3.142');
    expect(screen.getByTestId('negative').textContent).toBe('-3.142');
    expect(screen.getByTestId('zero').textContent).toBe('0');
  });

  it('should render with no sign', () => {
    render(
      <div>
        <Decimal testId="positive" value={3.1415} signDisplay={SignDisplay.Never} />
        <Decimal testId="negative" value={-3.1415} signDisplay={SignDisplay.Never} />
        <Decimal testId="zero" value={0} signDisplay={SignDisplay.Never} />
      </div>,
    );

    expect(screen.getByTestId('positive').textContent).toBe('3.142');
    expect(screen.getByTestId('negative').textContent).toBe('3.142');
    expect(screen.getByTestId('zero').textContent).toBe('0');
  });

  it('should render with sign displayed except for zero', () => {
    render(
      <div>
        <Decimal testId="positive" value={3.1415} signDisplay={SignDisplay.ExceptZero} />
        <Decimal testId="negative" value={-3.1415} signDisplay={SignDisplay.ExceptZero} />
        <Decimal testId="zero" value={0} signDisplay={SignDisplay.ExceptZero} />
      </div>,
    );

    expect(screen.getByTestId('positive').textContent).toBe('+3.142');
    expect(screen.getByTestId('negative').textContent).toBe('-3.142');
    expect(screen.getByTestId('zero').textContent).toBe('0');
  });
});
