import type { Meta, StoryObj } from '@storybook/react';

import Currency from './Currency';
import { CurrencyCode, CurrencyDisplay, CurrencySign } from '../../utils';

const meta = {
  title: 'Components/Currency',
  component: Currency,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    testId: { description: 'Unit test identifier.' },
    currency: { control: 'select', description: 'The ISO 4217 currency code.' },
    currencyDisplay: { control: 'select', description: 'How to format the currency for display.' },
    currencySign: { control: 'select', description: 'How to display negative values.' },
    value: { description: 'The amount to be formatted and displayed.' },
  },
} satisfies Meta<typeof Currency>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 15.99,
  },
};

export const Code: Story = {
  args: {
    value: 15.99,
    currency: CurrencyCode.GBP,
  },
};

export const Narrow: Story = {
  args: {
    value: 15.99,
    currencyDisplay: CurrencyDisplay.NarrowSymbol,
  },
};

export const Accounting: Story = {
  args: {
    value: -15.99,
    currencySign: CurrencySign.Accounting,
  },
};
