import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, Header, Item } from "semantic-ui-react";
import { EducationItem } from "../../app/models/profile";
import { format } from "date-fns";

interface Props {
  education: EducationItem[];
}

export default observer(function ProfileEducation({ education }: Props) {
  return (
    <Grid.Row>
      <Header as="h1">Education</Header>
      {education && (
        <Item.Group>
          {education.map((educationItem) => (
            <Item key={educationItem.id}>
              <Item.Content>
                <Item.Header as="h2">
                  {`${educationItem.facilityName}, ${educationItem.facilityLocation}`}
                </Item.Header>
                <Item.Meta>{`${format(
                  new Date(educationItem.studyingFrom),
                  "yyyy-MM-dd"
                )} - ${
                  educationItem.studyingTo
                    ? new Date(educationItem.studyingTo).getTime() < Date.now()
                      ? format(new Date(educationItem.studyingTo), "yyyy-MM-dd")
                      : `Currently (${format(
                          new Date(educationItem.studyingTo),
                          "yyyy-MM-dd"
                        )})`
                    : "Currently"
                }`}</Item.Meta>
                <Item.Description>
                  {educationItem.fieldOfStudy}
                </Item.Description>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      )}
    </Grid.Row>
  );
});
