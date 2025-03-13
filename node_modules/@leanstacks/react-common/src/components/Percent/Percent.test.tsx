import React from 'react';
import { render, screen } from '@testing-library/react';

import Percent from './Percent';
import { SignDisplay } from '../../utils';

describe('Percent', () => {
  it('should render successfully', () => {
    render(<Percent value={0.12345678} />);

    expect(screen.getByTestId('percent')).toBeDefined();
  });

  it('should use custom test ID', () => {
    render(<Percent value={0.12345678} testId="custom-testid" />);

    expect(screen.queryByTestId('percent')).toBeNull();
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use classes from className property', () => {
    render(<Percent value={0.12345678} className="custom-class" />);

    expect(screen.getByTestId('percent').classList).toContain('custom-class');
  });

  it('should show a minimum number of decimal places', () => {
    render(<Percent value={0.12} minimumFractionDigits={2} />);

    expect(screen.getByTestId('percent').textContent).toBe('12.00%');
  });

  it('should show a maximum number of decimal places', () => {
    render(<Percent value={0.12345678} maximumFractionDigits={2} />);

    expect(screen.getByTestId('percent').textContent).toBe('12.35%');
  });

  it('should always show sign', () => {
    render(
      <div>
        <Percent testId="positive" value={0.12} signDisplay={SignDisplay.Always} />
        <Percent testId="negative" value={-0.12} signDisplay={SignDisplay.Always} />
        <Percent testId="zero" value={0} signDisplay={SignDisplay.Always} />
      </div>,
    );

    expect(screen.getByTestId('positive').textContent).toBe('+12%');
    expect(screen.getByTestId('negative').textContent).toBe('-12%');
    expect(screen.getByTestId('zero').textContent).toBe('+0%');
  });
});
