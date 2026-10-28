/**
 * Field name constants for order filtering
 */
export const ORDER_FILTER_FIELDS = {
  NAME: 'name',
  CONFIRMATION_NUMBER: 'confirmation_number',
} as const;

export type OrderFilterParams = {
  name?: string;
  confirmationNumber?: string;
};

/**
 * Sanitizes a filter value to prevent injection attacks or malformed queries.
 * Allows only alphanumeric characters, underscore, and dash.
 * @returns The sanitized string
 * @param {string} value - The input string to sanitize
 */
function sanitizeFilterValue(value: string) {
  // Only allow alphanumeric, underscore, and dash
  // Remove anything else to prevent injection
  return value.replace(/[^a-zA-Z0-9_\-]/g, '');
}

/**
 * Builds a query string for filtering customer orders using the Customer Account API
 * @returns A formatted query string for the GraphQL query parameter, or undefined if no filters
 * @example
 * buildOrderSearchQuery(\{ name: '1001' \}) // returns "name:1001"
 * buildOrderSearchQuery(\{ name: '1001', confirmationNumber: 'ABC123' \}) // returns "name:1001 AND confirmation_number:ABC123"
 * @param {OrderFilterParams} filters - The filter parameters
 */
export function buildOrderSearchQuery(filters: OrderFilterParams) {
  const queryParts: string[] = [];

  if (filters.name) {
    // Remove # if present and trim
    const cleanName = filters.name.replace(/^#/, '').trim();
    const sanitizedName = sanitizeFilterValue(cleanName);
    if (sanitizedName) {
      queryParts.push(`name:${sanitizedName}`);
    }
  }

  if (filters.confirmationNumber) {
    const cleanConfirmation = filters.confirmationNumber.trim();
    const sanitizedConfirmation = sanitizeFilterValue(cleanConfirmation);
    if (sanitizedConfirmation) {
      queryParts.push(`confirmation_number:${sanitizedConfirmation}`);
    }
  }

  return queryParts.length > 0 ? queryParts.join(' AND ') : undefined;
}

/**
 * Parses order filter parameters from URLSearchParams
 * @returns Parsed filter parameters
 * @example
 * const url = new URL('https://example.com/orders?name=1001&confirmation_number=ABC123');
 * parseOrderFilters(url.searchParams) // returns \{ name: '1001', confirmationNumber: 'ABC123' \}
 * @param {URLSearchParams} searchParams - The URL search parameters
 */
export function parseOrderFilters(searchParams: URLSearchParams) {
  const filters: OrderFilterParams = {};

  const name = searchParams.get(ORDER_FILTER_FIELDS.NAME);
  if (name) {
    filters.name = name;
  }

  const confirmationNumber = searchParams.get(
    ORDER_FILTER_FIELDS.CONFIRMATION_NUMBER,
  );
  if (confirmationNumber) {
    filters.confirmationNumber = confirmationNumber;
  }

  return filters;
}