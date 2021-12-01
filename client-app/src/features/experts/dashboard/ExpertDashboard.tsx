import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import ExpertFilters from "./ExpertFilters";
import ExpertList from "./ExpertList";
import ExpertListItemPlaceholder from "./ExpertListItemPlaceholder";

export default observer(function ExpertDashboard() {
  const { expertStore } = useStore();
  const {
    loadExperts,
    expertRegistry,
    setPagingParams,
    pagination,
    loadingInitial,
    clearFilter,
  } = expertStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadExperts().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    runInAction(() => {
      clearFilter();
      expertRegistry.clear();
    });
  }, [clearFilter, expertRegistry]);

  useEffect(() => {
    if (expertRegistry.size <= 0 && !loadingInitial) loadExperts();
  }, [expertRegistry.size, loadExperts, loadingInitial]);

  return (
    <Grid>
      <Grid.Column width="6">
        <ExpertFilters />
      </Grid.Column>
      <Grid.Column width="10">
        {loadingInitial && !loadingNext ? (
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
            <ExpertList />
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width="10">
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
});
