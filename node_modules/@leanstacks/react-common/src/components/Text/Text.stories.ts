import type { Meta, StoryObj } from '@storybook/react';

import Text from './Text';
import { TextVariant } from './Text.types';

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The text to display.' },
    className: { description: 'Additional CSS classes.' },
    testId: { description: 'Unit test identifier.' },
    variant: {
      control: 'select',
      options: [
        TextVariant.Heading1,
        TextVariant.Heading2,
        TextVariant.Heading3,
        TextVariant.BodyCopy,
      ],
      description: 'The variant style.',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    children: 'The Grey Fox Jumps Over The Stream',
    variant: TextVariant.Heading1,
  },
};

export const Heading2: Story = {
  args: {
    children: 'The Grey Fox Jumps Over The Stream',
    variant: TextVariant.Heading2,
  },
};

export const Heading3: Story = {
  args: {
    children: 'The Grey Fox Jumps Over The Stream',
    variant: TextVariant.Heading3,
  },
};

export const BodyCopy: Story = {
  args: {
    children: 'The Grey Fox Jumps Over The Stream',
    variant: TextVariant.BodyCopy,
  },
};
