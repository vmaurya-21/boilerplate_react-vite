import axios from "axios";

// Getting the base URL for API from environment variables
const baseURL = import.meta.env.VITE_API_URL;

/**
 * @namespace lib
 *
 */

/**
 * Default Axios instance configured with the base URL.
 * This instance can be used for public API calls that don't require authentication.
 *@memberof lib
 * @constant {AxiosInstance}
 *
 * @example
 * // Example usage:
 * axiosInstance.get('/public-endpoint');
 */
export default axios.create({ baseURL });

/**
 * Axios instance for private API calls.
 * This instance is configured with:
 * - Base URL from environment variables
 * - JSON Content-Type header for request bodies
 * - `withCredentials` flag to include cookies in requests (useful for authentication)
 *
 * This instance is intended for use with API endpoints that require authentication.
 *@memberof lib
 * @constant {AxiosInstance}
 *
 * @example
 * // Example usage:
 * axiosPrivate.get('/protected-endpoint');
 */
export const axiosPrivate = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
