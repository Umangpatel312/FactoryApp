import { ButtonHTMLAttributes } from 'react';
import { PropsWithTestId } from '../../utils/types';

/**
 * The `ButtonVariant` enumerates types of Buttons.
 */
export enum ButtonVariant {
  Solid = 'Solid',
  Outline = 'Outline',
  Text = 'Text',
}

/**
 * Properties for the `Button` component.
 * @param {ButtonVariant} [variant] - Optional. The type of Button. Default: `Primary`
 * @see {@link ButtonHTMLAttributes}
 * @see {@link PropsWithTestId}
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithTestId {
  variant?: ButtonVariant;
}
