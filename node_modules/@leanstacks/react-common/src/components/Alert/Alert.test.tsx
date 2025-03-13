import React from 'react';
import { render, screen } from '@testing-library/react';

import Alert from './Alert';
import { AlertVariant } from './Alert.types';

describe('Alert', () => {
  it('should render successfully', () => {
    render(<Alert />);

    expect(screen.getByTestId('alert')).toBeDefined();
  });

  it('should use custom test ID', () => {
    render(<Alert testId="custom-testid" />);

    expect(screen.queryByTestId('alert')).toBeNull();
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use classes from className property', () => {
    render(<Alert className="custom-class" />);

    expect(screen.getByTestId('alert').classList).toContain('custom-class');
  });

  it('should render the Info variant', () => {
    render(<Alert variant={AlertVariant.Info} />);

    expect(screen.getByTestId('alert').classList).toContain('bg-blue-800/90');
  });

  it('should render the Warning variant', () => {
    render(<Alert variant={AlertVariant.Warning} />);

    expect(screen.getByTestId('alert').classList).toContain('bg-amber-400/90');
  });

  it('should render the Error variant', () => {
    render(<Alert variant={AlertVariant.Error} />);

    expect(screen.getByTestId('alert').classList).toContain('bg-red-800/90');
  });

  it('should render the Success variant', () => {
    render(<Alert variant={AlertVariant.Success} />);

    expect(screen.getByTestId('alert').classList).toContain('bg-green-800/90');
  });

  it('should render the Info variant when variant not specified', () => {
    render(<Alert />);

    expect(screen.getByTestId('alert').classList).toContain('bg-blue-800/90');
  });

  it('should have role=alert', () => {
    render(<Alert />);

    expect(screen.getByTestId('alert').getAttribute('role')).toBe('alert');
  });
});
