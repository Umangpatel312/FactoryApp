import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';
import AttendencePage from '../AttendencePage';

describe('UsersPage', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<AttendencePage />);
    await screen.findByTestId('page-users');

    // ASSERT
    expect(screen.getByTestId('page-users')).toBeDefined();
  });
});
