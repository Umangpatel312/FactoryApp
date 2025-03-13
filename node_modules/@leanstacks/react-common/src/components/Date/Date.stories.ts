import type { Meta, StoryObj } from '@storybook/react';

import { default as DateComponent } from './Date';
import { DateFormat } from './Date.types';

const meta = {
  title: 'Components/Date',
  component: DateComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    date: { description: 'The date as a ISO8601 string or the number of milliseconds.' },
    className: { description: 'Additional CSS classes.' },
    testId: { description: 'Unit test identifier.' },
    format: {
      control: {
        type: 'select',
        labels: {
          'MM/DD/YYYY': 'Date',
          dddd: 'Day of the Week',
          'H[h] mm[m]': 'Hours and Minutes',
          'h:mma': 'Time',
          'h:mma ddd MMM D': 'Timestamp Short',
          'dddd MMMM D [at] h:mma': 'Timestamp',
        },
      },
      options: [
        DateFormat.DATE,
        DateFormat.DAY_OF_WEEK,
        DateFormat.HOURS_AND_MINUTES,
        DateFormat.TIME,
        DateFormat.TIMESTAMP,
        DateFormat.TIMESTAMP_SHORT,
      ],
      description: 'The date format.',
    },
  },
} satisfies Meta<typeof DateComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FormatDate: Story = {
  args: {
    date: new Date().toISOString(),
  },
};

export const FormatDayOfWeek: Story = {
  args: {
    date: new Date().toISOString(),
    format: DateFormat.DAY_OF_WEEK,
  },
};

export const FormatHoursAndMinutes: Story = {
  args: {
    date: new Date().toISOString(),
    format: DateFormat.HOURS_AND_MINUTES,
  },
};

export const FormatTime: Story = {
  args: {
    date: new Date().toISOString(),
    format: DateFormat.TIME,
  },
};

export const FormatTimestamp: Story = {
  args: {
    date: new Date().toISOString(),
    format: DateFormat.TIMESTAMP,
  },
};

export const FormatTimestampShort: Story = {
  args: {
    date: new Date().toISOString(),
    format: DateFormat.TIMESTAMP_SHORT,
  },
};
