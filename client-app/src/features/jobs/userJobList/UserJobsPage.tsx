import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Link } from "react-router-dom";
import { Button, Grid, Header, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import JobListItemPlaceholder from "../dashboard/JobListItemPlaceholder";
import UserJobList from "./UserJobList";

export default observer(function UserJobsPage() {
  const {
    jobStore: {
      jobArray,
      loadUserJobs,
      setPagingParams,
      pagination,
      loadingJobs,
      resetState,
    },
  } = useStore();
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadUserJobs().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    document.title = "My Jobs - MatchIT";
    resetState();
  }, [resetState]);

  useEffect(() => {
    if (jobArray.length === 0 && !loadingJobs && !loadingInitial) {
      loadUserJobs();
      setLoadingInitial(true);
    }
  }, [jobArray.length, loadUserJobs, loadingInitial, loadingJobs]);

  return (
    <Grid>
      <Grid.Column width="16">
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
              <UserJobList jobArray={jobArray} />
            ) : (
              <>
                <Header content="You have no jobs yet" />
                <Button as={Link} to="/addJob" content="Add New Job Offer" />
              </>
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
