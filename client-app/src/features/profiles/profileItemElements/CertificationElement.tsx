import { format } from "date-fns";
import React from "react";
import { Item } from "semantic-ui-react";
import { Certification } from "../../../app/models/profile";

interface Props {
  certificate: Certification;
}

export default function CertificationElement({ certificate }: Props) {
  return (
    <Item>
      <Item.Content>
        <Item.Header as="h3" style={{ display: "inline", marginRight: '0.6em' }}>
          {certificate.name}
        </Item.Header>
        <Item.Meta style={{ display: "inline" }}>{`${format(
          new Date(certificate.dateAcquired),
          "dd-MM-yyyy"
        )}`}</Item.Meta>
      </Item.Content>
    </Item>
  );
}
