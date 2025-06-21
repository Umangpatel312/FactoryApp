import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import { ROLES } from 'common/utils/role';

import StandardLayout from 'common/components/Layout/StandardLayout';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import PrivateOutlet from './PrivateOutlet';
import LandingPage from 'pages/LandingPage/LandingPage';
import SigninPage from 'pages/SigninPage/SigninPage';
import SignoutPage from 'pages/SignoutPage/SignoutPage';
import DashboardPage from 'pages/DashboardPage/DashboardPage';
import UserDetail from 'pages/UsersPage/components/UserDetail';
import SalaryPage from 'pages/SalaryPage/SalaryPage';
import UserTaskList from 'pages/UsersPage/components/UserTaskList';
import TaskDetail from 'pages/UsersPage/Tasks/components/TaskDetail';
import MachinesPage from 'pages/MachinesPage/MachinesPage';
import MachineDetailEmpty from 'pages/MachinesPage/components/MachineDetailEmpty';
import MachineDetailLayout from 'pages/MachinesPage/components/MachineDetailLayout';
import MachineForm from 'pages/MachinesPage/components/MachineForm';
import EmployeesPage from 'pages/EmployeesPage/EmployeesPage';
import EmployeeDetailEmpty from 'pages/EmployeesPage/components/EmployeeDetailEmpty';
import SignupPage from 'pages/SignupPage/SignupPage';
import EmployeeRegisterPage from 'pages/EmployeesPage/components/EmployeeRegisterPage';
import AttendencePage from 'pages/AttendencePage/AttendencePage';
import AttendenceDetailEmpty from 'pages/AttendencePage/components/AttendenceDetailEmpty';
import AttendenceForm from 'pages/AttendencePage/components/AttendenceForm';
import EmployeeAttendenceForm from 'pages/AttendencePage/components/EmployeeAttendenceForm';
import UsersPage from 'pages/UsersPage/UsersPage';
import UserDetailEmpty from 'pages/UsersPage/components/UserDetailEmpty';
import UserDetailLayout from 'pages/EmployeesPage/components/UserDetailLayout';
import UserVerifyPage from 'pages/SigninPage/UserVerifyPage';
import ChangePasswordPage from 'pages/ChangePasswordPage/ChangePasswordPage';

/**
 * The React Router configuration. An array of `RouteObject`.
 * @see {@link RouteObject}
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <StandardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'auth/signin',
        element: <SigninPage />,
      },
      {
        path: 'auth/signup',
        element: <SignupPage />,
      },
      {
        path: 'auth/verify',
        element: <UserVerifyPage />,
      },
      {
        path: 'auth/signout',
        element: <SignoutPage />,
      },
      // App routes - require authentication
      {
        path: 'app',
        element: <PrivateOutlet />,
        children: [
          // Dashboard - accessible by all authenticated users
          { index: true, element: <DashboardPage /> },
          // change-password
          {
            path: 'change-password',
            element: <ChangePasswordPage />,
          },
          // Admin only routes
          {
            path: 'admin',
            element: <PrivateOutlet allowedRoles={[ROLES.ADMIN]} />,
            children: [
              {
                path: 'users',
                element: <UsersPage />,
                children: [
                  { index: true, element: <UserDetailEmpty /> },
                  {
                    path: ':userId',
                    element: <UserDetailLayout />,
                    children: [
                      { index: true, element: <UserDetail /> },
                      // ... other user sub-routes
                    ],
                  },
                ],
              },
            ],
          },

          // Merchant routes
          {
            path: 'merchant',
            element: <PrivateOutlet allowedRoles={[ROLES.MERCHANT, ROLES.ADMIN]} />,
            children: [
              {
                path: 'machines',
                element: <MachinesPage />,
                children: [
                  { index: true, element: <MachineDetailEmpty /> },
                  {
                    path: 'create',
                    element: <MachineForm />
                  },
                  {
                    path: 'edit/:machineId',
                    element: <MachineForm />
                  }
                ],
              },
              // ... other merchant routes
              {
                path: 'salary',
                element: <SalaryPage />,
              },
              {
                path: 'employees',
                element: <EmployeesPage />,
                children: [
                  {
                    index: true,
                    element: <EmployeeDetailEmpty />,
                  },
                  {
                    path: 'create',
                    element: <EmployeeRegisterPage />
                  },
                  {
                    path: 'edit/:employeeId',
                    element: <EmployeeRegisterPage />
                  }
                ],
              },
              {
                path: 'attendence',
                element: <AttendencePage />,
                children: [
                  {
                    index: true,
                    element: <AttendenceDetailEmpty />,
                  },
                  {
                    path: 'create',
                    element: <AttendenceForm />
                  },
                  {
                    path: 'edit/:employeeId',
                    element: <EmployeeRegisterPage />
                  }
                ],
              }
            ],
          },

          // Employee routes
          {
            path: 'employee',
            element: <PrivateOutlet allowedRoles={[ROLES.EMPLOYEE, ROLES.ADMIN]} />,
            children: [
              {
                path: 'attendence',
                element: <AttendencePage />,
                // ... attendance sub-routes
              },
              // ... other employee routes
              {
                path: 'salary',
                element: <SalaryPage />,
              },
              {
                path: 'attendenceForm',
                element: <EmployeeAttendenceForm />
              },
            ],
          },

          // Shared routes for all authenticated users
          // {
          //   path: 'profile',
          //   element: <ProfilePage />,
          // },
        ],
      },
    ],
  },
];

/**
 * The application `Router`. A React Router instance.
 */
export const router = createBrowserRouter(routes);
