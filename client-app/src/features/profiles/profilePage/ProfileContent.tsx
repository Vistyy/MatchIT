import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import EditProfile from "./EditProfile";
import ProfileCertification from "./ProfileCertification";
import ProfileEducation from "./ProfileEducation";
import ProfileEmployment from "./ProfileEmployment";
import ProfileExperience from "./ProfileExperience";
import ProfilePortfolio from "./ProfilePortfolio";

export default observer(function ProfileContent() {
  const {
    profileStore: { profile, isCurrentUser },
  } = useStore();

  const [editMode, setEditMode] = useState(false);
  return (
    <>
      {!editMode ? (
        <Segment.Group>
          {profile && profile.isExpert && (
            <>
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
              {isCurrentUser && (
                <Button
                  content="Edit Profile"
                  style={{ position: "absolute", top: "5px", right: "5px" }}
                  onClick={() => setEditMode(true)}
                />
              )}
            </>
          )}
        </Segment.Group>
      ) : (
        <>
          <EditProfile setEditMode={setEditMode} />
        </>
      )}
    </>
  );
});
