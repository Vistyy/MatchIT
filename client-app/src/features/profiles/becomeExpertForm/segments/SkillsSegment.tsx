import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Header, Label, Segment } from "semantic-ui-react";
import { runInAction } from "mobx";
import { useStore } from "../../../../app/stores/store";
import SkillSearchInput from "../SkillSearchInput";

export default observer(function SkillsSegment() {
  const { expertStore, profileStore } = useStore();

  const { loadAllSkills, skillNames, skillRegistry, getSkillNames, loading } =
    expertStore;

  const { profile, removeSkill, skillCount } = profileStore;

  useEffect(() => {
    loadAllSkills().then(getSkillNames);
  }, [getSkillNames, loadAllSkills]);

  useEffect(() => {
    if (skillRegistry.size < 1 || skillNames.length < 1)
      loadAllSkills().then(getSkillNames);
  }, [getSkillNames, loadAllSkills, skillNames.length, skillRegistry.size]);

  useEffect(() => {
    runInAction(() =>
      skillNames.sort((s1, s2) => (s1.title >= s2.title ? 1 : -1))
    );
  }, [skillNames, skillNames.length]);

  return (
    <>
      <Header>Skills</Header>
      <Segment
        style={{ marginBottom: "3.5em", minHeight: "6em" }}
        className={
          skillCount === 0 ? "becomeExpert-skillsSegment__noSkills" : ""
        }
      >
        {profile &&
          profile.skills.map((skill) => (
            <Label
              className="becomeExpert--skillLabel__hover asAButton"
              onClick={() => removeSkill(skill)}
              key={skill.id}
            >
              {skill.name}
            </Label>
          ))}
        {skillCount === 0 && (
          <Label
            style={{ position: "absolute", zIndex: 2, top: "110%", left: "0" }}
            content="You must select at least one skill"
            basic
            color="red"
          />
        )}
      </Segment>
      <SkillSearchInput source={skillNames} loadingSkills={loading} />
    </>
  );
});
