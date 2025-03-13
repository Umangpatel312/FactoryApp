import { Settings } from 'common/api/useGetSettings';

/**
 * Keys used with React Query cache.
 */
export enum QueryKeys {
  Settings = 'Settings',
  Tasks = 'Tasks',
  Users = 'Users',
  UserTokens = 'UserTokens',
  Machines = 'Machines',
  Employees = 'Employees'
}

/**
 * Keys used for browser local storage.
 */
export enum StorageKeys {
  Language = 'react-starter.language',
  Settings = 'react-starter.settings',
  User = 'react-starter.user',
  UserTokens = 'react-starter.user-tokens',
  Machines = 'ract-starter.machine'
}

/**
 * Default `Settings`, i.e. user preferences.
 */
export const DEFAULT_SETTINGS: Settings = {
  theme: 'light',
};

/**
 * URL search parameter, i.e. query string, keys.
 */
export enum SearchParam {
  tab = 'tab',
}
