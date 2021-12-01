import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import CertificationSegment from "../becomeExpertForm/segments/CertificationSegment";
import EducationSegment from "../becomeExpertForm/segments/EducationSegment";
import EmploymentSegment from "../becomeExpertForm/segments/EmploymentSegment";
import ExperienceSegment from "../becomeExpertForm/segments/ExperienceSegment";
import PortfolioSegment from "../becomeExpertForm/segments/PortfolioSegment";
import SkillsSegment from "../becomeExpertForm/segments/SkillsSegment";

interface Props {
  setEditMode: (editMode: boolean) => void;
}

export default observer(function ({ setEditMode }: Props) {
  const {
    profileStore: { loading, uploading, profile, updateProfile },
  } = useStore();

  function handleSaveChanges() {
    updateProfile(profile!).then(() => {
      setEditMode(false);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
  }
  return (
    <Segment.Group>
      <SkillsSegment />
      <PortfolioSegment />
      <EmploymentSegment />
      <ExperienceSegment />
      <EducationSegment />
      <CertificationSegment />
      <Button.Group style={{ float: "right" }}>
        <div
          className="becomeExpert-progressButton"
          onClick={() => {
            if (profile?.skills.length === 0)
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          <Button
            content="Save Changes"
            className="positive--custom"
            size="large"
            onClick={handleSaveChanges}
            disabled={profile?.skills.length === 0}
            loading={loading || uploading}
          />
        </div>
      </Button.Group>
    </Segment.Group>
  );
});
