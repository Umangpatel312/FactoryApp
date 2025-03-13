import React from 'react';
import { render, screen } from '@testing-library/react';

import Text from './Text';
import { TextVariant } from './Text.types';

describe('Text', () => {
  it('should render successfully', () => {
    const textValue = 'Test';

    render(<Text>{textValue}</Text>);

    expect(screen.getByTestId('text')).toBeDefined();
  });

  it('should render Heading1', () => {
    const textValue = 'Test';

    render(<Text variant={TextVariant.Heading1}>{textValue}</Text>);

    expect(screen.getByTestId('text').classList).toContain('text-4xl');
  });

  it('should render Heading2', () => {
    const textValue = 'Test';

    render(<Text variant={TextVariant.Heading2}>{textValue}</Text>);

    expect(screen.getByTestId('text').classList).toContain('text-3xl');
  });

  it('should render Heading3', () => {
    const textValue = 'Test';

    render(<Text variant={TextVariant.Heading3}>{textValue}</Text>);

    expect(screen.getByTestId('text').classList).toContain('text-2xl');
  });

  it('should render BodyCopy', () => {
    const textValue = 'Test';

    render(<Text variant={TextVariant.BodyCopy}>{textValue}</Text>);

    expect(screen.getByTestId('text').classList.length).toBe(0);
  });

  it('should render BodyCopy when variant not supplied', () => {
    const textValue = 'Test';

    render(<Text>{textValue}</Text>);

    expect(screen.getByTestId('text').classList.length).toBe(0);
  });

  it('should use custom test ID', () => {
    const textValue = 'Test';

    render(<Text testId="custom-testid">{textValue}</Text>);

    expect(screen.getByTestId('custom-testid')).toBeDefined();
  });

  it('should use classes from className property', () => {
    const textValue = 'Test';

    render(<Text className="custom-class">{textValue}</Text>);

    expect(screen.getByTestId('text').classList).toContain('custom-class');
  });
});
