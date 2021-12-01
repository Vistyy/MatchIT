import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Grid, Item, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function JobPage() {
  const { id } = useParams<{ id: string }>();
  const {
    jobStore: { loadJob, loadingJob, job, resetState },
  } = useStore();

  useEffect(() => {
    resetState();
    loadJob(id);
  }, [loadJob, id, resetState]);

  if (loadingJob) return <LoadingComponent content="Loading job details..." />;

  return (
    <Grid>
      <Grid.Column width="16">
        {job && (
          <Segment>
            <Item>
              <Item.Header>{job.title}</Item.Header>
            </Item>
          </Segment>
        )}
      </Grid.Column>
    </Grid>
  );
});
