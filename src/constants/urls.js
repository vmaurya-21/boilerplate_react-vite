const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * @namespace constants
 */

/**
 * Object containing API endpoints for authentication and error handling.
 *
 * This object provides URLs for various API endpoints used in the application.
 *
 * @memberof constants
 * @type {Object}
 * @property {string} REGISTER_API - Endpoint for user registration.
 * @property {string} LOGIN_API - Endpoint for user login.
 * @property {string} LOGOUT_API - Endpoint for user logout.
 * @property {string} ERROR_API - Endpoint for reporting errors.
 * @property {string} REFRESH_TOKEN_API - Endpoint for refreshing authentication tokens.
 *
 * @example
 * // Example usage:
 * const loginUrl = endpoints.LOGIN_API;
 */
export const endpoints = {
  REGISTER_API: BASE_URL + "/auth/register",
  LOGIN_API: BASE_URL + "/auth/login",
  LOGOUT_API: BASE_URL + "/auth/logout",

  // Error API endpoints
  ERROR_API: BASE_URL + "/error",

  // Token endpoints
  REFRESH_TOKEN_API: BASE_URL + "/refresh",
};
