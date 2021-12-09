import { format } from "date-fns";
import React from "react";
import { Item, List } from "semantic-ui-react";
import { EmploymentItem } from "../../../app/models/profile";

interface Props {
  employmentItem: EmploymentItem;
}

export default function EmploymentItemElement({ employmentItem }: Props) {
  return (
    <Item>
      <Item.Content>
        <Item.Header as="h2">{employmentItem.description.title}</Item.Header>
        <Item.Extra as="h4" style={{ color: "rgba(0,0,0,0.7)" }}>
          {employmentItem.description.summary}
        </Item.Extra>
        <Item.Meta>{`${format(
          new Date(employmentItem.employedFrom),
          "yyyy-MM-dd"
        )} - ${
          employmentItem.employedTo
            ? format(new Date(employmentItem.employedTo), "yyyy-MM-dd")
            : "Currently"
        }`}</Item.Meta>
        <Item.Description>
          <List bulleted>
            {employmentItem.description.bulletPoints.map((bulletPoint) => (
              <List.Item key={bulletPoint.id}>{bulletPoint.text}</List.Item>
            ))}
          </List>
        </Item.Description>
      </Item.Content>
    </Item>
  );
}
