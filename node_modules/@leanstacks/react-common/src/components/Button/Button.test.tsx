import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Button from './Button';
import { ButtonVariant } from './Button.types';

describe('Button', () => {
  it('should render successfully', () => {
    render(<Button />);

    expect(screen.getByTestId('button')).toBeDefined();
  });

  it('should use custom test ID', () => {
    render(<Button testId="custom-testid" />);

    expect(screen.queryByTestId('button')).toBeNull();
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use classes from className property', () => {
    render(<Button className="custom-class" />);

    expect(screen.getByTestId('button').classList).toContain('custom-class');
  });

  it('should render Solid variant', () => {
    render(<Button variant={ButtonVariant.Solid} />);

    expect(screen.getByTestId('button').classList).toContain('bg-neutral-700');
  });

  it('should render Outline variant', () => {
    render(<Button variant={ButtonVariant.Outline} />);

    expect(screen.getByTestId('button').classList).toContain('border-neutral-700');
  });

  it('should render Text variant', () => {
    render(<Button variant={ButtonVariant.Text} />);

    expect(screen.getByTestId('button').classList).toContain('border-transparent');
  });

  it('should render Solid variant when variant not specified', () => {
    render(<Button />);

    expect(screen.getByTestId('button').classList).toContain('bg-neutral-700');
  });

  it('should have default type', () => {
    render(<Button />);

    expect(screen.getByTestId('button').getAttribute('type')).toBe('button');
  });

  it('should have submit type', () => {
    render(<Button type="submit" />);

    expect(screen.getByTestId('button').getAttribute('type')).toBe('submit');
  });

  it('should have reset type', () => {
    render(<Button type="reset" />);

    expect(screen.getByTestId('button').getAttribute('type')).toBe('reset');
  });

  it('should have default role', () => {
    render(<Button />);

    expect(screen.getByTestId('button').getAttribute('role')).toBe('button');
  });

  it('should have custom role', () => {
    render(<Button role="search" />);

    expect(screen.getByTestId('button').getAttribute('role')).toBe('search');
  });

  it('should have title', () => {
    render(<Button title="custom-title" />);

    expect(screen.getByTestId('button').getAttribute('title')).toBe('custom-title');
  });

  it('should be disabled', () => {
    render(<Button disabled />);

    expect(screen.getByTestId('button').getAttribute('disabled')).not.toBeNull();
  });

  it('should call click handler function', () => {
    const mockClickHandler = jest.fn();

    render(<Button onClick={mockClickHandler} />);
    fireEvent.click(screen.getByTestId('button'));

    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });

  it('should not call click handler function when disabled', () => {
    const mockClickHandler = jest.fn();

    render(<Button onClick={mockClickHandler} disabled />);
    fireEvent.click(screen.getByTestId('button'));

    expect(mockClickHandler).not.toHaveBeenCalled();
  });
});
