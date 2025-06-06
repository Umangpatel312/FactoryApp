import { describe, expect, it, vi } from 'vitest';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { render, screen } from 'test/test-utils';

import * as UseGetUser from 'common/api/useGetUser';
import UserDetail from '../EmployeeDetail';

// mock select functions from react-router-dom
vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useParams: () => ({
      userId: '1',
    }),
  };
});

describe('UserDetail', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<UserDetail />);
    await screen.findByTestId('user-detail');

    // ASSERT
    expect(screen.getByTestId('user-detail')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(<UserDetail testId="custom-testId" />);
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(<UserDetail className="custom-className" />);
    await screen.findByTestId('user-detail');

    // ASSERT
    expect(screen.getByTestId('user-detail').classList).toContain('custom-className');
  });

  it('should render user detail', async () => {
    // ARRANGE
    render(<UserDetail />);
    await screen.findByTestId('user-detail-user');

    // ASSERT
    expect(screen.getByTestId('user-detail-user')).toBeDefined();
  });

  it('should render loading state', async () => {
    // ARRANGE
    const useGetUserSpy = vi.spyOn(UseGetUser, 'useGetUser');
    useGetUserSpy.mockReturnValue({
      data: undefined,
      error: undefined,
      isPending: true,
    } as unknown as UseQueryResult<UseGetUser.User, Error>);
    render(<UserDetail />);
    await screen.findAllByTestId('loader-skeleton');

    // ASSERT
    expect(screen.getAllByTestId('loader-skeleton')).toBeDefined();
  });

  it('should render error state', async () => {
    // ARRANGE
    const useGetUserSpy = vi.spyOn(UseGetUser, 'useGetUser');
    useGetUserSpy.mockReturnValue({
      data: undefined,
      error: new AxiosError(),
      isPending: false,
    } as unknown as UseQueryResult<UseGetUser.User, Error>);
    render(<UserDetail />);
    await screen.findByTestId('user-detail-error');

    // ASSERT
    expect(screen.getByTestId('user-detail-error')).toBeDefined();
  });
});
