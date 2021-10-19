import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Header, Label, Segment } from "semantic-ui-react";
import SearchInput from "./SkillSearchInput";
import { useStore } from "../../../app/stores/store";
import { runInAction } from "mobx";

export default observer(function SkillsSegment() {
  const {
    expertStore,
    profileStore: { profile, removeSkill },
  } = useStore();

  const { loadSkills, skillNames, skillRegistry, getSkillNames, loading } =
    expertStore;

  useEffect(() => {
    if (skillRegistry.size < 1 && profile) {
      loadSkills().then(getSkillNames);
    } else if (skillRegistry.size > 0 && skillNames.length < 1 && profile) {
      getSkillNames();
    }
  }, [skillRegistry.size, loadSkills, getSkillNames, skillNames.length, profile]);

  useEffect(() => {
    runInAction(() =>
      skillNames.sort((s1, s2) => {
        if (s1.title > s2.title) return 1;
        if (s2.title > s1.title) return -1;
        return 0;
      })
    );
  }, [skillNames, skillNames.length]);

  return (
    <>
      <Header>Skills</Header>
      <Segment>
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
      </Segment>
      <SearchInput source={skillNames} loadingSkills={loading} />
    </>
  );
});
