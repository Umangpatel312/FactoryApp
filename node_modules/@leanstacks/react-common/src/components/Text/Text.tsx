import React from 'react';
import classNames from 'classnames';

import { TextProps, TextVariant } from './Text.types';

/**
 * The `Text` React component formats and renders a text value. Use the
 * `variant` property to apply predefined styles.
 * @param {TextProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const Text: React.FC<TextProps> = ({
  children,
  className,
  testId = 'text',
  variant = TextVariant.BodyCopy,
}: TextProps): JSX.Element => {
  const getVariantClasses = (variant: TextVariant): string => {
    switch (variant) {
      case TextVariant.Heading1:
        return 'text-4xl font-bold';
      case TextVariant.Heading2:
        return 'text-3xl font-bold';
      case TextVariant.Heading3:
        return 'text-2xl font-bold';
      case TextVariant.BodyCopy:
      default:
        return '';
    }
  };

  return (
    <div className={classNames(getVariantClasses(variant), className)} data-testid={testId}>
      {children}
    </div>
  );
};

export default Text;
