export interface State {
  loading: boolean;
  results: SkillSearchItem[];
  value: string;
}
export interface Action {
  type: "CLEAN_QUERY" | "START_SEARCH" | "FINISH_SEARCH" | "UPDATE_SELECTION";
  query?: string;
  results?: SkillSearchItem[];
  selection?: string;
}

export interface SkillSearchItem {
  title: string;
}
