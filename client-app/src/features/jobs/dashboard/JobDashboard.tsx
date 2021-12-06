import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Header, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import JobFilters from "./JobFilters";
import JobList from "./JobList";
import JobListItemPlaceholder from "./JobListItemPlaceholder";
import JobSort from "./JobSort";

export default observer(function JobDashboard() {
  const { jobStore } = useStore();
  const {
    loadJobs,
    jobArray,
    setPagingParams,
    pagination,
    loadingJobs,
    resetState,
  } = jobStore;
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadJobs().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    resetState();
  }, [resetState]);

  useEffect(() => {
    if (jobArray.length <= 0 && !loadingJobs && !loadingInitial) {
      loadJobs();
      setLoadingInitial(true);
    }
  }, [jobArray.length, loadJobs, loadingInitial, loadingJobs]);

  return (
    <Grid>
      <Grid.Column width="6">
        <Grid.Row style={{ marginBottom: "50px" }}>
          <JobSort />
        </Grid.Row>
        <Grid.Row>
          <JobFilters />
        </Grid.Row>
      </Grid.Column>
      <Grid.Column width="10">
        {loadingJobs && !loadingNext ? (
          <>
            <JobListItemPlaceholder />
            <JobListItemPlaceholder />
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
            {loadingInitial && jobArray.length > 0 ? (
              <JobList jobArray={jobArray} />
            ) : (
              <Header content="There are no jobs yet" icon="list" />
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
