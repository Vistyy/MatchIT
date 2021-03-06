import _ from "lodash";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useReducer, useRef } from "react";
import { Search, SearchResultData } from "semantic-ui-react";
import { searchReducer } from "../../../app/common/util/hooks";
import { SkillSearchItem, State } from "../../../app/models/search";
import { useStore } from "../../../app/stores/store";

interface Props {
  source: SkillSearchItem[];
  loadingSkills: boolean;
  setRemovedSkill: (removedSkill: boolean) => void;
}

export default observer(function JobSkillSearchInput({
  source,
  loadingSkills,
  setRemovedSkill,
}: Props) {
  const {
    jobStore: {
      addRequiredSkill,
      removeRequiredSkill,
      requiredSkills,
      skillRegistry,
    },
  } = useStore();
  const initialState: State = {
    loading: true,
    results: [],
    value: "",
  };
  const [state, searchDispatch] = useReducer(searchReducer, initialState);
  const { loading, results, value } = state;

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    searchDispatch({ type: "FINISH_SEARCH", results: source });
  }, [source, source.length]);

  const handleSearchChange = useCallback(
    (e, data) => {
      clearTimeout(timeoutRef.current!);
      searchDispatch({ type: "START_SEARCH", query: data.value });

      timeoutRef.current = setTimeout(() => {
        if (data.value.length === 0) {
          searchDispatch({ type: "FINISH_SEARCH", results: source });
        }

        const re = new RegExp(_.escapeRegExp(data.value), "i");
        const isMatch = (result: SkillSearchItem) => re.test(result.title);

        searchDispatch({
          type: "FINISH_SEARCH",
          results: _.filter(source, isMatch),
        });
      }, 100);
    },
    [source]
  );

  const handleResultSelect = (e: any, data: SearchResultData) => {
    searchDispatch({
      type: "UPDATE_SELECTION",
      selection: data.result.title,
    });
    const selectedSkill = Array.from(skillRegistry.values()).find(
      (skill) => skill.name === data.result.title
    );
    if (selectedSkill)
      if (requiredSkills.includes(selectedSkill)) {
        removeRequiredSkill(selectedSkill);
        runInAction(() => source.push(data.result));
      } else {
        addRequiredSkill(selectedSkill);
        runInAction(() => source.splice(source.indexOf(data.result), 1));
      }

    searchDispatch({
      type: "CLEAN_QUERY",
    });
  };

  return (
    <Search
      loading={loading || loadingSkills}
      onResultSelect={(e, data) => handleResultSelect(e, data)}
      onSearchChange={handleSearchChange}
      onMouseDown={handleSearchChange}
      results={results}
      value={value}
      minCharacters={0}
      selectFirstResult
      onBlur={() => setRemovedSkill(true)}
    />
  );
});
