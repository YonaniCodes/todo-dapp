import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

// Custom hook for handling query parameters
export function useQueryParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Function to update query parameters
  const updateQueryParam = useCallback(
    (param: string, value: string | null) => {
      // Create a new URLSearchParams object to handle query parameters
      const newParams = new URLSearchParams(searchParams);

      // Update or remove the specific query parameter
      if (value) {
        newParams.set(param, value); // Set or update the parameter
      } else {
        newParams.delete(param); // Remove the parameter if value is null
      }

      // Generate the new query string
      const newQueryString = newParams.toString();

      // If the query string has changed, update the URL with the new parameters.
      if (newQueryString !== searchParams.toString()) {
        router.push(`?${newQueryString}`, { shallow: true });
      }
    },
    [searchParams, router]
  );

  // Function to get the current value of a query parameter
  const getQueryParam = useCallback(
    (param: string) => {
      return searchParams.get(param);
    },
    [searchParams]
  );

  return { updateQueryParam, getQueryParam };
}
