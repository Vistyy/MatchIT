import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect } from "react";
import { Button, Header, Menu } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function ExpertFilters() {
  const {
    expertStore: {
      skillPredicate,
      setSkillPredicate,
      loadUsedSkills,
      skillRegistry,
      skillFilter,
      filterDelay,
      clearFilter,
      loadingSkills,
    },
  } = useStore();

  useEffect(() => {
    loadUsedSkills();
  }, [loadUsedSkills]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [skillFilter.length]);

  return (
    <>
      <Menu
        vertical
        size="large"
        style={{
          width: "100%",
          marginTop: 25,
        }}
      >
        <Header
          icon="filter"
          attached
          color="teal"
          content="Filters"
          style={{
            display: "inline-block",
            border: "none",
            margin: "5px 2px 0px 2px",
          }}
        />
        <Button
          disabled={skillFilter.length === 0}
          compact
          basic
          icon="ban"
          content="Clear"
          size="medium"
          floated="right"
          negative
          style={{
            textAlign: "center",
            marginTop: "11px",
            marginRight: "5px",
          }}
          onClick={() => clearFilter()}
        />
        {loadingSkills ? (
          <Menu.Item style={{ minHeight: "15em" }}>
            <LoadingComponent content="Loading..." />
          </Menu.Item>
        ) : (
          <div style={{ maxHeight: "20em", overflowY: "auto" }}>
            {Array.from(skillRegistry)
              .sort(
                ([_, s1], [__, s2]) =>
                  s2.count - s1.count || s1.name.localeCompare(s2.name)
              )
              .sort(([_, s1], [__, s2]) => {
                if (
                  Array.from(skillPredicate.values())[0].split(",").includes(s1.name)
                )
                  return -1;
                else if (
                  Array.from(skillPredicate.values())[0].split(",").includes(s1.name)
                )
                  return 1;
                else {
                  return 0;
                }
              })
              .map(([id, skill]) => (
                <Menu.Item
                  key={id}
                  content={`${skill.name} (${skill.count})`}
                  active={Array.from(skillPredicate.values())[0]
                    .split(",")
                    .includes(skill.name)}
                  disabled={
                    skill.count === 0 &&
                    !Array.from(skillPredicate.values())[0]
                      .split(",")
                      .includes(skill.name)
                  }
                  onClick={() => {
                    clearTimeout(filterDelay);
                    setSkillPredicate(skill.name);
                  }}
                />
              ))}
          </div>
        )}
      </Menu>
    </>
  );
});
