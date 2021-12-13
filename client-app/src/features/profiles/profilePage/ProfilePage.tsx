import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

export default observer(function ProfilePage() {
  const { userName } = useParams<{ userName: string }>();
  const {
    profileStore: { loadingProfile, loadProfile, profile, resetState },
  } = useStore();

  useEffect(() => {
    resetState();
    loadProfile(userName);
  }, [loadProfile, resetState, userName]);

  useEffect(() => {
    document.title = "Profile - MatchIT";
    if (profile?.displayName) {
      document.title = `${profile?.displayName}'s Profile - MatchIT`;
    }
  }, [profile?.displayName]);

  if (loadingProfile) return <LoadingComponent content="Loading profile..." />;

  return (
    <Grid>
      <Grid.Column width="16">
        {profile && (
          <>
            <ProfileHeader />
            <ProfileContent />
          </>
        )}
      </Grid.Column>
    </Grid>
  );
});
