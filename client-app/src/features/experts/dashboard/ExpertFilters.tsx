import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ExpertFilters() {
  const {
    expertStore: {
      skillPredicate,
      setSkillPredicate,
      loadSkills,
      skillRegistry,
      skillFilter,
      filterDelay,
    },
  } = useStore();

  useEffect(() => {
    if (skillRegistry.size < 1) loadSkills();
  }, [skillRegistry.size, loadSkills]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [skillFilter.length]);

  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 25 }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        {Array.from(skillRegistry).map(([id, skill]) => (
          <Menu.Item
            key={id}
            content={`${skill.name} (${skill.expertCount})`}
            active={Array.from(skillPredicate.values())[0].includes(skill.name)}
            disabled={
              skill.expertCount === 0 &&
              !Array.from(skillPredicate.values())[0].includes(skill.name)
            }
            onClick={() => {
              clearTimeout(filterDelay);
              setSkillPredicate(skill.name);
            }}
          />
        ))}
      </Menu>
    </>
  );
});
