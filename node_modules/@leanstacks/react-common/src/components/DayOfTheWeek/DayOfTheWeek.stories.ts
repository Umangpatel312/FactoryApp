import type { Meta, StoryObj } from '@storybook/react';

import DayOfTheWeek from './DayOfTheWeek';

const meta = {
  title: 'Components/DayOfTheWeek',
  component: DayOfTheWeek,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    date: { description: 'The date as a ISO8601 string or the number of milliseconds.' },
    className: { description: 'Additional CSS classes.' },
    relative: { description: 'Use relative names, e.g. Today.' },
    testId: { description: 'Unit test identifier.' },
  },
} satisfies Meta<typeof DayOfTheWeek>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: new Date().toISOString(),
  },
};

export const Relative: Story = {
  args: {
    date: new Date().toISOString(),
    relative: true,
  },
};
