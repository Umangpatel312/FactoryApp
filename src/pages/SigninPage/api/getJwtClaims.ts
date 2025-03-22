import { jwtDecode } from 'jwt-decode';

/**
 * Interface for JWT Claims
 */
export interface JwtClaims {
  sub?: string;           // Subject (User ID or username)
  roles?: string[];        // Roles (Custom claim)
  exp?: number;            // Expiration time (Unix timestamp)
  iat?: number;            // Issued at time (Unix timestamp)
  [key: string]: any;      // Allow for any other claims
}

/**
 * Decodes the JWT token and extracts the claims.
 * @param token - The JWT token.
 * @returns Decoded claims or null if invalid/expired.
 */
export const getJwtClaims = (token: string): JwtClaims | null => {
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtClaims>(token);

    // ✅ Check for expiration
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < now) {
      console.warn('Token expired');
      return null;
    }

    return decoded;  // Return decoded claims
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
