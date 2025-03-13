import type { Meta, StoryObj } from '@storybook/react';

import Decimal from './Decimal';
import { SignDisplay, Unit, UnitDisplay } from '../../utils';

const meta = {
  title: 'Components/Decimal',
  component: Decimal,
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
    unit: {
      control: 'select',
      options: [
        '',
        Unit.Celsius,
        Unit.Centimeter,
        Unit.Fahrenheit,
        Unit.Inch,
        Unit.Kilometer,
        Unit.KilometerPerHour,
        Unit.Mile,
        Unit.MilePerHour,
        Unit.Millimeter,
        Unit.Percent,
      ],
      description: 'The unit of measurement.',
    },
    unitDisplay: {
      control: 'select',
      options: ['', UnitDisplay.Narrow, UnitDisplay.Short, UnitDisplay.Long],
      description: 'The unit formatting style.',
    },
    value: { description: 'The number to be formatted and displayed.' },
  },
} satisfies Meta<typeof Decimal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 3.14159265359,
  },
};

export const Rounded: Story = {
  args: {
    value: 3.14159265359,
    maximumFractionDigits: 4,
  },
};

export const MinimumDigits: Story = {
  args: {
    value: 3.14,
    maximumFractionDigits: 4,
    minimumFractionDigits: 4,
  },
};

export const Sign: Story = {
  args: {
    value: -3.14159265359,
    signDisplay: SignDisplay.Always,
  },
};

export const Formatted: Story = {
  args: {
    value: 3.14159265359,
    maximumFractionDigits: 2,
    unit: Unit.MilePerHour,
    unitDisplay: UnitDisplay.Narrow,
  },
};
