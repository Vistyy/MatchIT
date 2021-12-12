import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import AccountLinksSegment from "../becomeExpertForm/segments/AccountLinksSegment";
import CertificationSegment from "../becomeExpertForm/segments/CertificationSegment";
import EducationSegment from "../becomeExpertForm/segments/EducationSegment";
import EmploymentSegment from "../becomeExpertForm/segments/EmploymentSegment";
import ExperienceSegment from "../becomeExpertForm/segments/ExperienceSegment";
import PortfolioSegment from "../becomeExpertForm/segments/PortfolioSegment";
import SkillsSegment from "../becomeExpertForm/segments/SkillsSegment";

interface Props {
  setEditMode: (editMode: boolean) => void;
}

export default observer(function EditProfile({ setEditMode }: Props) {
  const {
    profileStore: {
      loading,
      uploading,
      editedProfile,
      updateProfile,
      updatingProfile,
      startProfileEditing,
    },
  } = useStore();

  function handleSaveChanges() {
    updateProfile(editedProfile!).then(() => {
      setEditMode(false);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
  }

  useEffect(() => {
    startProfileEditing();
  }, [startProfileEditing]);

  return (
    <>
      <Segment>
        <AccountLinksSegment />
      </Segment>
      <Segment.Group>
        <Segment
          style={{ paddingBottom: "4rem" }}
          className="editProfile-container"
        >
          <div style={{ display: 'flex', float: "right", marginRight: "1rem" }}>
            <Button
              content="Cancel"
              style={{ marginRight: "15px" }}
              onClick={() => {
                setEditMode(false);
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            />
            <div
              className="becomeExpert-progressButton"
              onClick={() => {
                if (editedProfile?.skills.length === 0)
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              <Button
                content="Save Changes"
                className="positive--custom"
                size="large"
                onClick={handleSaveChanges}
                disabled={editedProfile?.skills.length === 0}
                loading={loading || uploading || updatingProfile}
              />
            </div>
          </div>
          <SkillsSegment />
          <PortfolioSegment />
          <EmploymentSegment />
          <ExperienceSegment />
          <EducationSegment />
          <CertificationSegment />
          <div style={{ display: 'flex', float: "right", marginRight: "1rem" }}>
            <Button
              content="Cancel"
              style={{ marginRight: "15px" }}
              onClick={() => {
                setEditMode(false);
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            />
            <div
              className="becomeExpert-progressButton"
              onClick={() => {
                if (editedProfile?.skills.length === 0)
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              <Button
                content="Save Changes"
                className="positive--custom"
                size="large"
                onClick={handleSaveChanges}
                disabled={editedProfile?.skills.length === 0}
                loading={loading || uploading || updatingProfile}
              />
            </div>
          </div>
        </Segment>
      </Segment.Group>
    </>
  );
});
