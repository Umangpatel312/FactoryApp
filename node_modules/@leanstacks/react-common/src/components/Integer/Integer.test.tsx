import React from 'react';
import { render, screen } from '@testing-library/react';

import Integer from './Integer';
import { SignDisplay, Unit, UnitDisplay } from '../../utils/constants';

describe('Integer', () => {
  it('should render successfully', () => {
    render(<Integer value={1000} />);

    expect(screen.getByTestId('integer')).toBeDefined();
  });

  it('should use custom test ID', () => {
    render(<Integer value={1000} testId="custom-testid" />);

    expect(screen.queryByTestId('integer')).toBeNull();
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use classes from className property', () => {
    render(<Integer value={1000} className="custom-class" />);

    expect(screen.getByTestId('integer').classList).toContain('custom-class');
  });

  it('should render decimal value as integer', () => {
    render(<Integer value={1000.1234} />);

    expect(screen.getByTestId('integer').textContent).toBe('1,000');
  });

  it('should render integer with units', () => {
    render(<Integer value={1000} unit={Unit.Centimeter} />);

    expect(screen.getByTestId('integer').textContent).toBe('1,000 cm');
  });

  it('should render integer with units and unit display', () => {
    render(<Integer value={1000} unit={Unit.Centimeter} unitDisplay={UnitDisplay.Narrow} />);

    expect(screen.getByTestId('integer').textContent).toBe('1,000cm');
  });

  it('should render with sign displayed always', () => {
    render(
      <div>
        <Integer testId="positive" value={1000} signDisplay={SignDisplay.Always} />
        <Integer testId="negative" value={-1000} signDisplay={SignDisplay.Always} />
        <Integer testId="zero" value={0} signDisplay={SignDisplay.Always} />
      </div>,
    );

    expect(screen.getByTestId('positive').textContent).toBe('+1,000');
    expect(screen.getByTestId('negative').textContent).toBe('-1,000');
    expect(screen.getByTestId('zero').textContent).toBe('+0');
  });

  it('should render with sign only on negative values', () => {
    render(
      <div>
        <Integer testId="positive" value={1000} signDisplay={SignDisplay.Auto} />
        <Integer testId="negative" value={-1000} signDisplay={SignDisplay.Auto} />
        <Integer testId="zero" value={0} signDisplay={SignDisplay.Auto} />
      </div>,
    );

    expect(screen.getByTestId('positive').textContent).toBe('1,000');
    expect(screen.getByTestId('negative').textContent).toBe('-1,000');
    expect(screen.getByTestId('zero').textContent).toBe('0');
  });

  it('should render with no sign', () => {
    render(
      <div>
        <Integer testId="positive" value={1000} signDisplay={SignDisplay.Never} />
        <Integer testId="negative" value={-1000} signDisplay={SignDisplay.Never} />
        <Integer testId="zero" value={0} signDisplay={SignDisplay.Never} />
      </div>,
    );

    expect(screen.getByTestId('positive').textContent).toBe('1,000');
    expect(screen.getByTestId('negative').textContent).toBe('1,000');
    expect(screen.getByTestId('zero').textContent).toBe('0');
  });

  it('should render with sign displayed except for zero', () => {
    render(
      <div>
        <Integer testId="positive" value={1000} signDisplay={SignDisplay.ExceptZero} />
        <Integer testId="negative" value={-1000} signDisplay={SignDisplay.ExceptZero} />
        <Integer testId="zero" value={0} signDisplay={SignDisplay.ExceptZero} />
      </div>,
    );

    expect(screen.getByTestId('positive').textContent).toBe('+1,000');
    expect(screen.getByTestId('negative').textContent).toBe('-1,000');
    expect(screen.getByTestId('zero').textContent).toBe('0');
  });
});
