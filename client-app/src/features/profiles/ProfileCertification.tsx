import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, Header, Item } from "semantic-ui-react";
import { Certification } from "../../app/models/profile";
import { format } from "date-fns";
import CertificationElement from "./profileItemElements/CertificationElement";

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
            <CertificationElement
              key={certificate.id}
              certificate={certificate}
            />
          ))}
        </Item.Group>
      )}
    </Grid.Row>
  );
});
