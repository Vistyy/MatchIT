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
        <Segment.Group className="profileContent-container">
          <Segment>
            {profile && profile.isExpert && (
              <>
                {profile.portfolio && profile.portfolio.length > 0 && (
                    <ProfilePortfolio portfolio={profile.portfolio} />
                )}
                {profile.employment && profile.employment.length > 0 && (
                    <ProfileEmployment employment={profile.employment} />
                )}
                {profile.education && profile.education.length > 0 && (
                    <ProfileEducation education={profile.education} />
                )}
                {profile.experience && profile.experience.length > 0 && (
                    <ProfileExperience experience={profile.experience} />
                )}
                {profile.certifications && profile.certifications.length > 0 && (
                    <ProfileCertification
                      certification={profile.certifications}
                    />
                )}
                {isCurrentUser && (
                  <Button
                    content="Edit Profile"
                    style={{ position: "absolute", top: "5px", right: "5px" }}
                    onClick={() => setEditMode(true)}
                  />
                )}
              </>
            )}
          </Segment>
        </Segment.Group>
      ) : (
        <>
          <EditProfile setEditMode={setEditMode} />
        </>
      )}
    </>
  );
});
