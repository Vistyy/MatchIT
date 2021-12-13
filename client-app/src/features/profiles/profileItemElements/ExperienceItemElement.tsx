import React from "react";
import { Item, List } from "semantic-ui-react";
import { ExperienceItem } from "../../../app/models/profile";

interface Props {
  experienceItem: ExperienceItem;
}

export default function ExperienceItemElement({ experienceItem }: Props) {
  return (
    <Item>
      <Item.Content>
        <Item.Header as="h2">{experienceItem.description.title}</Item.Header>
        <Item.Extra as="h4" style={{ color: "rgba(0,0,0,0.7)" }}>
          {experienceItem.description.summary}
        </Item.Extra>
        <Item.Description>
          <List bulleted>
            {experienceItem.description.bulletPoints.map((bulletPoint) => (
              <List.Item key={bulletPoint.id}>{bulletPoint.text}</List.Item>
            ))}
          </List>
        </Item.Description>
      </Item.Content>
    </Item>
  );
}
