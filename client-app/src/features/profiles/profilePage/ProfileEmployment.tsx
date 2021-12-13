import { observer } from "mobx-react-lite";
import React from "react";
import { Header, Item } from "semantic-ui-react";
import { EmploymentItem } from "../../../app/models/profile";
import EmploymentItemElement from "../profileItemElements/EmploymentItemElement";

interface Props {
  employment: EmploymentItem[];
}

export default observer(function ProfileEmployment({ employment }: Props) {
  return (
    <>
      <Header as="h1">Employment</Header>
      {employment && (
        <Item.Group>
          {employment.map((employmentItem) => (
            <EmploymentItemElement
              key={employmentItem.id}
              employmentItem={employmentItem}
            />
          ))}
        </Item.Group>
      )}
    </>
  );
});
