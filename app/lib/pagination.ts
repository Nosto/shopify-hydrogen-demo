/**
 * Replacement for classic Hydrogen's `getPaginationVariables`: reads the `cursor` and
 * `direction` search params that `<PaginatedResourceSection>` links write.
 */
export function getPaginationVariables(
  request: Request,
  {pageBy}: {pageBy: number},
) {
  const searchParams = new URL(request.url).searchParams;
  const cursor = searchParams.get('cursor') ?? undefined;
  const isPrevious = searchParams.get('direction') === 'previous';

  return isPrevious
    ? {last: pageBy, startCursor: cursor ?? null}
    : {first: pageBy, endCursor: cursor ?? null};
}

export type PageInfo = {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor?: string | null;
  endCursor?: string | null;
};
