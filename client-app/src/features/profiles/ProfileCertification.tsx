import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, Header, Item } from "semantic-ui-react";
import { Certification } from "../../app/models/profile";
import { format } from "date-fns";

interface Props {
  certification: Certification[];
}

export default observer(function ProfileCertification({
  certification,
}: Props) {
  return (
    <Grid.Row>
      <Header as="h1">Certification</Header>
      {certification && (
        <Item.Group>
          {certification.map((certificate) => (
            <Item key={certificate.id}>
              <Item.Content>
                <Item.Header as="h2">{certificate.name}</Item.Header>
                <Item.Meta>{`${format(
                  new Date(certificate.dateAcquired),
                  "yyyy-MM-dd"
                )}`}</Item.Meta>
                {certificate.certificate && (
                  <Item.Image>{certificate.certificate}</Item.Image>
                )}
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      )}
    </Grid.Row>
  );
});
