import { PropsWithChildren } from 'react';
import { PropsWithClassName, PropsWithTestId } from '../../utils/types';

/**
 * The `TextVariant` enumerates types of Text. Use the `variant` property
 * to specify the desired format.
 */
export enum TextVariant {
  Heading1 = 'Heading1',
  Heading2 = 'Heading2',
  Heading3 = 'Heading3',
  BodyCopy = 'BodyCopy',
}

/**
 * Properties for the `Text` component.
 * @param {TextVariant} [variant] - Optional. The type of Text. Default: `BodyCopy`
 */
export interface TextProps extends PropsWithChildren, PropsWithClassName, PropsWithTestId {
  variant?: TextVariant;
}
