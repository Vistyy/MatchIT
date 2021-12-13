import { observer } from "mobx-react-lite";
import React from "react";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ExpertSort() {
  const {
    expertStore: { sortExpertsBy, changeSorting },
  } = useStore();

  const dropdownSortOptions = [
    { key: 1, text: "Display Name: alphabetically", value: "displayNameAsc" },
    // { key: 1, text: "Rating: highest", value: "ratingHighest" },
  ];

  function handleSortChange(
    e: React.SyntheticEvent<HTMLElement, Event>,
    props: DropdownProps
  ) {
    if (props.value) changeSorting(props.value.toString());
  }

  return (
    <>
      <Dropdown
        direction="left"
        selection
        className="listSort-dropdown"
        style={{ float: "right" }}
        options={dropdownSortOptions}
        value={sortExpertsBy}
        onChange={handleSortChange}
      />
    </>
  );
});
