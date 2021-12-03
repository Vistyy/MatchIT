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
import ExpertSort from "./ExpertSort";

export default observer(function ExpertDashboard() {
  const { expertStore } = useStore();
  const {
    loadExperts,
    expertArray,
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
      expertArray.length = 0;
    });
  }, [clearFilter, expertArray]);

  useEffect(() => {
    if (expertArray.length <= 0 && !loadingInitial) loadExperts();
  }, [expertArray.length, loadExperts, loadingInitial]);

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
