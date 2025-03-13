import React from 'react';
import { render, screen } from '@testing-library/react';

import Date from './Date';
import { DateFormat } from './Date.types';

describe('Date', () => {
  it('should render successfully', () => {
    render(<Date date={0} />);

    expect(screen.getByTestId('date')).toBeDefined();
  });

  it('should render format Date successfully', () => {
    render(<Date date={0} format={DateFormat.DATE} />);

    expect(screen.getByTestId('date')).toBeDefined();
  });

  it('should render format DayOfWeek successfully', () => {
    render(<Date date={0} format={DateFormat.DAY_OF_WEEK} />);

    expect(screen.getByTestId('date')).toBeDefined();
  });

  it('should render format HoursAndMinutes successfully', () => {
    render(<Date date={0} format={DateFormat.HOURS_AND_MINUTES} />);

    expect(screen.getByTestId('date')).toBeDefined();
  });

  it('should render format Time successfully', () => {
    render(<Date date={0} format={DateFormat.TIME} />);

    expect(screen.getByTestId('date')).toBeDefined();
  });

  it('should render format Timestamp successfully', () => {
    render(<Date date={0} format={DateFormat.TIMESTAMP} />);

    expect(screen.getByTestId('date')).toBeDefined();
  });

  it('should render format TimestampShort successfully', () => {
    render(<Date date={0} format={DateFormat.TIMESTAMP_SHORT} />);

    expect(screen.getByTestId('date')).toBeDefined();
  });

  it('should use custom testID', () => {
    render(<Date date={0} testId="custom-testid" />);

    expect(screen.queryByTestId('date')).toBeNull();
    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use classes from className property', () => {
    render(<Date date={0} className="custom-class" />);

    expect(screen.getByTestId('date').classList).toContain('custom-class');
  });
});
