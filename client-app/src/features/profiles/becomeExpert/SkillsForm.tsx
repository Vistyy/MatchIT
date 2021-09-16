import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Header, Label, Segment } from "semantic-ui-react";
import SearchInput from "./SkillSearchInput";
import { useStore } from "../../../app/stores/store";

export default observer(function SkillsForm() {
  const {
    expertStore,
    profileStore: { profile, removeSkill },
  } = useStore();

  const { loadSkills, skillNames, skillRegistry, getSkillNames, loading } =
    expertStore;

  useEffect(() => {
    if (skillRegistry.size < 1) loadSkills().then(getSkillNames);
  }, [skillRegistry.size, loadSkills, getSkillNames]);

  useEffect(() => {
    skillNames.sort((s1, s2) => {
      if (s1.title > s2.title) return 1;
      if (s2.title > s1.title) return -1;
      return 0;
    });
  }, [skillNames, skillNames.length]);

  return (
    <>
      <Header>Skills</Header>
      <Segment>
        {profile &&
          profile.skills.map((skill) => (
            <Label
              className="becomeExpert--skillLabel__hover"
              onClick={() => removeSkill(skill)}
              key={skill.id}
            >
              {skill.name}
            </Label>
          ))}
      </Segment>
      <SearchInput source={skillNames} loadingSkills={loading} />
    </>
  );
});
