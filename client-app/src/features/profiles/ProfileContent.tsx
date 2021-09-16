import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ProfileCertification from "./ProfileCertification";
import ProfileEducation from "./ProfileEducation";
import ProfileEmployment from "./ProfileEmployment";
import ProfileExperience from "./ProfileExperience";
import ProfilePortfolio from "./ProfilePortfolio";

export default observer(function ProfileContent() {
  const { profileStore } = useStore();
  const { profile } = profileStore;
  return (
    <Grid>
      <Grid.Column width="16">
        {profile && profile.isExpert && (
          <Segment.Group>
            <Segment>
              <ProfileEmployment employment={profile.employment} />
            </Segment>
            <Segment>
              <ProfilePortfolio portfolio={profile.portfolio} />
            </Segment>
            <Segment>
              <ProfileEducation education={profile.education} />
            </Segment>
            <Segment>
              <ProfileCertification certification={profile.certifications} />
            </Segment>
            <Segment>
              <ProfileExperience experience={profile.experience} />
            </Segment>
          </Segment.Group>
        )}
      </Grid.Column>
    </Grid>
  );
});
