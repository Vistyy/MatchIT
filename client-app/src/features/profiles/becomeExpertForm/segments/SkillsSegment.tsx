import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Header, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";
import SkillSearchInput from "../SkillSearchInput";

export default observer(function SkillsSegment() {
  const { expertStore, profileStore } = useStore();
  const [removedSkill, setRemovedSkill] = useState(false);

  const {
    loadAllSkills,
    skillNames,
    skillRegistry,
    getSkillNames,
    loadingSkills,
  } = expertStore;

  const { editedProfile, removeSkill } = profileStore;

  useEffect(() => {
    loadAllSkills().then(getSkillNames);
  }, [getSkillNames, loadAllSkills]);

  useEffect(() => {
    if (skillRegistry.size < 1 || skillNames.length < 1)
      loadAllSkills().then(getSkillNames);
  }, [getSkillNames, loadAllSkills, skillNames.length, skillRegistry.size]);

  return (
    <>
      <Header as="h1">Skills</Header>
      <Segment
        style={{ marginBottom: "2.5em", minHeight: "6em" }}
        className={
          editedProfile?.skills.length === 0 && removedSkill
            ? "becomeExpert-skillsSegment__noSkills"
            : ""
        }
      >
        {editedProfile &&
          editedProfile.skills.map((skill) => (
            <Label
              className="becomeExpert--skillLabel__hover asAButton"
              onClick={() => {
                removeSkill(skill);
                setRemovedSkill(true);
              }}
              key={skill.id}
            >
              {skill.name}
            </Label>
          ))}
        {editedProfile?.skills.length === 0 && removedSkill && (
          <Label
            style={{ position: "absolute", zIndex: 2, top: "110%", left: "0" }}
            content="You must select at least one skill"
            basic
            color="red"
          />
        )}
      </Segment>
      <SkillSearchInput
        source={skillNames}
        loadingSkills={loadingSkills}
        setRemovedSkill={setRemovedSkill}
      />
    </>
  );
});
