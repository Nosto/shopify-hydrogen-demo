import type {ReactNode} from 'react';
import {Link, useLocation, useNavigation} from 'react-router';

import type {PageInfo} from '~/lib/pagination';

type Connection<NodeType> = {
  nodes: NodeType[];
  pageInfo: PageInfo;
};

/**
 * Renders a page of a Storefront API connection with cursor links to the previous and
 * next pages. Pair it with `getPaginationVariables` in the loader.
 */
export function PaginatedResourceSection<NodeType>({
  connection,
  children,
  resourcesClassName,
}: {
  connection: Connection<NodeType>;
  children: (args: {node: NodeType; index: number}) => ReactNode;
  resourcesClassName?: string;
}) {
  const {pathname, search} = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const {pageInfo} = connection;

  const pageUrl = (direction: 'next' | 'previous', cursor?: string | null) => {
    const params = new URLSearchParams(search);
    params.set('direction', direction);
    if (cursor) {
      params.set('cursor', cursor);
    }
    return `${pathname}?${params}`;
  };

  const resourcesMarkup = connection.nodes.map((node, index) =>
    children({node, index}),
  );

  return (
    <div>
      {pageInfo.hasPreviousPage && (
        <Link
          to={pageUrl('previous', pageInfo.startCursor)}
          preventScrollReset
        >
          {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
        </Link>
      )}
      {resourcesClassName ? (
        <div className={resourcesClassName}>{resourcesMarkup}</div>
      ) : (
        resourcesMarkup
      )}
      {pageInfo.hasNextPage && (
        <Link to={pageUrl('next', pageInfo.endCursor)} preventScrollReset>
          {isLoading ? 'Loading...' : <span>Load more ↓</span>}
        </Link>
      )}
    </div>
  );
}
