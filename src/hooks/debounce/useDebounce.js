import { useEffect, useState } from "react";

/**
 * Custom hook to debounce a value.
 *
 * This hook returns a debounced version of the input value that only changes
 * after the specified delay time has passed without the value changing.
 * It is useful for delaying the update of a value, such as when handling user input.
 *@memberof hooks
 * @param {any} value - The value to debounce.
 * @param {number} [delay=500] - The debounce delay in milliseconds. Defaults to 500ms.
 * @returns {any} The debounced value.
 *
 * @example
 * // Example usage:
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 *
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     // Perform a search with debounced value
 *   }
 * }, [debouncedSearchTerm]);
 */
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
