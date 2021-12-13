import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Header, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import ExpertFilters from "./ExpertFilters";
import ExpertList from "./ExpertList";
import ExpertListItemPlaceholder from "./ExpertListItemPlaceholder";
import ExpertSort from "./ExpertSort";

export default observer(function ExpertDashboard() {
  const { expertStore } = useStore();
  const {
    loadExperts,
    expertArray,
    setPagingParams,
    pagination,
    loadingExperts,
    resetState,
    resetExpertArray,
    loadingSkills,
  } = expertStore;
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(false);
  let timerRef = useRef<ReturnType<typeof setTimeout>>();

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadExperts().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    document.title = "Experts - MatchIT";
    resetState();
    resetExpertArray();
  }, [resetExpertArray, resetState]);

  useEffect(() => {
    if (
      expertArray.length === 0 &&
      !loadingExperts &&
      (!loadingInitial || loadingSkills)
    ) {
      loadExperts().then(() => setLoadingInitial(true));
    } else if (expertArray.length === 0 && !loadingExperts && loadingInitial) {
      timerRef.current = setTimeout(() => {
        loadExperts();
      }, 10000);
    } else {
      clearTimeout(timerRef.current!);
    }
    return () => {
      clearTimeout(timerRef.current!);
    };
  }, [expertArray.length, loadExperts, loadingExperts, loadingInitial, loadingSkills]);

  return (
    <Grid>
      <Grid.Column width="6">
        <Grid.Row style={{ marginBottom: "50px" }}>
          <ExpertSort />
        </Grid.Row>
        <Grid.Row>
          <ExpertFilters />
        </Grid.Row>
      </Grid.Column>
      <Grid.Column width="10">
        {loadingExperts && !loadingNext ? (
          <>
            <ExpertListItemPlaceholder />
            <ExpertListItemPlaceholder />
          </>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={
              !loadingNext &&
              !!pagination &&
              pagination.currentPage < pagination.totalPages
            }
            initialLoad={false}
          >
            {loadingInitial && expertArray.length > 0 ? (
              <ExpertList expertArray={expertArray} />
            ) : (
              <Header content="There are no experts yet" icon="list" />
            )}
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width="10">
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
});
