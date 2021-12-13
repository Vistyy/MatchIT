import { format } from "date-fns";
import React from "react";
import { Item } from "semantic-ui-react";
import { EducationItem } from "../../../app/models/profile";

interface Props {
  educationItem: EducationItem;
}

export default function EducationItemElement({ educationItem }: Props) {
  return (
    <Item>
      <Item.Content>
        <Item.Header as="h2">
          {`${educationItem.facilityName}, ${educationItem.facilityLocation}`}
        </Item.Header>
        <Item.Meta>{`${format(
          new Date(educationItem.studyingFrom),
          "dd-MM-yyyy"
        )} - ${
          educationItem.studyingTo
            ? new Date(educationItem.studyingTo).getTime() < Date.now()
              ? format(new Date(educationItem.studyingTo), "dd-MM-yyyy")
              : `Currently (Expected ${format(
                  new Date(educationItem.studyingTo),
                  "dd-MM-yyyy"
                )})`
            : "Currently"
        }`}</Item.Meta>
        <Item.Description>{educationItem.fieldOfStudy}</Item.Description>
      </Item.Content>
    </Item>
  );
}
