import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from 'test/test-utils';
import * as UseToasts from 'common/hooks/useToasts';
import { toastFixture } from '__fixtures__/toasts';

import Toasts from '../Toasts';

describe('Toasts', () => {
  const useToastsSpy = vi.spyOn(UseToasts, 'useToasts');
  const mockRemoveToast = vi.fn();

  beforeEach(() => {
    useToastsSpy.mockReturnValue({
      createToast: vi.fn(),
      removeToast: mockRemoveToast,
      toasts: [toastFixture],
    });
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(<Toasts />);
    await screen.findByTestId('toasts');

    // ASSERT
    expect(screen.getByTestId('toasts')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<Toasts testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should render toasts', async () => {
    // ARRANGE
    render(<Toasts />);
    await screen.findByTestId(`toast-${toastFixture.id}`);

    // ASSERT
    expect(screen.getByTestId(`toast-${toastFixture.id}`)).toBeDefined();
  });

  it('should call removeToast with id', async () => {
    // ARRANGE
    render(<Toasts />);
    await screen.findByTestId(`toast-${toastFixture.id}-button-dismiss`);

    // ACT
    await userEvent.click(screen.getByTestId(`toast-${toastFixture.id}-button-dismiss`));

    // ASSERT
    await waitFor(() => expect(mockRemoveToast).toHaveBeenCalledWith(toastFixture.id));
  });
});
