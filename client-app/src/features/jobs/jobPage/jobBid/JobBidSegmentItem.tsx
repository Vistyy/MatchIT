import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Grid, Item, Segment } from "semantic-ui-react";
import ProfilePopup from "../../../../app/common/profile/ProfilePopup";
import { JobBid } from "../../../../app/models/job";
import { useStore } from "../../../../app/stores/store";

interface Props {
  jobBid: JobBid;
}

export default observer(function JobBidsSegmentItem({ jobBid }: Props) {
  const {
    jobStore: { deleteJobBid, acceptJobBid },
  } = useStore();
  return (
    <Segment raised>
      <Item>
        <Item.Content>
          <Grid>
            <Grid.Column width="11">
              <Item.Description content={jobBid.description} />
              <ProfilePopup profile={jobBid.bidder} />
            </Grid.Column>
            <Grid.Column width="2" verticalAlign="middle">
              <Item.Header as="h2">{jobBid.fee}$</Item.Header>
            </Grid.Column>
            <Grid.Column width="3">
              <div style={{ float: "right" }}>
                <Button
                  style={{ marginRight: "15px" }}
                  icon="checkmark"
                  basic
                  color="green"
                  size="massive"
                  onClick={() => acceptJobBid(jobBid.id)}
                />
                <Button
                  icon="close"
                  basic
                  color="red"
                  size="massive"
                  onClick={() => deleteJobBid(jobBid.id)}
                />
              </div>
            </Grid.Column>
          </Grid>
        </Item.Content>
      </Item>
    </Segment>
  );
});
