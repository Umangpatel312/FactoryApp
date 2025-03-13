import type { Meta, StoryObj } from '@storybook/react';

import Alert from './Alert';
import { AlertVariant } from './Alert.types';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The Alert content.' },
    className: { description: 'Additional CSS classes.' },
    testId: { description: 'Unit test identifier.' },
    variant: {
      control: 'select',
      options: [AlertVariant.Info, AlertVariant.Warning, AlertVariant.Error, AlertVariant.Success],
      description: 'The variant style.',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    children: 'This is an informational Alert.',
    variant: AlertVariant.Info,
  },
};

export const Warning: Story = {
  args: {
    children: 'This is a warning Alert.',
    variant: AlertVariant.Warning,
  },
};

export const Error: Story = {
  args: {
    children: 'This is an error Alert.',
    variant: AlertVariant.Error,
  },
};

export const Success: Story = {
  args: {
    children: 'This is a success Alert.',
    variant: AlertVariant.Success,
  },
};
