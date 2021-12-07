import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Header, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import JobSkillSearchInput from "./JobSkillSearchInput";

interface Props {
  setDisableButton: (disableButton: boolean) => void;
}

export default observer(function RequiredJobSkills({
  setDisableButton,
}: Props) {
  const {
    jobStore: {
      removeRequiredSkill,
      loadAllSkills,
      getSkillNames,
      skillRegistry,
      skillNames,
      loadingSkills,
      requiredSkills,
    },
  } = useStore();
  const [removedSkill, setRemovedSkill] = useState(false);

  useEffect(() => {
    setDisableButton(removedSkill && requiredSkills.length === 0);
  }, [removedSkill, requiredSkills.length, setDisableButton]);

  useEffect(() => {
    loadAllSkills().then(getSkillNames);
  }, [getSkillNames, loadAllSkills, skillNames]);

  useEffect(() => {
    if (skillRegistry.size < 1 && skillNames.length < 1)
      loadAllSkills().then(getSkillNames);
  }, [getSkillNames, loadAllSkills, skillNames.length, skillRegistry.size]);

  useEffect(() => {
    runInAction(() =>
      skillNames.sort((s1, s2) => (s1.title >= s2.title ? 1 : -1))
    );
  }, [skillNames, skillNames.length]);

  return (
    <>
      <Header>Required Skills</Header>
      <Segment
        style={{ marginBottom: "3.5em", minHeight: "6em" }}
        className={
          removedSkill && requiredSkills.length === 0
            ? "becomeExpert-skillsSegment__noSkills"
            : ""
        }
      >
        {requiredSkills &&
          requiredSkills.map((skill) => (
            <Label
              className="becomeExpert--skillLabel__hover asAButton"
              onClick={() => {
                removeRequiredSkill(skill);
                setRemovedSkill(true);
              }}
              key={skill.id}
            >
              {skill.name}
            </Label>
          ))}
        {removedSkill && requiredSkills.length === 0 && (
          <Label
            style={{ position: "absolute", zIndex: 2, top: "110%", left: "0" }}
            content="You must select at least one skill"
            basic
            color="red"
          />
        )}
      </Segment>
      <JobSkillSearchInput
        source={skillNames}
        loadingSkills={loadingSkills}
        setRemovedSkill={setRemovedSkill}
      />
    </>
  );
});
