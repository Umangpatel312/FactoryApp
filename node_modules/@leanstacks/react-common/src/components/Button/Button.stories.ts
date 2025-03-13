import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';
import { ButtonVariant } from './Button.types';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The content within the button.' },
    className: { description: 'Additional CSS classes.', type: 'string' },
    disabled: { description: 'Disabled state.', type: 'boolean' },
    testId: { description: 'Unit test identifier.' },
    variant: {
      control: 'select',
      options: [ButtonVariant.Solid, ButtonVariant.Outline, ButtonVariant.Text],
      description: 'The variant style.',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    children: 'Solid button',
    variant: ButtonVariant.Solid,
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline button',
    variant: ButtonVariant.Outline,
  },
};

export const Text: Story = {
  args: {
    children: 'Text button',
    variant: ButtonVariant.Text,
  },
};
