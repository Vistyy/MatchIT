import { observer } from "mobx-react-lite";
import React from "react";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function JobSort() {
  const {
    jobStore: { sortJobsBy, changeSorting },
  } = useStore();

  function handleSortChange(
    e: React.SyntheticEvent<HTMLElement, Event>,
    props: DropdownProps
  ) {
    if (props.value) changeSorting(props.value.toString());
  }

  return (
      <Dropdown
        direction="left"
        selection
        className="listSort-dropdown"
        style={{ float: "right" }}
        options={[
          { key: 1, text: "Date: oldest", value: "dateOldest" },
          {
            key: 2,
            text: "Date: newest",
            value: "dateNewest",
          },
        ]}
        defaultValue={sortJobsBy}
        onChange={handleSortChange}
      />
  );
});
