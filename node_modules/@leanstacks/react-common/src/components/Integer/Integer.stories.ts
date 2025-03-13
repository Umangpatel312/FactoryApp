import type { Meta, StoryObj } from '@storybook/react';

import Integer from './Integer';
import { SignDisplay, Unit, UnitDisplay } from '../../utils';

const meta = {
  title: 'Components/Integer',
  component: Integer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    testId: { description: 'Unit test identifier.' },
    signDisplay: { control: 'select', description: 'When to display the sign for the number.' },
    unit: {
      control: 'select',
      options: [
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
      options: [UnitDisplay.Narrow, UnitDisplay.Short, UnitDisplay.Long],
      description: 'The unit formatting style.',
    },
    value: { description: 'The number to be formatted and displayed.' },
  },
} satisfies Meta<typeof Integer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 23000,
  },
};

export const Sign: Story = {
  args: {
    value: 23000,
    signDisplay: SignDisplay.Always,
  },
};

export const Formatted: Story = {
  args: {
    value: 23000,
    unit: Unit.MilePerHour,
    unitDisplay: UnitDisplay.Narrow,
  },
};
