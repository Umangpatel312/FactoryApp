import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';

import EmployeeDetailEmpty from '../EmployeeDetailEmpty';

describe('UserDetailEmpty', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<EmployeeDetailEmpty />);
    await screen.findByTestId('user-detail-empty');

    // ASSERT
    expect(screen.getByTestId('user-detail-empty')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<EmployeeDetailEmpty testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<EmployeeDetailEmpty className="custom-className" />);
    await screen.findByTestId('user-detail-empty');

    // ASSERT
    expect(screen.getByTestId('user-detail-empty').classList).toContain('custom-className');
  });
});
