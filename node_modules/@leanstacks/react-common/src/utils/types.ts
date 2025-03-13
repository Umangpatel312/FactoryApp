/**
 * Component properties with test identifier.
 * @param {string} [testId] - Optional. A testing library identifier.
 */
export interface PropsWithTestId {
  testId?: string;
}

/**
 * Component properties with CSS class name(s).
 * @param {string} [className] - Optional. CSS class names.
 */
export interface PropsWithClassName {
  className?: string;
}

/**
 * Utility interface combining the most commonly used React component
 * properties interfaces.
 * @see {@link PropsWithClassName}
 * @see {@link PropsWithTestId}
 */
export interface BaseComponentProps extends PropsWithClassName, PropsWithTestId {}
