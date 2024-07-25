import { useCallback } from "react";
import { logErrorToService } from "../../services/errorLoggingService";

/**
 * Custom hook for handling errors and logging them to an external service.
 *@memberof hooks
 * @hook
 * @example
 * // Example usage within a React component:
 * const handleError = useErrorHandler();
 *
 * useEffect(() => {
 *   try {
 *     // Some code that may throw an error
 *   } catch (error) {
 *     handleError(error);
 *   }
 * }, [handleError]);
 *
 * @returns {function} A callback function to handle errors.
 */
const useErrorHandler = () => {
  return useCallback((error, info) => {
    // Log the error to an external service
    logErrorToService(error, info);

    // Optionally, handle the error locally (e.g., show an error message)
    console.error("An error occurred:", error, info);
  }, []);
};

export default useErrorHandler;
