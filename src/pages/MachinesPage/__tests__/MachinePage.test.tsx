import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';
import MachinesPage from '../MachinesPage';

describe('UsersPage', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<MachinesPage />);
    await screen.findByTestId('page-users');

    // ASSERT
    expect(screen.getByTestId('page-users')).toBeDefined();
  });
});
