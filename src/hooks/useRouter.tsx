// Hook

import { useMemo } from "react";
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import queryString from "query-string";

interface IUseRouter {
  push: any;
  replace: any;
  pathname: any;
  query: any;
  match: any;
  location: any;
  history: any;
}

export function useRouter(): IUseRouter {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(() => {
    return {
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      // Merge params and parsed query string into single "query" object
      // so that they can be used interchangeably.
      // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
      query: {
        ...queryString.parse(location.search), // Convert string to object
        ...params,
      },
      match,
      location,
      history,
    };
  }, [params, match, location, history]);
}
