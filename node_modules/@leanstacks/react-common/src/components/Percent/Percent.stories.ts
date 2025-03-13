import type { Meta, StoryObj } from '@storybook/react';

import Percent from './Percent';
import { SignDisplay } from '../../utils';

const meta = {
  title: 'Components/Percent',
  component: Percent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    testId: { description: 'Unit test identifier.' },
    minimumFractionDigits: { description: 'Minimum number of places right of the decimal.' },
    maximumFractionDigits: { description: 'Maximum number of places right of the decimal.' },
    signDisplay: { control: 'select', description: 'When to display the sign for the number.' },
    value: { description: 'The value to be formatted and displayed.' },
  },
} satisfies Meta<typeof Percent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 0.12345678,
  },
};

export const Rounded: Story = {
  args: {
    value: 0.12345678,
    maximumFractionDigits: 4,
  },
};

export const Padded: Story = {
  args: {
    value: 0.12,
    minimumFractionDigits: 2,
  },
};

export const Sign: Story = {
  args: {
    value: -0.12345678,
    signDisplay: SignDisplay.Always,
  },
};
