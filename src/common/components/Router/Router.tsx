import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';

import StandardLayout from 'common/components/Layout/StandardLayout';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import PrivateOutlet from './PrivateOutlet';
import LandingPage from 'pages/LandingPage/LandingPage';
import SigninPage from 'pages/SigninPage/SigninPage';
import SignoutPage from 'pages/SignoutPage/SignoutPage';
import DashboardPage from 'pages/DashboardPage/DashboardPage';
import SettingsPage from 'pages/SettingsPage/SettingsPage';
import AppearanceSettings from 'pages/SettingsPage/components/AppearanceSettings';
import ComponentsPage from 'pages/ComponentsPage/ComponentsPage';
import AvatarComponents from 'pages/ComponentsPage/components/AvatarComponents';
import TextComponents from 'pages/ComponentsPage/components/TextComponents';
import ButtonComponents from 'pages/ComponentsPage/components/ButtonComponents';
import BadgeComponents from 'pages/ComponentsPage/components/BadgeComponents';
import CardComponents from 'pages/ComponentsPage/components/CardComponents';
import UsersPage from 'pages/UsersPage/UsersPage';
import UserDetailLayout from 'pages/UsersPage/components/UserDetailLayout';
import UserDetail from 'pages/UsersPage/components/UserDetail';
import UserDetailEmpty from 'pages/UsersPage/components/UserDetailEmpty';
import UserTaskList from 'pages/UsersPage/components/UserTaskList';
import TaskDetail from 'pages/UsersPage/Tasks/components/TaskDetail';
import MachinesPage from 'pages/MachinesPage/MachinesPage';
import MachineDetailEmpty from 'pages/MachinesPage/components/MachineDetailEmpty';
import MachineDetailLayout from 'pages/MachinesPage/components/MachineDetailLayout';
import MachineForm from 'pages/MachinesPage/components/MachineForm';
import EmployeesPage from 'pages/EmployeesPage/EmployeesPage';
import EmployeeDetailEmpty from 'pages/EmployeesPage/components/EmployeeDetailEmpty';

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
        path: 'auth/signout',
        element: <SignoutPage />,
      },
      {
        path: 'app',
        element: <PrivateOutlet />,
        children: [
          { index: true, element: <DashboardPage /> },
          {
            path: 'settings',
            element: <SettingsPage />,
            children: [
              {
                index: true,
                element: <Navigate to="appearance" />,
              },
              {
                path: 'appearance',
                element: <AppearanceSettings />,
              },
            ],
          },
          {
            path: 'components',
            element: <ComponentsPage />,
            children: [
              {
                index: true,
                element: <Navigate to="avatar" />,
              },
              {
                path: 'avatar',
                element: <AvatarComponents />,
              },
              {
                path: 'badge',
                element: <BadgeComponents />,
              },
              {
                path: 'button',
                element: <ButtonComponents />,
              },
              {
                path: 'card',
                element: <CardComponents />,
              },
              {
                path: 'text',
                element: <TextComponents />,
              },
            ],
          },
          {
            path: 'users',
            element: <UsersPage />,
            children: [
              {
                index: true,
                element: <UserDetailEmpty />,
              },
              {
                path: ':userId',
                element: <UserDetailLayout />,
                children: [
                  { index: true, element: <UserDetail /> },
                  {
                    path: 'tasks',
                    element: <UserTaskList />,
                  },
                  {
                    path: 'tasks/:taskId',
                    element: <TaskDetail />,
                  },
                ],
              },
            ],
          },
          {
            path: 'machines',
            element: <MachinesPage />,
            children: [
              {
                index: true,
                element: <MachineDetailEmpty />,
              },
              {
                path: ':machineId',
                element: <MachineDetailLayout />,
                children: [
                  { index: true, element: <UserDetail /> },
                  {
                    path: 'tasks',
                    element: <UserTaskList />,
                  },
                  {
                    path: 'tasks/:taskId',
                    element: <TaskDetail />,
                  },
                ],
              },
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
          {
            path: 'employees',
            element: <EmployeesPage />,
            children: [
              {
                index: true,
                element: <EmployeeDetailEmpty />,
              },
              {
                path: ':machineId',
                element: <MachineDetailLayout />,
                children: [
                  { index: true, element: <UserDetail /> },
                  {
                    path: 'tasks',
                    element: <UserTaskList />,
                  },
                  {
                    path: 'tasks/:taskId',
                    element: <TaskDetail />,
                  },
                ],
              },
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
        ],
      },
    ],
  },
];

/**
 * The application `Router`. A React Router instance.
 */
export const router = createBrowserRouter(routes);
