import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Grid, Header, Item, Segment } from "semantic-ui-react";
import ProfilePopup from "../../../app/common/profile/ProfilePopup";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import DeleteJobButton from "../DeleteJobButton";
import JobAttachmentsSegment from "./JobAttachmentsSegment";
import JobBidForm from "./jobBid/JobBidForm";
import JobBidsSegment from "./JobBidsSegment";
import JobDetailsSegment from "./JobDetailsSegment";

export default observer(function JobPage() {
  const { id } = useParams<{ id: string }>();
  const {
    jobStore: { loadJob, loadingJob, job, resetState, isEmployer },
    userStore: { user },
  } = useStore();
  const [addJobBidMode, setAddJobBidMode] = useState(false);

  useEffect(() => {
    document.title = "Job Details - MatchIT";
    resetState();
    loadJob(id);
  }, [loadJob, id, resetState]);

  if (loadingJob) return <LoadingComponent content="Loading job details..." />;

  return (
    <Grid>
      <Grid.Column width="16">
        {job && (
          <Segment.Group>
            <JobDetailsSegment job={job} />
            {job.attachments.length > 0 && (
              <JobAttachmentsSegment attachments={job.attachments} />
            )}
            {isEmployer && job.jobBids.length > 0 && (
              <>
                {job.acceptedJobBid ? (
                  <Segment raised>
                    <Item>
                      <Item.Header as='h2' content='Accepted Bid' style={{color: '#31b351'}}/>
                      <Item.Content>
                        <Grid>
                          <Grid.Column width="11">
                            <Item.Description
                              content={job.acceptedJobBid.description}
                            />
                            <ProfilePopup profile={job.acceptedJobBid.bidder} />
                          </Grid.Column>
                          <Grid.Column width="2" verticalAlign="middle">
                            <Item.Header as="h2">
                              {job.acceptedJobBid.fee}$
                            </Item.Header>
                          </Grid.Column>
                        </Grid>
                      </Item.Content>
                    </Item>
                  </Segment>
                ) : (
                  <JobBidsSegment jobBids={job.jobBids} />
                )}
              </>
            )}
            {isEmployer && <DeleteJobButton jobId={job.id} />}
            {!isEmployer && (
              <Segment>
                {user?.isExpert ? (
                  <>
                    <Header content="Interested? Make an offer:" />
                    <Button
                      content="Bid on the job"
                      onClick={() => setAddJobBidMode(true)}
                    />
                  </>
                ) : (
                  <>
                    <Header content="Want to make an offer?" />
                    <Button
                      content="Become an Expert"
                      as={Link}
                      to="/becomeExpert"
                    />
                  </>
                )}
              </Segment>
            )}
            {addJobBidMode && (
              <Segment style={{ padding: "20px 40px" }}>
                <JobBidForm setEditMode={setAddJobBidMode} />
              </Segment>
            )}
          </Segment.Group>
        )}
      </Grid.Column>
    </Grid>
  );
});
