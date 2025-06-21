// src/common/utils/roles.ts
export const ROLES = {
    ADMIN: 'ADMIN',
    MERCHANT: 'MERCHANT',
    EMPLOYEE: 'EMPLOYEE',
  } as const;
  
  export type UserRole = keyof typeof ROLES;