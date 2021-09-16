import { useLocation } from "react-router-dom";
import { Action, State } from "../../models/search";

export default function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function searchReducer(state: State, action: Action): State {
  switch (action.type) {
    case "CLEAN_QUERY":
      return { ...state, loading: false, results: action.results!, value: "" };
    case "START_SEARCH":
      return { ...state, loading: true, value: action.query! };
    case "FINISH_SEARCH":
      return { ...state, loading: false, results: action.results! };
    case "UPDATE_SELECTION":
      return { ...state, value: action.selection! };

    default:
      throw new Error();
  }
}
